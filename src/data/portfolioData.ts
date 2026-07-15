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
  description?: string;
}

export const worksContent: Record<PortfolioMode, WorkItem[]> = {
  personal: [
    { name: 'AI Lead Qualification System', role: 'AI & Backend Engineer', tags: ['AI Automation', 'Supabase', 'FastAPI'], year: '2026', flyover: '', description: 'Built a production-grade AI Lead Qualification System that automatically scores, routes, and nurtures inbound B2B leads using Claude 3.5 Sonnet. The system ingests leads from any source — web forms, email, LinkedIn, or CRM — enriches them with real-time company data, then scores each lead on the BANT framework (0–100) in under 2 seconds. Hot leads trigger instant Slack alerts and Calendly links, while warm leads enter a 5-touch AI-generated email nurture sequence. Integrated with HubSpot, Salesforce, SendGrid, and Slack. Built on FastAPI, Supabase, Redis, and n8n — delivering 97%+ margins at $9/month in AI costs per 1,000 leads.' },
    { name: 'SEO Master Agent', role: 'AI Agent Orchestrator', tags: ['MarTech', 'LLM'], year: '2025', flyover: '', description: 'SEO MASTER is a production-ready, multi-agent SEO platform automating keyword research, content strategy, technical audits, competitor analysis, and link building. Built with Python, FastAPI, Streamlit, Celery, and Google ADK, it combines AI insights with real-time SEO data to help teams optimize and monitor website performance at scale. Featuring a dashboard, API, Slack integration, PDF reporting, and workflow orchestration, the system is a strong example of end-to-end SaaS development, automation, and data-driven product design for modern digital marketing teams. It showcases practical full-stack engineering capabilities in real-world applications.' },
    { name: 'AIRadar', role: 'Multi-Agent Pipeline Engineer', tags: ['SaaS', 'Multi-Agent'], year: '2026', flyover: '', description: 'AIRadar is a multi-agent system that autonomously discovers, enriches, deduplicates, and delivers daily intelligence on newly launched AI tools worldwide. Addressing the chaotic volume of 50-200+ daily AI launches, it outperforms manual aggregators with a fully autonomous pipeline. Subscribers receive daily curated feeds featuring one-line summaries, category tags, pricing, and automatically generated "why it matters" blurbs. Beyond basic discovery, AIRadar\'s true moat lies in its automated data enrichment and editorial synthesis layers.' },
    { name: 'Upwork Lead Qualifier Bot', role: 'Full-Stack & AI Engineer', tags: ['AI Automation', 'FastAPI', 'React'], year: '2025', flyover: '', description: 'Upwork Lead Qualifier Bot is an AI-powered automation project designed to help freelancers evaluate Upwork job opportunities quickly and intelligently. The system analyzes job descriptions, applies a scoring framework based on proven qualification criteria, detects red flags, and generates recommendations for proposal strategy. Built as a full-stack product with a FastAPI backend, React-based dashboard, authentication, analytics, and optional bot integration, this project showcases my skills in AI Automation, backend development, API design, product thinking, and building practical tools that solve real-world workflow problems.' },
    { name: 'GURU — Indian Trading AI', role: 'Quantitative AI & Reinforcement-Learning Engineer', tags: ['FinTech', 'RL'], year: '2025', flyover: '', description: 'Developed an end-to-end AI-powered trading framework for the Indian stock market, focused on NSE and BSE equities. The project combines real-time market data, technical and fundamental analysis, news/sentiment intelligence, machine learning, forecasting models, risk management, and execution strategies to build a professional-grade autonomous trading agent. It showcases expertise in quantitative finance, Python, data pipelines, NLP, and AI-driven decision systems for financial markets.' },
    { name: 'DantVaidya AI', role: 'On-Device ML & Edge AI Engineer', tags: ['HealthTech', 'Edge AI'], year: '2026', flyover: '', description: 'DantVaidya AI is an offline-first, AI-powered oral health screening platform designed to address the critical shortage of dental care in rural India. By leveraging edge AI and computer vision, the platform enables rapid, zero-cost screening for cavities, gum disease, and early-stage oral cancer using a basic Android smartphone, without requiring internet connectivity or a dentist on-site.' },
    { name: 'ScholarGraph', role: 'Full-Stack Data Engineer', tags: ['Academic Tech', 'FastAPI', 'PostgreSQL'], year: '2025', flyover: '', description: 'ScholarGraph is a full-stack platform that aggregates and indexes academic researchers across Indian universities — filterable by state, institution, field, and h-index. Built with FastAPI, React, PostgreSQL, and OpenAlex/ORCID APIs, it features provenance tracking on every data point, a permanent opt-out system, mediated contact flows, and SQL-level search. Currently indexes 278+ researchers across 7 institutions with DPDP-compliant architecture' },
  ],

  freelance: [
    { name: 'AI Lead Qualification System', tags: ['AI Automation', 'Supabase', 'FastAPI'], year: '2026', flyover: '' },
    { name: 'SEO Master Agent', tags: ['MarTech', 'LLM'], year: '2026', flyover: '' },
    { name: 'AIRadar', tags: ['SaaS', 'Multi-Agent'], year: '2026', flyover: '' },
    { name: 'Upwork Lead Qualifier Bot', tags: ['AI Automation', 'FastAPI', 'React'], year: '2026', flyover: '' },
    { name: 'GURU — Indian Trading AI', tags: ['FinTech', 'RL'], year: '2026', flyover: '' },
    { name: 'DantVaidya AI', tags: ['HealthTech', 'Edge AI'], year: '2026', flyover: '' },
    { name: 'ScholarGraph', tags: ['Academic Tech', 'FastAPI', 'PostgreSQL'], year: '2026', flyover: '' },
  ],
  agency: [
    { name: 'AI Lead Qualification System', tags: ['AI Automation', 'Supabase', 'FastAPI'], year: '2026', flyover: '' },
    { name: 'SEO Master Agent', tags: ['MarTech', 'LLM'], year: '2026', flyover: '' },
    { name: 'AIRadar', tags: ['SaaS', 'Multi-Agent'], year: '2026', flyover: '' },
    { name: 'Upwork Lead Qualifier Bot', tags: ['AI Automation', 'FastAPI', 'React'], year: '2026', flyover: '' },
    { name: 'GURU — Indian Trading AI', tags: ['FinTech', 'RL'], year: '2026', flyover: '' },
    { name: 'DantVaidya AI', tags: ['HealthTech', 'Edge AI'], year: '2026', flyover: '' },
    { name: 'ScholarGraph', tags: ['Academic Tech', 'FastAPI', 'PostgreSQL'], year: '2026', flyover: '' },
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
    { title: 'AI Lead Qualification System', category: 'B2B AI Automation', image: '/images/ayush_profile.jpg' },
    { title: 'SEO Master Agent', category: '15-Agent SEO Platform', image: '/images/ayush_profile.jpg' },
    { title: 'AIRadar', category: 'Autonomous Intelligence Pipeline', image: '/images/ayush_profile.jpg', video: '/videos/airadar.mp4' },
    { title: 'Upwork Lead Qualifier Bot', category: 'AI Automation Bot', image: '/images/ayush_profile.jpg' },
    { title: 'GURU Trading AI', category: 'Reinforcement-Learning Trading', image: '/images/ayush_profile.jpg' },
    { title: 'DantVaidya AI', category: 'Offline-First Edge AI', image: '/images/ayush_profile.jpg' },
    { title: 'ScholarGraph', category: 'Compliance-First Academic Discovery', image: '/images/ayush_profile.jpg' },
  ],
  freelance: [
    { title: 'AI Lead Qualification System', category: 'B2B AI Automation', image: '/images/ayush_profile.jpg' },
    { title: 'SEO Master Agent', category: 'MarTech LLM Platform', image: '/images/ayush_profile.jpg' },
    { title: 'AIRadar', category: 'SaaS AI Pipeline', image: '/images/ayush_profile.jpg' },
    { title: 'Upwork Lead Qualifier Bot', category: 'AI Automation Bot', image: '/images/ayush_profile.jpg' },
    { title: 'GURU Trading AI', category: 'FinTech Autonomous System', image: '/images/ayush_profile.jpg' },
    { title: 'DantVaidya AI', category: 'HealthTech Edge AI', image: '/images/ayush_profile.jpg' },
    { title: 'ScholarGraph', category: 'Compliance-First Academic Discovery', image: '/images/ayush_profile.jpg' },
  ],
  agency: [
    { title: 'AI Lead Qualification System', category: 'B2B AI Automation', image: '/images/ayush_profile.jpg' },
    { title: 'SEO Master Agent', category: 'MarTech LLM Platform', image: '/images/ayush_profile.jpg' },
    { title: 'AIRadar', category: 'SaaS AI Pipeline', image: '/images/ayush_profile.jpg' },
    { title: 'Upwork Lead Qualifier Bot', category: 'AI Automation Bot', image: '/images/ayush_profile.jpg' },
    { title: 'GURU Trading AI', category: 'FinTech Autonomous System', image: '/images/ayush_profile.jpg' },
    { title: 'DantVaidya AI', category: 'HealthTech Edge AI', image: '/images/ayush_profile.jpg' },
    { title: 'ScholarGraph', category: 'Compliance-First Academic Discovery', image: '/images/ayush_profile.jpg' },
  ],
};

export const aboutBody: Record<PortfolioMode, string> = {
  personal: "I'm an AI/ML engineer who designs and ships production-grade intelligent systems end to end. Across six projects I've owned the roles of AI systems architect, computer vision engineer, LLM and prompt engineer, reinforcement-learning engineer, and compliance lead — building multi-agent clinical orchestration, an autonomous Indian-equities trading agent, offline oral-cancer diagnostics for rural India, and LLM-powered SaaS platforms. My focus is always the hard part: explainability, safety gates, regulatory compliance (HIPAA, SEBI, GDPR), and architectures that hold up under real-world load.",
  freelance: "I work as an independent AI/ML engineer, partnering with healthcare, fintech, and SaaS teams who need senior-level AI execution without the overhead. I bring deep technical depth in LLMs, multi-agent orchestration, computer vision, and reinforcement learning — and a commitment to shipping.",
  agency: "I embed with product and design teams as a senior AI engineering partner. I translate ambitious AI visions into production-ready systems — multi-agent pipelines, LLM integrations, deployed ML models — on time, on scope, and above expectations.",
};
