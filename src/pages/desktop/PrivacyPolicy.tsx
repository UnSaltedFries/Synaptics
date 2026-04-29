import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { LegalWrapper } from "@/components/layout/LegalWrapper";

const PrivacyPolicy = () => {
    const { lang } = useLanguage();

    const content = {
        fr: {
            title: "Politique de Confidentialité",
            lastUpdate: "Dernière mise à jour : ",
            sections: [
                {
                    title: "1. Introduction",
                    text: "Chez Synaptics, nous prenons votre vie privée au sérieux. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web et utilisez nos services d'agents IA."
                },
                {
                    title: "2. Collecte des informations",
                    text: "Nous pouvons collecter des informations vous concernant de différentes manières, notamment :",
                    list: [
                        "Informations personnelles : Nom, adresse email, numéro de téléphone, nom de l'entreprise, et autres informations que vous nous fournissez volontairement via nos formulaires de contact.",
                        "Données d'utilisation : Informations sur la façon dont vous accédez et utilisez le site, y compris votre adresse IP, le type de navigateur, et les pages visitées.",
                        "Données des agents IA : Dans le cadre de nos services, nous pouvons traiter des données vocales et textuelles nécessaires au fonctionnement de nos agents conversationnels."
                    ]
                },
                {
                    title: "3. Utilisation des informations",
                    text: "Nous utilisons les informations collectées pour :",
                    list: [
                        "Fournir, exploiter et maintenir nos services",
                        "Améliorer, personnaliser et développer notre site web et nos produits",
                        "Comprendre et analyser comment vous utilisez nos services",
                        "Développer de nouveaux produits, services, caractéristiques et fonctionnalités",
                        "Communiquer avec vous pour le service client"
                    ]
                },
                {
                    title: "4. Partage des informations",
                    text: "Nous ne vendons, n'échangeons, ni ne louons vos informations personnelles d'identification à des tiers. Nous pouvons partager des informations démographiques agrégées génériques non liées à des informations personnelles d'identification concernant les visiteurs."
                },
                {
                    title: "5. Sécurité des données",
                    text: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger contre l'accès non autorisé. Tous les échanges de données sensibles et privées entre le site et ses utilisateurs se font via un canal de communication sécurisé SSL."
                },
                {
                    title: "6. Vos droits (RGPD)",
                    text: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :",
                    list: [
                        "Droit d'accès à vos données personnelles",
                        "Droit de rectification de vos données",
                        "Droit à l'effacement ('droit à l'oubli')",
                        "Droit à la limitation du traitement",
                        "Droit à la portabilité des données",
                        "Droit d'opposition"
                    ]
                }
            ],
            contact: "Pour exercer ces droits, veuillez nous contacter à : compliance@synaptics.fr"
        },
        en: {
            title: "Privacy Policy",
            lastUpdate: "Last updated: ",
            sections: [
                {
                    title: "1. Introduction",
                    text: "At Synaptics, we take your privacy seriously. This privacy policy explains how we collect, use, disclose, and protect your information when you visit our website and use our AI agent services."
                },
                {
                    title: "2. Information Collection",
                    text: "We may collect information about you in various ways, including:",
                    list: [
                        "Personal Information: Name, email address, phone number, company name, and other information you voluntarily provide via our contact forms.",
                        "Usage Data: Information on how you access and use the site, including your IP address, browser type, and pages visited.",
                        "AI Agent Data: As part of our services, we may process voice and text data necessary for the operation of our conversational agents."
                    ]
                },
                {
                    title: "3. Use of Information",
                    text: "We use the collected information to:",
                    list: [
                        "Provide, operate, and maintain our services",
                        "Improve, personalize, and develop our website and products",
                        "Understand and analyze how you use our services",
                        "Develop new products, services, features, and functionalities",
                        "Communicate with you for customer service"
                    ]
                },
                {
                    title: "4. Information Sharing",
                    text: "We do not sell, trade, or rent your personal identification information to third parties. We may share generic aggregated demographic information not linked to any personal identification information."
                },
                {
                    title: "5. Data Security",
                    text: "We implement appropriate security measures to protect against unauthorized access. All sensitive and private data exchanges between the site and its users happen via an SSL-secured communication channel."
                },
                {
                    title: "6. Your Rights (GDPR)",
                    text: "Under the General Data Protection Regulation (GDPR), you have the following rights:",
                    list: [
                        "Right to access your personal data",
                        "Right to rectification of your data",
                        "Right to erasure ('right to be forgotten')",
                        "Right to restriction of processing",
                        "Right to data portability",
                        "Right to object"
                    ]
                }
            ],
            contact: "To exercise these rights, please contact us at: compliance@synaptics.fr"
        }
    };

    const t = content[lang as keyof typeof content];

    return (
        <Layout variant="light">
            <LegalWrapper>
                <div className="bg-white min-h-screen pt-24 pb-16 md:pt-40 md:pb-32">
                    <div className="container max-w-4xl px-5 md:px-0 text-black">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-black">{t.title}</h1>
                        <p className="text-gray-500 mb-12">{t.lastUpdate}{new Date().toLocaleDateString()}</p>

                        <div className="prose prose-lg max-w-none text-gray-600">
                            {t.sections.map((section, idx) => (
                                <div key={idx} className="mb-12">
                                    <h2 className="text-2xl font-semibold text-black mb-6">{section.title}</h2>
                                    <p className="mb-6">{section.text}</p>
                                    {section.list && (
                                        <ul className="list-disc pl-6 mb-6 space-y-2">
                                            {section.list.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                            
                            <div className="pt-8 border-t border-gray-100">
                                <p className="mb-6 font-medium text-black">{t.contact}</p>
                                <p className="font-medium text-black">
                                    Synaptics AI<br />
                                    Paris, France<br />
                                    Email: hello@synaptics.fr
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </LegalWrapper>
        </Layout>
    );
};

export default PrivacyPolicy;
