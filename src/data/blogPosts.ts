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
        slug: "introduction-aux-agents-synaptics",
        date: "2024-04-20",
        author: "Alex Rivers",
        category: "AI Technology",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
        title: {
            fr: "L'Aube des Agents Autonomes",
            en: "The Dawn of Autonomous Agents"
        },
        excerpt: {
            fr: "Comment nous avons conçu le moteur Synaptics v4.0 pour transformer des processus manuels complexes en workflows fluides et automatisés.",
            en: "How we designed the Synaptics v4.0 engine to transform complex manual processes into fluid, automated workflows."
        },
        content: {
            fr: "Le futur du travail n'est pas dans l'outil, mais dans l'agent. Chez Synaptics, nous avons passé les 12 derniers mois à perfectionner une architecture capable non seulement de comprendre les intentions, mais de les exécuter avec une précision chirurgicale...",
            en: "The future of work is not in the tool, but in the agent. At Synaptics, we spent the last 12 months perfecting an architecture capable of not only understanding intent, but executing it with surgical precision..."
        }
    },
    {
        id: "2",
        slug: "securite-donnees-ia",
        date: "2024-04-15",
        author: "Elena Vance",
        category: "Security",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
        title: {
            fr: "Sécurité & Confidentialité by Design",
            en: "Security & Privacy by Design"
        },
        excerpt: {
            fr: "Pourquoi le chiffrement de bout en bout et l'anonymisation des données sont les piliers de notre infrastructure d'IA.",
            en: "Why end-to-end encryption and data anonymization are the pillars of our AI infrastructure."
        },
        content: {
            fr: "Dans un monde où la donnée est le nouveau pétrole, la protection de vos informations n'est pas une option. Nos agents opèrent dans des sandboxes isolées...",
            en: "In a world where data is the new oil, protecting your information is not an option. Our agents operate in isolated sandboxes..."
        }
    },
    {
        id: "3",
        slug: "roi-automatisation-2024",
        date: "2024-04-10",
        author: "Marcus Thorne",
        category: "Business",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
        title: {
            fr: "Mesurer le ROI de l'IA Générative",
            en: "Measuring Generative AI ROI"
        },
        excerpt: {
            fr: "Une analyse profonde sur les gains de productivité réels constatés chez nos clients après 6 mois d'utilisation.",
            en: "A deep dive into the real productivity gains seen by our clients after 6 months of use."
        },
        content: {
            fr: "L'automatisation ne se mesure pas seulement en temps gagné, mais en opportunités saisies. Découvrez comment une clinique médicale a réduit son délai de réponse de 80%...",
            en: "Automation is not just measured in time saved, but in opportunities seized. Discover how a medical clinic reduced its response time by 80%..."
        }
    }
];
