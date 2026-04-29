export interface Project {
  id: string;
  title: string;
  title_fr?: string;
  subtitle: string;
  subtitle_fr?: string;
  description: string;
  description_fr?: string;
  year: string;
  role: string;
  role_fr?: string;
  tags: string[];
  tags_fr?: string[];
  color: string;
  heroImage?: string;
  dashboardImage?: string;
  fullDescription: string;
  fullDescription_fr?: string;
  review?: string;
  review_fr?: string;
  galleryImages: string[];
}

export const projects: Project[] = [
  {
    id: "medical-clinic",
    title: "Healthcare Voice Agent v2.0",
    title_fr: "Agent Vocal Santé v2.0",
    subtitle: "Orchestrating high-concurrency voice calls with EHR integration.",
    subtitle_fr: "Orchestration d'appels voix haute concurrence avec intégration DPI.",
    description: "Healthcare AI Architecture",
    description_fr: "Architecture IA Santé",
    year: "2025",
    role: "System Design · WebSockets · HIPAA",
    role_fr: "Design Système · WebSockets · HIPAA",
    tags: ["VOICE AI", "WEB RTC", "FASTAPI"],
    tags_fr: ["IA VOCALE", "WEB RTC", "FASTAPI"],
    color: "hsl(160, 50%, 45%)",
    heroImage: "/images/medical-clinic.png",
    dashboardImage: "/images/medical-dashboard.png",
    fullDescription: "Built on a high-availability FastAPI backbone, this agent handles concurrent SIP streams via Twilio Media Streams. We implemented a custom token-buffer logic to reduce TTS latency to <450ms. The system performs real-time HIPAA-compliant data extraction to update Doctolib calendars via secure webhooks, ensuring 99.9% booking accuracy.",
    fullDescription_fr: "Basé sur un backbone FastAPI haute disponibilité, cet agent gère des flux SIP concurrents via Twilio Media Streams. Nous avons implémenté une logique de 'token-buffering' personnalisée pour réduire la latence TTS à moins de 450ms. Le système effectue une extraction de données en temps réel conforme HIPAA pour mettre à jour les agendas Doctolib via des webhooks sécurisés.",
    review: "Technical precision was key; Synaptics delivered a zero-latency solution.",
    review_fr: "“La précision technique était la clé ; Synaptics a livré une solution sans latence.”",
    galleryImages: ["/images/medical-clinic.png"],
  },
  {
    id: "real-estate",
    title: "Real Estate Lead Qualifier",
    title_fr: "Qualificateur de Leads Immo",
    subtitle: "Autonomous lead scoring engine with CRM bidirectional sync.",
    subtitle_fr: "Moteur de scoring de leads autonome avec synchro CRM bidirectionnelle.",
    description: "Lead Gen Engineering",
    description_fr: "Ingénierie de Leads",
    year: "2025",
    role: "Vector Search · CRM Automation",
    role_fr: "Recherche Vectorielle · Auto CRM",
    tags: ["PINECONE", "RAG", "AUTOMATION"],
    tags_fr: ["PINECONE", "RAG", "AUTOMATION"],
    color: "hsl(220, 60%, 50%)",
    heroImage: "/images/real-estate.png",
    fullDescription: "This project involved building a hybrid RAG system using Pinecone to match buyer preferences with available listings in real-time. We engineered a proprietary lead-scoring algorithm that processes voice sentiment analysis and intent recognition, pushing qualified data directly into HubSpot's API with structured JSON payloads.",
    fullDescription_fr: "Ce projet consistait à construire un système RAG hybride utilisant Pinecone pour faire correspondre les préférences des acheteurs aux annonces en temps réel. Nous avons conçu un algorithme de scoring propriétaire analysant le sentiment vocal et la reconnaissance d'intention, poussant les données directement dans l'API HubSpot.",
    galleryImages: ["/images/real-estate.png"],
  },
  {
    id: "law-firm",
    title: "Legal Intake Pipeline",
    title_fr: "Pipeline d'Accueil Juridique",
    subtitle: "Secure document processing and urgent case routing architecture.",
    subtitle_fr: "Architecture de traitement de documents et routage de cas urgents.",
    description: "Legal Ops Tech",
    description_fr: "Legal Ops Tech",
    year: "2024",
    role: "Document Intelligence · Encryption",
    role_fr: "Intelligence Doc · Chiffrement",
    tags: ["OCR", "NLP", "PRIVACY"],
    tags_fr: ["OCR", "NLP", "CONFIDENTIALITÉ"],
    color: "hsl(30, 70%, 55%)",
    heroImage: "/images/law-firm.png",
    fullDescription: "Implemented a multi-stage NLP pipeline for automatic triage of legal inquiries. Using a combination of custom NER (Named Entity Recognition) and GPT-4o-mini, the system extracts critical case metadata and performs risk assessment. Data is encrypted at rest using AES-256, ensuring attorney-client privilege is maintained throughout the automation flow.",
    fullDescription_fr: "Implémentation d'un pipeline NLP multi-étapes pour le triage automatique des demandes juridiques. En combinant un NER personnalisé et GPT-4o-mini, le système extrait les métadonnées critiques et évalue les risques. Les données sont chiffrées au repos en AES-256, garantissant le secret professionnel.",
    galleryImages: ["/images/law-firm.png"],
  },
  {
    id: "logistics-automation",
    title: "Supply Chain Orchestrator",
    title_fr: "Orchestrateur Supply Chain",
    subtitle: "Real-time fleet tracking and automated dispatching system.",
    subtitle_fr: "Suivi de flotte temps réel et système de dispatch automatisé.",
    description: "Logistics Engineering",
    description_fr: "Ingénierie Logistique",
    year: "2024",
    role: "API Integration · Geofencing",
    role_fr: "Intégration API · Geofencing",
    tags: ["LOGISTICS", "REAL-TIME", "MQTT"],
    tags_fr: ["LOGISTIQUE", "TEMPS RÉEL", "MQTT"],
    color: "hsl(280, 50%, 45%)",
    heroImage: "/images/logistics.png",
    fullDescription: "Connected a fleet of 200+ vehicles to an AI dispatcher using MQTT protocols for low-latency communication. The system processes GPS telemetry and traffic data to autonomously re-route drivers and update delivery windows via SMS/Voice. This reduced fuel consumption by 15% and improved SLA compliance by 22%.",
    fullDescription_fr: "Connexion d'une flotte de plus de 200 véhicules à un dispatcheur IA via protocoles MQTT. Le système traite la télémétrie GPS et le trafic pour router les chauffeurs de manière autonome et mettre à jour les fenêtres de livraison via SMS/Voix.",
    galleryImages: ["/images/logistics.png"],
  }
];
