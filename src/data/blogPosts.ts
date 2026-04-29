export interface BlogPost {
    id: string;
    slug: string;
    date: string;
    author: string;
    category: string;
    image: string;
    title: {
        fr: string;
        en: string;
    };
    excerpt: {
        fr: string;
        en: string;
    };
    content: {
        fr: string;
        en: string;
    };
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "multi-agent-orchestration-v4",
        date: "2024-04-28",
        author: "Tech Team",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
        title: {
            fr: "Orchestration Multi-Agents avec Synaptics v4.0",
            en: "Multi-Agent Orchestration with Synaptics v4.0"
        },
        excerpt: {
            fr: "Plongée technique dans notre moteur d'orchestration basé sur les graphes d'états pour gérer des workflows complexes.",
            en: "A technical deep dive into our state-graph based orchestration engine for managing complex workflows."
        },
        content: {
            fr: "Le passage d'un agent linéaire à un système multi-agents a nécessité une refonte totale de notre approche. En utilisant une architecture de type State Graph, nous permettons à différents agents spécialisés (Booking Agent, Support Agent, Qualification Agent) de collaborer de manière asynchrone tout en maintenant un contexte global partagé...",
            en: "Moving from a linear agent to a multi-agent system required a total overhaul of our approach. By using a State Graph architecture, we allow different specialized agents (Booking Agent, Support Agent, Qualification Agent) to collaborate asynchronously while maintaining a shared global context..."
        }
    },
    {
        id: "2",
        slug: "voice-latency-optimization",
        date: "2024-04-22",
        author: "Audio Engine Team",
        category: "Performance",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
        title: {
            fr: "Optimisation de la Latence Vocale : Le Défi des 500ms",
            en: "Voice Latency Optimization: The 500ms Challenge"
        },
        excerpt: {
            fr: "Comment nous avons réduit la latence de bout en bout pour rendre les conversations IA indiscernables des humains.",
            en: "How we reduced end-to-end latency to make AI conversations indistinguishable from humans."
        },
        content: {
            fr: "La latence est l'ennemi numéro un de l'immersion. Dans cet article, nous détaillons notre pile technologique combinant WebSockets, streaming de tokens TTS (Text-to-Speech) et pré-chargement prédictif des réponses pour atteindre une réactivité quasi humaine...",
            en: "Latency is the number one enemy of immersion. In this article, we detail our technology stack combining WebSockets, TTS (Text-to-Speech) token streaming, and predictive response pre-loading to achieve near-human responsiveness..."
        }
    },
    {
        id: "3",
        slug: "secure-llm-gateways",
        date: "2024-04-15",
        author: "Security Lead",
        category: "Security",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
        title: {
            fr: "Passerelles LLM Sécurisées & Protection PII",
            en: "Secure LLM Gateways & PII Protection"
        },
        excerpt: {
            fr: "Implémentation d'un middleware d'anonymisation pour garantir la conformité RGPD dans toutes les interactions IA.",
            en: "Implementing an anonymization middleware to ensure GDPR compliance in all AI interactions."
        },
        content: {
            fr: "La sécurité des données dans l'IA générative est critique. Nous avons développé une passerelle propriétaire qui filtre les informations personnellement identifiables (PII) avant qu'elles n'atteignent les modèles distants, garantissant que les données sensibles ne quittent jamais votre infrastructure...",
            en: "Data security in generative AI is critical. We have developed a proprietary gateway that filters personally identifiable information (PII) before it reaches remote models, ensuring that sensitive data never leaves your infrastructure..."
        }
    },
    {
        id: "4",
        slug: "hybrid-rag-architectures",
        date: "2024-04-05",
        author: "Data Science Team",
        category: "R&D",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
        title: {
            fr: "RAG Hybride : Vector Search vs Knowledge Graphs",
            en: "Hybrid RAG: Vector Search vs Knowledge Graphs"
        },
        excerpt: {
            fr: "Pourquoi nous combinons la recherche vectorielle avec des graphes de connaissances pour des réponses plus précises.",
            en: "Why we combine vector search with knowledge graphs for more accurate responses."
        },
        content: {
            fr: "Le RAG (Retrieval-Augmented Generation) classique a ses limites, notamment sur les relations complexes. Notre approche hybride utilise Neo4j pour le contexte structurel et Pinecone pour la similarité sémantique, offrant une précision de réponse inégalée...",
            en: "Classic RAG (Retrieval-Augmented Generation) has its limits, especially on complex relationships. Our hybrid approach uses Neo4j for structural context and Pinecone for semantic similarity, offering unparalleled response accuracy..."
        }
    }
];
