import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { LegalWrapper } from "@/components/layout/LegalWrapper";

const LegalNotice = () => {
    const { lang } = useLanguage();

    const content = {
        fr: {
            title: "Mentions Légales",
            lastUpdate: "Dernière mise à jour : ",
            sections: [
                {
                    title: "1. Éditeur du site",
                    text: "Le présent site web est édité par AVARİN LTD (Synaptics). Pour toute demande, vous pouvez nous contacter par email à hello@synaptics.fr."
                },
                {
                    title: "2. Hébergement",
                    text: "Le site est hébergé par Vercel Inc., dont le siège social est situé au 340 S Lemon Ave #1192, Walnut, CA 91789, USA. Site web : https://vercel.com"
                },
                {
                    title: "3. Propriété intellectuelle",
                    text: "L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de Synaptics. Toute reproduction, même partielle, est strictement interdite sans accord préalable."
                },
                {
                    title: "4. Limitation de responsabilité",
                    text: "Synaptics s'efforce de fournir des informations précises mais ne peut être tenue responsable des omissions ou inexactitudes. L'utilisateur utilise le site à ses seuls risques."
                },
                {
                    title: "5. Droit applicable",
                    text: "Tout litige en relation avec l'utilisation du site est soumis au droit français. Juridiction exclusive aux tribunaux de Paris."
                }
            ],
            contact: "Synaptics AI Lab, Paris, France"
        },
        en: {
            title: "Legal Notice",
            lastUpdate: "Last updated: ",
            sections: [
                {
                    title: "1. Site Editor",
                    text: "This website is edited by AVARİN LTD (Synaptics). For any inquiries, you can contact us via email at hello@synaptics.fr."
                },
                {
                    title: "2. Hosting",
                    text: "The site is hosted by Vercel Inc., with its headquarters located at 340 S Lemon Ave #1192, Walnut, CA 91789, USA. Website: https://vercel.com"
                },
                {
                    title: "3. Intellectual Property",
                    text: "All content on this site (texts, images, graphics, logo, icons, etc.) is the exclusive property of Synaptics. Any reproduction, even partial, is strictly prohibited without prior agreement."
                },
                {
                    title: "4. Limitation of Liability",
                    text: "Synaptics strives to provide accurate information but cannot be held responsible for omissions or inaccuracies. The user uses the site at their own risk."
                },
                {
                    title: "5. Governing Law",
                    text: "Any dispute in connection with the use of the site is subject to French law. Exclusive jurisdiction to the courts of Paris."
                }
            ],
            contact: "Synaptics AI Lab, Paris, France"
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

export default LegalNotice;
