import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { LegalWrapper } from "@/components/layout/LegalWrapper";

const CookiePolicy = () => {
    const { lang } = useLanguage();

    const content = {
        fr: {
            title: "Politique de Cookies",
            lastUpdate: "Dernière mise à jour : ",
            sections: [
                {
                    title: "1. Qu'est-ce qu'un cookie ?",
                    text: "Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site. Ils sont utilisés pour faire fonctionner les sites web efficacement et fournir des informations aux propriétaires."
                },
                {
                    title: "2. Utilisation",
                    text: "Synaptics utilise des cookies pour :",
                    list: [
                        "Assurer le bon fonctionnement technique (cookies essentiels).",
                        "Analyser l'audience et les performances (Vercel Analytics).",
                        "Mémoriser vos préférences de langue."
                    ]
                },
                {
                    title: "3. Types de cookies",
                    text: "Nous utilisons des cookies strictement nécessaires au fonctionnement, des cookies de performance pour l'analyse d'audience, et des cookies de préférence pour votre confort de navigation."
                },
                {
                    title: "4. Gestion",
                    text: "Vous pouvez configurer votre navigateur pour bloquer les cookies. Notez que si vous refusez les cookies essentiels, certaines parties du site pourraient ne pas fonctionner correctement."
                }
            ],
            contact: "Pour toute question : compliance@synaptics.fr"
        },
        en: {
            title: "Cookie Policy",
            lastUpdate: "Last updated: ",
            sections: [
                {
                    title: "1. What is a cookie?",
                    text: "A cookie is a small text file placed on your computer when visiting a site. They are used to make websites work efficiently and provide information to the owners."
                },
                {
                    title: "2. Usage",
                    text: "Synaptics uses cookies to:",
                    list: [
                        "Ensure proper technical functioning (essential cookies).",
                        "Analyze audience and performance (Vercel Analytics).",
                        "Remember your language preferences."
                    ]
                },
                {
                    title: "3. Types of Cookies",
                    text: "We use strictly necessary cookies for functioning, performance cookies for audience analysis, and preference cookies for your browsing comfort."
                },
                {
                    title: "4. Management",
                    text: "You can configure your browser to block cookies. Note that if you refuse essential cookies, some parts of the site may not function properly."
                }
            ],
            contact: "For any questions: compliance@synaptics.fr"
        }
    };

    const t = content[lang as keyof typeof content];

    return (
        <Layout variant="dark">
            <LegalWrapper 
                title={t.title}
                lastUpdate={`${t.lastUpdate}${new Date().toLocaleDateString()}`}
                sections={t.sections}
                contact={t.contact}
            />
        </Layout>
    );
};

export default CookiePolicy;
