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

void main() {
  gl_FragColor = vec4(v_uv.x, v_uv.y, 0.5 + 0.5 * sin(u_time), 1.0);
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

// Convert HSL string like "217 91% 60%" to [r,g,b] in [0,1]
function hslToRgb(hslString: string): [number, number, number] {
  if (!hslString || hslString.trim() === '') {
    // Fallback to a default blue if CSS variable is missing
    return [0.149, 0.392, 0.922]; // #2563EB
  }
  const match = hslString.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?%)+\s+(\d+(?:\.\d+)?%)/);
  if (!match) return [0.149, 0.392, 0.922]; // Fallback
  let h = parseFloat(match[1]) / 360; // hue 0-1
  let s = parseFloat(match[2]) / 100; // saturation 0-1
  let l = parseFloat(match[3]) / 100; // lightness 0-1

  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }
  return [r, g, b];
}

export default function VantaFogBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
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

      // Get CSS variables for colors with fallbacks
      const getComputedStyle = window.getComputedStyle(document.documentElement);
      const primaryHsl = getComputedStyle.getPropertyValue('--color-primary').trim() || '217 91% 60%';
      const backgroundHsl = getComputedStyle.getPropertyValue('--color-background').trim() || '210 30% 5%';
      const mutedHsl = getComputedStyle.getPropertyValue('--color-muted').trim() || '210 20% 40%';

      // Convert to RGB arrays [0,1]
      const primaryRgb = hslToRgb(primaryHsl);
      const backgroundRgb = hslToRgb(backgroundHsl);
      const mutedRgb = hslToRgb(mutedHsl);

      // Derive colors for the shader
      const baseColor = new THREE.Color(
        backgroundRgb[0],
        backgroundRgb[1],
        backgroundRgb[2]
      );
      const lowColor = new THREE.Color(
        backgroundRgb[0] * 0.8,
        backgroundRgb[1] * 0.8,
        backgroundRgb[2] * 0.8
      );
      const midColor = new THREE.Color(
        primaryRgb[0],
        primaryRgb[1],
        primaryRgb[2]
      );
      const highColor = new THREE.Color(
        1.0 - mutedRgb[0] * 0.5, // invert and scale
        1.0 - mutedRgb[1] * 0.5,
        1.0 - mutedRgb[2] * 0.5
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
          u_highColor: { value: highColor },
          u_midColor: { value: midColor },
          u_lowColor: { value: lowColor },
          u_baseColor: { value: baseColor },
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

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const animate = () => {
        if (!prefersReducedMotion) {
          animFrameRef.current = requestAnimationFrame(animate);
        }

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

      if (!prefersReducedMotion) {
        animate();
      }

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
    } catch (error) {
      console.error('VantaFogBackground failed to initialize:', error);
      // Return empty div to avoid breaking the rest of the app
      return () => {};
    }
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