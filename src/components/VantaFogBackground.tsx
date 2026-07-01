import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const fogVertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fogFragmentShaderSim = `
precision mediump float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_scale;

const int OCTAVES = 7;
const float PERSISTENCE = 0.5;
const float SCALE = 0.001;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * snoise(p * frequency);
    frequency *= 2.0;
    amplitude *= PERSISTENCE;
  }
  return value;
}

void main() {
  vec2 p = v_uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;
  float t = u_time * 0.2 * u_scale;
  vec2 pos = p * (SCALE * u_scale * 1000.0);
  float n1 = fbm(pos + t);
  float n2 = fbm(pos - t * 0.7 + vec2(5.2, 1.3));
  float n = mix(n1, n2, 0.5);
  vec2 mouse = (u_mouse - 0.5) * 2.0;
  float mouseInfluence = 1.0 - smoothstep(0.0, 1.5, length(p - mouse));
  n += mouseInfluence * 0.3 * sin(t * 2.0);
  gl_FragColor = vec4(vec3(n * 0.5 + 0.5), 1.0);
}
`;

const fogFragmentShaderDisplay = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_simTexture;
uniform vec3 u_highColor;
uniform vec3 u_midColor;
uniform vec3 u_lowColor;
uniform vec3 u_baseColor;
uniform float u_blur;
uniform float u_scale;

void main() {
  vec4 sim = texture2D(u_simTexture, v_uv);
  vec2 flow = (sim.rg - 0.5) * 2.0;
  float scale = 0.01 * u_blur * u_scale;
  vec2 r_uv = v_uv + flow * (scale * 1.5);
  vec2 g_uv = v_uv + flow * (scale * 1.0);
  vec2 b_uv = v_uv + flow * (scale * 0.5);
  float r = texture2D(u_simTexture, r_uv).r;
  float g = texture2D(u_simTexture, g_uv).g;
  float b = texture2D(u_simTexture, b_uv).b;
  float luminance = (r + g + b) / 3.0;
  float fogAmount = smoothstep(0.1, 0.6, luminance);
  vec3 color = mix(u_baseColor, u_lowColor, smoothstep(0.1, 0.3, luminance));
  color = mix(color, u_midColor, smoothstep(0.3, 0.5, luminance));
  color = mix(color, u_highColor, smoothstep(0.5, 0.7, luminance));
  float alpha = fogAmount * 0.85;
  gl_FragColor = vec4(color, alpha);
}
`;

export default function VantaFogBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Simulation pass
    const simRenderTarget = new THREE.WebGLRenderTarget(
      Math.floor(window.innerWidth * 0.5),
      Math.floor(window.innerHeight * 0.5),
      {
        type: THREE.FloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
      }
    );

    const simMaterial = new THREE.ShaderMaterial({
      vertexShader: fogVertexShader,
      fragmentShader: fogFragmentShaderSim,
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_scale: { value: 1.5 },
      },
    });

    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader: fogVertexShader,
      fragmentShader: fogFragmentShaderDisplay,
      uniforms: {
        u_simTexture: { value: simRenderTarget.texture },
        u_highColor: { value: new THREE.Color(0x333333) },
        u_midColor: { value: new THREE.Color(0x1a1a1a) },
        u_lowColor: { value: new THREE.Color(0x000000) },
        u_baseColor: { value: new THREE.Color(0x000000) },
        u_blur: { value: 0.6 },
        u_scale: { value: 1.5 },
      },
      transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simMesh = new THREE.Mesh(plane, simMaterial);
    const displayMesh = new THREE.Mesh(plane, displayMaterial);

    const simScene = new THREE.Scene();
    simScene.add(simMesh);
    scene.add(displayMesh);

    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX / window.innerWidth;
      targetMouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseRef.current.x = e.touches[0].clientX / window.innerWidth;
        targetMouseRef.current.y = 1.0 - e.touches[0].clientY / window.innerHeight;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const startTime = performance.now();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;

      // Lerp mouse
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Update sim uniforms
      simMaterial.uniforms.u_time.value = elapsed;
      simMaterial.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Render simulation to FBO
      renderer.setRenderTarget(simRenderTarget);
      renderer.render(simScene, camera);

      // Render display to screen
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      simRenderTarget.setSize(
        Math.floor(window.innerWidth * 0.5),
        Math.floor(window.innerHeight * 0.5)
      );
      simMaterial.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      simRenderTarget.dispose();
      simMaterial.dispose();
      displayMaterial.dispose();
      plane.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
