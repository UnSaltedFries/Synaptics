import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { LegalWrapper } from "@/components/layout/LegalWrapper";

const TermsOfService = () => {
    const { lang } = useLanguage();

    const content = {
        fr: {
            title: "Conditions Générales d'Utilisation",
            lastUpdate: "Dernière mise à jour : ",
            sections: [
                {
                    title: "1. Acceptation des conditions",
                    text: "En accédant au site web de Synaptics et en l'utilisant, vous acceptez d'être lié par les présentes conditions générales d'utilisation, toutes les lois et réglementations applicables, et vous acceptez d'être responsable du respect de toutes les lois locales applicables."
                },
                {
                    title: "2. Description du service",
                    text: "Synaptics fournit des solutions d'intelligence artificielle pour l'automatisation des processus d'entreprise, y compris des agents vocaux, le traitement de documents et l'automatisation des flux de travail."
                },
                {
                    title: "3. Licence d'utilisation",
                    text: "La permission est accordée de télécharger temporairement une copie des documents sur le site web de Synaptics pour une visualisation personnelle uniquement. Sous cette licence, vous ne pouvez pas :",
                    list: [
                        "Modifier ou copier le matériel ;",
                        "Utiliser le matériel à des fins commerciales ;",
                        "Tenter de décompiler tout logiciel contenu sur le site ;",
                        "Supprimer toute mention de propriété du matériel."
                    ]
                },
                {
                    title: "4. Facturation et Paiements",
                    text: "Les conditions de paiement pour nos services sont définies dans nos contrats de service spécifiques ou sur notre page de tarification. Tous les frais sont indiqués en Euros (€) sauf indication contraire."
                },
                {
                    title: "5. Limitation de responsabilité",
                    text: "En aucun cas, Synaptics ne sera responsable de tout dommage découlant de l'utilisation ou de l'incapacité d'utiliser le matériel sur le site web de Synaptics."
                }
            ],
            contact: "Pour toute question concernant ces Conditions d'Utilisation, veuillez nous contacter à : hello@synaptics.fr"
        },
        en: {
            title: "Terms of Service",
            lastUpdate: "Last updated: ",
            sections: [
                {
                    title: "1. Acceptance of Terms",
                    text: "By accessing and using the Synaptics website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws."
                },
                {
                    title: "2. Description of Service",
                    text: "Synaptics provides artificial intelligence solutions for business process automation, including voice agents, document processing, and workflow automation."
                },
                {
                    title: "3. Use License",
                    text: "Permission is granted to temporarily download one copy of the materials on Synaptics' website for personal viewing only. Under this license, you may not:",
                    list: [
                        "Modify or copy the materials;",
                        "Use the materials for any commercial purpose;",
                        "Attempt to decompile any software contained on the site;",
                        "Remove any copyright or other proprietary notations."
                    ]
                },
                {
                    title: "4. Billing and Payments",
                    text: "Payment terms for our services are defined in our specific service contracts or on our pricing page. All fees are listed in Euros (€) unless stated otherwise."
                },
                {
                    title: "5. Limitation of Liability",
                    text: "In no event shall Synaptics be liable for any damages arising out of the use or inability to use the materials on Synaptics' website."
                }
            ],
            contact: "For any questions regarding these Terms of Service, please contact us at: hello@synaptics.fr"
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

export default TermsOfService;
