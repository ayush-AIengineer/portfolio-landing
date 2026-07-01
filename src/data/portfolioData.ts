import type { PortfolioMode } from '../context/PortfolioModeContext';

export const heroContent: Record<PortfolioMode, { subtitle: string; tagline: string }> = {
  personal: {
    subtitle: 'AI/ML Engineer',
    tagline: 'I architect production-grade AI systems — multi-agent clinical platforms, reinforcement-learning trading engines, and offline medical diagnostics — engineered for explainability, compliance, and real-world scale.',
  },
  freelance: {
    subtitle: 'AI/ML Engineer Available for Hire',
    tagline: 'I partner with startups and healthcare, fintech, and SaaS teams to deliver production-grade AI systems — from concept to deployment.',
  },
  agency: {
    subtitle: 'AI Engineering Partner',
    tagline: 'I embed with product teams to architect and ship multi-agent systems, LLM pipelines, and deep learning solutions on deadline.',
  },
};

export const servicesHeading: Record<PortfolioMode, string> = {
  personal: 'What I build.',
  freelance: 'AI services for your product.',
  agency: 'AI capabilities for every challenge.',
};

export const servicesContent: Record<PortfolioMode, { description: string }[]> = {
  personal: [
    { description: 'End-to-end ML and deep-learning pipelines — CNNs, LSTMs, transformers, gradient-boosted ensembles, and multimodal fusion — from raw data to deployed inference. Work spans medical imaging (MRI, oral pathology), financial time-series forecasting, and on-device TFLite models optimised to under 35MB for offline rural hardware.' },
    { description: 'I architect orchestrator-and-specialist agent systems where 10–15 expert agents run in parallel on LangGraph, CrewAI, and Google ADK. Every system ships with explainability (SHAP, GradCAM), human-in-the-loop gates on high-stakes decisions, and cost-disciplined LLM usage through prompt caching and semantic deduplication.' },
    { description: 'I turn models into products: FastAPI backends, Celery and Kafka pipelines, vector databases, and Next.js / Streamlit interfaces — shipped on Docker and Kubernetes with full observability. Compliance and safety are first-class: immutable audit trails, VaR/CVaR risk engines, and regulatory pathways across HIPAA, SOC2, FDA, and SEBI.' },
  ],
  freelance: [
    { description: 'Custom ML model development — classification, forecasting, anomaly detection, and computer vision — end-to-end from data strategy to production API.' },
    { description: 'Multi-agent AI system design and build. I architect orchestrators and specialist agents for your domain — healthcare, fintech, SaaS — with cost-efficient LLM usage.' },
    { description: 'I ship AI products, not just notebooks. FastAPI, cloud deployment, vector databases, Celery pipelines, dashboards — the full stack around your models.' },
  ],
  agency: [
    { description: 'Senior ML engineering for client projects. I integrate complex models into existing stacks — REST APIs, cloud infrastructure, batch and streaming architectures.' },
    { description: 'LLM and agent system delivery for agencies. I build the orchestration layer, prompt systems, and tooling your design team envisions, on time and to spec.' },
    { description: 'Technical leadership on AI engagements — architecture decisions, build plans, model benchmarking, and ensuring client-facing AI systems are explainable and compliant.' },
  ],
};

export const worksHeading: Record<PortfolioMode, string> = {
  personal: 'Projects I\'ve built.',
  freelance: 'Recent AI engagements.',
  agency: 'Delivered AI systems.',
};

export interface WorkItem {
  name: string;
  tags: string[];
  role?: string;
  year: string;
  flyover: string;
}

export const worksContent: Record<PortfolioMode, WorkItem[]> = {
  personal: [
    { name: 'MedAI Supreme', role: 'AI Systems Architect · Clinical AI', tags: ['Healthcare AI', 'Multi-Agent'], year: '2025', flyover: '' },
    { name: 'AI-Driven Alzheimer\'s Detection', role: 'ML Research & Computer Vision Engineer', tags: ['Medical ML', 'Research'], year: '2025', flyover: '' },
    { name: 'AIRadar', role: 'Multi-Agent Pipeline Engineer', tags: ['SaaS', 'Multi-Agent'], year: '2025', flyover: '' },
    { name: 'GURU — Indian Trading AI', role: 'Quantitative AI & Reinforcement-Learning Engineer', tags: ['FinTech', 'RL'], year: '2025', flyover: '' },
    { name: 'DantVaidya AI', role: 'On-Device ML & Edge AI Engineer', tags: ['HealthTech', 'Edge AI'], year: '2025', flyover: '' },
    { name: 'SEO Master Agent', role: 'AI Agent Orchestrator', tags: ['MarTech', 'LLM'], year: '2025', flyover: '' },
  ],
  freelance: [
    { name: 'MedAI Supreme', tags: ['Healthcare AI', 'Multi-Agent'], year: '2025', flyover: '' },
    { name: 'AIRadar', tags: ['SaaS', 'Multi-Agent'], year: '2025', flyover: '' },
    { name: 'GURU — Indian Trading AI', tags: ['FinTech', 'RL'], year: '2025', flyover: '' },
    { name: 'DantVaidya AI', tags: ['HealthTech', 'Edge AI'], year: '2025', flyover: '' },
    { name: 'SEO Master Agent', tags: ['MarTech', 'LLM'], year: '2025', flyover: '' },
  ],
  agency: [
    { name: 'MedAI Supreme', tags: ['Healthcare AI', 'Multi-Agent'], year: '2025', flyover: '' },
    { name: 'AI-Driven Alzheimer\'s Detection', tags: ['Medical ML', 'Research'], year: '2025', flyover: '' },
    { name: 'AIRadar', tags: ['SaaS', 'Multi-Agent'], year: '2025', flyover: '' },
    { name: 'GURU — Indian Trading AI', tags: ['FinTech', 'RL'], year: '2025', flyover: '' },
    { name: 'DantVaidya AI', tags: ['HealthTech', 'Edge AI'], year: '2025', flyover: '' },
  ],
};

