import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Phone, MapPin, Briefcase, Rocket, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurText from "@/components/BlurText";

const formSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  company: z.string().trim().min(1, "Entreprise requise").max(100),
  industry: z.string().min(1, "Secteur requis"),
  description: z.string().trim().min(1, "Description requise").max(2000),
  budget: z.string().min(1, "Budget requis"),
  deadline: z.string().trim().min(1, "Délai requis").max(200),
  referral: z.string().trim().min(1, "Champ requis").max(200),
  industryDetails: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

const INPUT_CLASS = "bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-600 rounded-xl h-11 px-4 focus:border-purple-500/50 focus:bg-white/[0.06] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all text-sm w-full outline-none";
const LABEL_CLASS = "text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500 mb-2 block";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const industries = [
    "Santé & Médical",
    "Immobilier",
    "Juridique",
    "Restauration",
    "BTP / Artisanat",
    "Comptabilité",
    "E-commerce",
    "Autre"
  ];

  const budgetOptions = [
    { value: "starter", label: "Moins de 1k€ / mois" },
    { value: "growth", label: "1k€ - 5k€ / mois" },
    { value: "enterprise", label: "Plus de 5k€ / mois" },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "", budget: "", deadline: "", referral: "",
      industryDetails: ""
    }
  });

  const selectedIndustry = form.watch("industry");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { 
        body: {
          ...data,
          projectType: data.industry, // Mapping for backward compatibility if needed
          timeline: data.deadline
        } 
      });
      if (error) console.warn("Supabase function error:", error);
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Critical error:", error);
      setIsSubmitted(true);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout variant="dark" footerThreshold={0.80}>
      <section className="min-h-screen bg-black text-white pt-32 pb-24 relative overflow-hidden">
        {/* Ambient background rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <div className="mb-6">
                    <BlurText
                        text="Contactez"
                        className="text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[0.9] text-white"
                        delay={100}
                        animateBy="words"
                        direction="bottom"
                    />
                    <BlurText
                        text="l'Équipe"
                        className="text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                        delay={300}
                        animateBy="words"
                        direction="bottom"
                    />
                </div>
                <motion.p 
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-gray-400 text-lg max-w-md leading-relaxed"
                >
                  Une question ou envie de voir Synaptics en action ? Utilisez le formulaire ou contactez-nous directement.
                </motion.p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: <Briefcase className="w-5 h-5 text-blue-400" />,
                    title: "Cas d'usage",
                    desc: "Agents IA pour appels, emails, documents, facturation et workflows personnalisés.",
                  },
                  {
                    icon: <Rocket className="w-5 h-5 text-purple-400" />,
                    title: "Déploiement",
                    desc: "Le déploiement s'effectue après le développement (la durée dépendra de votre projet).",
                  },
                  {
                    icon: <CreditCard className="w-5 h-5 text-gray-400" />,
                    title: "Tarifs",
                    desc: "Forfaits mensuels fixes selon le nombre de fonctionnalités et le volume. Sans frais cachés.",
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-5 group hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm mb-1">{card.title}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact Footer */}
              <div className="pt-8 border-t border-white/[0.08] flex flex-wrap gap-x-8 gap-y-4">
                <a href="mailto:hello@synaptics.fr" className="flex items-center gap-2 group text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  <span className="text-xs font-medium">hello@synaptics.fr</span>
                </a>
                <a href="tel:+33672627040" className="flex items-center gap-2 group text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">+33 6 72 62 70 40</span>
                    <span className="text-[10px] text-gray-600">Disponible de 8h à 20h</span>
                  </div>
                </a>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-medium italic">Paris, France</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: FORM CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="relative rounded-[2.5rem] border border-white/[0.1] bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        
                        <motion.div 
                          variants={{
                            hidden: { opacity: 0 },
                            show: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.4
                              }
                            }
                          }}
                          initial="hidden"
                          animate="show"
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                              <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={LABEL_CLASS}>Nom <span className="text-blue-400">*</span></FormLabel>
                                  <FormControl><Input placeholder="Jane Doe" className={INPUT_CLASS} {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </motion.div>
                            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                              <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={LABEL_CLASS}>Email <span className="text-blue-400">*</span></FormLabel>
                                  <FormControl><Input type="email" placeholder="jane@clinic.com" className={INPUT_CLASS} {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </motion.div>
                          </div>

                          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                            <FormField control={form.control} name="company" render={({ field }) => (
                              <FormItem>
                                <FormLabel className={LABEL_CLASS}>Nom de l'entreprise <span className="text-blue-400">*</span></FormLabel>
                                <FormControl><Input placeholder="Nom de l'entreprise" className={INPUT_CLASS} {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </motion.div>

                          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                            <FormField control={form.control} name="industry" render={({ field }) => (
                              <FormItem>
                                <FormLabel className={LABEL_CLASS}>Secteurs d'activité <span className="text-blue-400">*</span></FormLabel>
                                <div className="flex flex-col md:flex-row gap-4 items-start">
                                  <div className={cn("transition-all duration-500 w-full", selectedIndustry === "Autre" ? "md:w-1/2" : "w-full")}>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className={INPUT_CLASS}>
                                          <SelectValue placeholder="Secteurs d'activité" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-neutral-900 border-white/10 text-white rounded-xl">
                                        {industries.map(ind => (
                                          <SelectItem key={ind} value={ind} className="hover:bg-white/5 cursor-pointer">{ind}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <AnimatePresence>
                                    {selectedIndustry === "Autre" && (
                                      <motion.div 
                                        initial={{ opacity: 0, x: 20, width: 0 }}
                                        animate={{ opacity: 1, x: 0, width: "100%" }}
                                        exit={{ opacity: 0, x: 20, width: 0 }}
                                        className="md:w-1/2 overflow-hidden"
                                      >
                                        <FormField control={form.control} name="industryDetails" render={({ field: detailField }) => (
                                          <FormItem className="w-full">
                                            <FormControl>
                                              <Input 
                                                placeholder="Précisez votre secteur..." 
                                                className={INPUT_CLASS} 
                                                {...detailField} 
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </motion.div>

                          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                            <FormField control={form.control} name="description" render={({ field }) => (
                              <FormItem>
                                <FormLabel className={LABEL_CLASS}>Décrivez votre besoin <span className="text-blue-400">*</span></FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Combien d'appels recevez-vous ? Quel problème souhaitez-vous résoudre ?" 
                                    className={cn(INPUT_CLASS, "min-h-[120px] py-3 resize-none")} 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </motion.div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                              <FormField control={form.control} name="budget" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={LABEL_CLASS}>Budget <span className="text-blue-400">*</span></FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className={INPUT_CLASS}>
                                        <SelectValue placeholder="Sélectionnez" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-neutral-900 border-white/10 text-white rounded-xl">
                                      {budgetOptions.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value} className="hover:bg-white/5 cursor-pointer">{opt.label}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </motion.div>
                            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                              <FormField control={form.control} name="deadline" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={LABEL_CLASS}>Délai <span className="text-blue-400">*</span></FormLabel>
                                  <FormControl><Input placeholder="ex. Urgent, 2 semaines" className={INPUT_CLASS} {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </motion.div>
                          </div>

                          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                            <FormField control={form.control} name="referral" render={({ field }) => (
                              <FormItem>
                                <FormLabel className={LABEL_CLASS}>Comment vous nous avez trouvé <span className="text-blue-400">*</span></FormLabel>
                                <FormControl><Input placeholder="Google, recommandation..." className={INPUT_CLASS} {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </motion.div>

                          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.4)] border-0"
                            >
                              {isSubmitting ? "Envoi en cours..." : "Demander une démo →"}
                            </Button>
                          </motion.div>
                        </motion.div>
                      </form>
                    </Form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-8">
                        <Check className="w-10 h-10 text-green-400" />
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">Message envoyé !</h2>
                      <p className="text-gray-400 max-w-sm mx-auto mb-10">
                        Merci de nous avoir contactés. Notre équipe reviendra vers vous sous 24h.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="rounded-xl border-white/10 hover:bg-white/5 text-white"
                      >
                        Envoyer un autre message
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;