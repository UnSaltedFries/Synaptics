import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { LegalWrapper } from "@/components/layout/LegalWrapper";

const GDPR = () => {
    const { lang } = useLanguage();

    const content = {
        fr: {
            title: "Conformité RGPD",
            lastUpdate: "Dernière mise à jour : ",
            sections: [
                {
                    title: "1. Introduction",
                    text: "Chez Synaptics, nous nous engageons à protéger vos données personnelles et à respecter votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD). Cette page détaille notre approche de la conformité et vos droits en tant qu'utilisateur."
                },
                {
                    title: "2. Principes fondamentaux",
                    text: "Nous traitons vos données selon les principes suivants :",
                    list: [
                        "Licéité, loyauté et transparence : Vos données sont traitées de manière légale et transparente.",
                        "Limitation des finalités : Vos données sont collectées pour des objectifs déterminés, explicites et légitimes.",
                        "Minimisation des données : Nous ne collectons que les données strictement nécessaires.",
                        "Exactitude : Nous veillons à ce que vos données soient exactes et tenues à jour.",
                        "Limitation de la conservation : Vos données ne sont conservées que le temps nécessaire.",
                        "Intégrité et confidentialité : Vos données sont traitées de manière à garantir leur sécurité."
                    ]
                },
                {
                    title: "3. Vos droits",
                    text: "Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :",
                    list: [
                        "Droit d'accès : Vous pouvez demander l'accès à vos données personnelles.",
                        "Droit de rectification : Vous pouvez demander la correction de données inexactes ou incomplètes.",
                        "Droit à l'effacement : Vous pouvez demander la suppression de vos données ('droit à l'oubli').",
                        "Droit à la limitation du traitement : Vous pouvez demander de limiter l'utilisation de vos données.",
                        "Droit à la portabilité : Vous pouvez récupérer vos données pour les transmettre à un tiers.",
                        "Droit d'opposition : Vous pouvez vous opposer au traitement de vos données."
                    ]
                },
                {
                    title: "4. Transfert de données",
                    text: "Vos données sont hébergées au sein de l'Union Européenne. Si un transfert hors UE est nécessaire, nous nous assurons qu'il est encadré par des garanties appropriées (clauses contractuelles types, décisions d'adéquation) pour assurer un niveau de protection équivalent."
                },
                {
                    title: "5. DPO",
                    text: "Pour toute question relative à la protection de vos données ou pour exercer vos droits, vous pouvez contacter notre Délégué à la Protection des Données (DPO) : compliance@synaptics.fr"
                }
            ],
            contact: "Vous pouvez également adresser une réclamation à la CNIL si vous estimez que vos droits ne sont pas respectés."
        },
        en: {
            title: "GDPR Compliance",
            lastUpdate: "Last updated: ",
            sections: [
                {
                    title: "1. Introduction",
                    text: "At Synaptics, we are committed to protecting your personal data and respecting your privacy in accordance with the General Data Protection Regulation (GDPR). This page details our approach to compliance and your rights as a user."
                },
                {
                    title: "2. Core Principles",
                    text: "We process your data according to the following principles:",
                    list: [
                        "Lawfulness, fairness and transparency: Your data is processed legally and transparently.",
                        "Purpose limitation: Your data is collected for specified, explicit and legitimate purposes.",
                        "Data minimization: We only collect strictly necessary data.",
                        "Accuracy: We ensure your data is accurate and kept up to date.",
                        "Storage limitation: Your data is only kept for as long as necessary.",
                        "Integrity and confidentiality: Your data is processed to ensure its security."
                    ]
                },
                {
                    title: "3. Your Rights",
                    text: "In accordance with the GDPR, you have the following rights regarding your personal data:",
                    list: [
                        "Right of access: You can request access to your personal data.",
                        "Right to rectification: You can request correction of inaccurate or incomplete data.",
                        "Right to erasure: You can request deletion of your data ('right to be forgotten').",
                        "Right to restriction of processing: You can request to limit the use of your data.",
                        "Right to data portability: You can retrieve your data to transmit it to a third party.",
                        "Right to object: You can object to the processing of your data."
                    ]
                },
                {
                    title: "4. Data Transfer",
                    text: "Your data is hosted within the European Union. If a transfer outside the EU is necessary, we ensure it is governed by appropriate safeguards (standard contractual clauses, adequacy decisions) to ensure an equivalent level of protection."
                },
                {
                    title: "5. DPO",
                    text: "For any questions regarding your data protection or to exercise your rights, you can contact our Data Protection Officer (DPO): compliance@synaptics.fr"
                }
            ],
            contact: "You can also file a complaint with your local data protection authority (CNIL in France) if you believe your rights are not being respected."
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

export default GDPR;
