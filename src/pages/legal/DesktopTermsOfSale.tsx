import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { LegalWrapper } from "@/components/layout/LegalWrapper";

const TermsOfSale = () => {
    const { lang } = useLanguage();

    const content = {
        fr: {
            title: "Conditions Générales de Vente",
            lastUpdate: "Dernière mise à jour : ",
            sections: [
                {
                    title: "1. Objet",
                    text: "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Synaptics et son client, dans le cadre de la fourniture de services d'automatisation par intelligence artificielle."
                },
                {
                    title: "2. Services",
                    text: "Synaptics propose des services d'agents vocaux IA, de tri d'emails, de traitement de documents et de relances automatisées. Chaque prestation fait l'objet d'un devis ou d'un contrat spécifique précisant le périmètre d'intervention."
                },
                {
                    title: "3. Tarifs et Paiement",
                    text: "Les prix sont indiqués en Euros (€) hors taxes. Le paiement s'effectue mensuellement par prélèvement ou virement, selon les modalités définies lors de la souscription. Tout retard de paiement pourra donner lieu à l'application de pénalités de retard."
                },
                {
                    title: "4. Durée et Résiliation",
                    text: "Sauf mention contraire, les contrats sont conclus pour une durée indéterminée avec une période d'engagement minimale définie dans le contrat. La résiliation peut être effectuée moyennant un préavis raisonnable."
                },
                {
                    title: "5. Responsabilité",
                    text: "Synaptics s'engage à mettre en œuvre les moyens nécessaires pour assurer le bon fonctionnement des agents IA. Toutefois, la responsabilité de Synaptics est limitée au montant des sommes versées par le client au titre des services incriminés."
                }
            ],
            contact: "Pour toute question commerciale, contactez : sales@synaptics.fr"
        },
        en: {
            title: "Terms of Sale",
            lastUpdate: "Last updated: ",
            sections: [
                {
                    title: "1. Purpose",
                    text: "These General Terms of Sale (GTS) govern the contractual relationship between Synaptics and its client, within the framework of providing AI-powered automation services."
                },
                {
                    title: "2. Services",
                    text: "Synaptics offers AI voice agent services, email sorting, document processing, and automated follow-ups. Each service is subject to a specific quote or contract specifying the scope of work."
                },
                {
                    title: "3. Pricing and Payment",
                    text: "Prices are indicated in Euros (€) excluding taxes. Payment is made monthly via direct debit or bank transfer, according to the terms defined upon subscription. Any late payment may lead to the application of late penalties."
                },
                {
                    title: "4. Duration and Termination",
                    text: "Unless otherwise stated, contracts are concluded for an indefinite period with a minimum commitment period defined in the contract. Termination can be made with reasonable notice."
                },
                {
                    title: "5. Liability",
                    text: "Synaptics commits to implementing the necessary means to ensure the proper functioning of AI agents. However, Synaptics' liability is limited to the amount paid by the client for the services in question."
                }
            ],
            contact: "For any sales-related questions, contact: sales@synaptics.fr"
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

export default TermsOfSale;