export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  video?: string;
}

export const galleryContent: Record<PortfolioMode, GalleryItem[]> = {
  personal: [
    { title: 'MedAI Supreme', category: '10-Agent Clinical Orchestration', image: '/images/ayush_profile.jpg' },
    { title: "Alzheimer's Detection", category: 'Multimodal Diagnostic ML · ADNI', image: '/images/ayush_profile.jpg' },
    { title: 'AIRadar', category: 'Autonomous Intelligence Pipeline', image: '/images/ayush_profile.jpg', video: '/videos/airadar.mp4' },
    { title: 'GURU Trading AI', category: 'Reinforcement-Learning Trading', image: '/images/ayush_profile.jpg' },
    { title: 'DantVaidya AI', category: 'Offline-First Edge AI', image: '/images/ayush_profile.jpg' },
    { title: 'SEO Master Agent', category: '15-Agent SEO Platform', image: '/images/ayush_profile.jpg' },
  ],
  freelance: [
    { title: 'MedAI Supreme', category: 'Healthcare Multi-Agent AI', image: '/images/ayush_profile.jpg' },
    { title: 'AIRadar', category: 'SaaS AI Pipeline', image: '/images/ayush_profile.jpg' },
    { title: 'GURU Trading AI', category: 'FinTech Autonomous System', image: '/images/ayush_profile.jpg' },
    { title: 'DantVaidya AI', category: 'HealthTech Edge AI', image: '/images/ayush_profile.jpg' },
    { title: 'SEO Master Agent', category: 'MarTech LLM Platform', image: '/images/ayush_profile.jpg' },
    { title: "Alzheimer's Detection", category: 'Medical ML Research', image: '/images/ayush_profile.jpg' },
  ],
  agency: [
    { title: 'MedAI Supreme', category: 'Healthcare Multi-Agent AI', image: '/images/ayush_profile.jpg' },
    { title: "Alzheimer's Detection", category: 'Medical ML Research', image: '/images/ayush_profile.jpg' },
    { title: 'AIRadar', category: 'SaaS AI Pipeline', image: '/images/ayush_profile.jpg' },
    { title: 'GURU Trading AI', category: 'FinTech Autonomous System', image: '/images/ayush_profile.jpg' },
    { title: 'DantVaidya AI', category: 'HealthTech Edge AI', image: '/images/ayush_profile.jpg' },
    { title: 'SEO Master Agent', category: 'MarTech LLM Platform', image: '/images/ayush_profile.jpg' },
  ],
};

export const aboutBody: Record<PortfolioMode, string> = {
  personal: "I'm an AI/ML engineer who designs and ships production-grade intelligent systems end to end. Across six projects I've owned the roles of AI systems architect, computer vision engineer, LLM and prompt engineer, reinforcement-learning engineer, and compliance lead — building multi-agent clinical orchestration, an autonomous Indian-equities trading agent, offline oral-cancer diagnostics for rural India, and LLM-powered SaaS platforms. My focus is always the hard part: explainability, safety gates, regulatory compliance (HIPAA, SEBI, GDPR), and architectures that hold up under real-world load.",
  freelance: "I work as an independent AI/ML engineer, partnering with healthcare, fintech, and SaaS teams who need senior-level AI execution without the overhead. I bring deep technical depth in LLMs, multi-agent orchestration, computer vision, and reinforcement learning — and a commitment to shipping.",
  agency: "I embed with product and design teams as a senior AI engineering partner. I translate ambitious AI visions into production-ready systems — multi-agent pipelines, LLM integrations, deployed ML models — on time, on scope, and above expectations.",
};
