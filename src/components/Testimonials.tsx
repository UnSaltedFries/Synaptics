import { useLanguage } from "@/contexts/LanguageContext";

export function Testimonials() {
    const { t } = useLanguage();

    const testimonials = [
        { quote: t("testimonial.1.quote"), name: t("testimonial.1.name"), role: t("testimonial.1.role"), initials: "SM" },
        { quote: t("testimonial.2.quote"), name: t("testimonial.2.name"), role: t("testimonial.2.role"), initials: "JD" },
        { quote: t("testimonial.3.quote"), name: t("testimonial.3.name"), role: t("testimonial.3.role"), initials: "ML" },
        { quote: t("testimonial.4.quote"), name: t("testimonial.4.name"), role: t("testimonial.4.role"), initials: "CR" },
    ];

    return (
        <section className="py-16 md:py-24 bg-black relative overflow-hidden">


            <div className="container relative">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] mb-6">
                        {t("testimonials.title")}
                    </h2>

                    {/* Trust/Reviews Badge */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex gap-0.5 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-white text-sm font-medium">{t("testimonials.reviews")}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 hover:border-white/[0.12] transition-all duration-500 group"
                        >
                            {/* Quote icon */}
                            <svg className="w-6 h-6 text-emerald-400/40 mb-4 group-hover:text-emerald-400/60 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                            </svg>

                            {/* Quote */}
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-white/[0.08] flex items-center justify-center text-xs font-semibold text-gray-300 tracking-wider">
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
