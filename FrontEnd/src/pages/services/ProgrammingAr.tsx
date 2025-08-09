import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import { Code, Smartphone, Globe, Database, Zap, Shield, Layers, ArrowRight, Monitor } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/FooterAr";

const ASSET_BASE = import.meta.env.VITE_API_BASE_URL1 as string | undefined;

const iconMap = {
  web: Globe,
  mobile: Smartphone,
  backend: Database,
  fullstack: Layers,
  default: Monitor,
};

const formatUSD = (n?: number | null) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
    : "";

const pickIcon = (title?: string, titleAr?: string | null) => {
  const t = `${title || ""} ${titleAr || ""}`.toLowerCase();
  // عربي + إنجليزي
  if (t.includes("ويب") || t.includes("web") || t.includes("موقع")) return iconMap.web;
  if (t.includes("تطبيق") || t.includes("جوال") || t.includes("موبايل") || t.includes("mobile") || t.includes("ios") || t.includes("android") || t.includes("app")) return iconMap.mobile;
  if (t.includes("باك") || t.includes("خلفي") || t.includes("api") || t.includes("backend")) return iconMap.backend;
  if (t.includes("فل") || t.includes("ستاك") || t.includes("full") || t.includes("stack")) return iconMap.fullstack;
  return iconMap.default;
};

const resolveIconSrc = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (ASSET_BASE && url.startsWith("/")) return `${ASSET_BASE}${url}`;
  return url;
};

const ProgrammingAr = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/service");
        if (!mounted) return;
        // خدمات البرمجة فقط (فئة 1) والظاهرة
        const programmingOnly = (res.data || []).filter(
          (s: any) => s.isVisible && Number(s.categoryId) === 1
        );
        setServices(programmingOnly);
      } catch (e: any) {
        setErr("فشل في تحميل خدمات البرمجة. حاول مرة أخرى.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const benefits = [
    { icon: <Zap className="w-8 h-8" />, title: "تطوير سريع", description: "منهجية أجايل لتسليم سريع" },
    { icon: <Shield className="w-8 h-8" />, title: "أمان عالي", description: "نهج أمني أولًا في كل التطوير" },
    { icon: <Code className="w-8 h-8" />, title: "كود نظيف", description: "قاعدة برمجية قابلة للصيانة والتوسّع" },
    { icon: <Database className="w-8 h-8" />, title: "قابلية التوسّع", description: "حلول مبنية للنمو مع عملك" },
  ];

  const process = [
    { step: 1, title: "تحليل المتطلبات", description: "فهم احتياجاتك وتحديد نطاق المشروع" },
    { step: 2, title: "تصميم النظام", description: "إنشاء المعمارية والمواصفات التقنية" },
    { step: 3, title: "التطوير", description: "برمجة وفق أفضل الممارسات وأحدث التقنيات" },
    { step: 4, title: "ضمان الجودة", description: "اختبارات شاملة وإصلاح الأخطاء" },
    { step: 5, title: "الإطلاق", description: "إطلاق حي مع مراقبة ودعم" },
  ];

  return (
    <div className="min-h-screen pt-20" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">خدمات البرمجة</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                حلول برمجية مخصصة تحوّل أفكارك إلى واقع باستخدام أحدث التقنيات
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Services Grid (Dynamic, Arabic fields) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">خدماتنا البرمجية</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                حلول متكاملة للويب والموبايل والباك إند
              </p>
            </div>
          </ScrollAnimatedSection>

          {err && <div className="text-center text-red-600 mb-8">{err}</div>}

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center text-muted-foreground">لا توجد خدمات متاحة حاليًا.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service: any, index: number) => {
                const Icon = pickIcon(service.title, service.titleAr);
                const pricing = service.priceFrom ? `ابتداءً من ${formatUSD(service.priceFrom)}` : "";
                const iconSrc = resolveIconSrc(service.iconUrl);

                return (
                  <ScrollAnimatedSection
                    key={service.id}
                    animation={index % 2 === 0 ? "slide-in-right" : "slide-in-left"}
                    delay={index * 100}
                  >
                    <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="text-primary flex-shrink-0">
                            {iconSrc ? (
                              <img src={iconSrc} alt="icon" className="w-10 h-10 object-contain" />
                            ) : (
                              <Icon className="w-10 h-10" />
                            )}
                          </div>
                          <div className="text-right">
                            <h3 className="text-2xl font-bold mb-2 text-foreground">
                              {service.titleAr || service.title}
                            </h3>
                            {(service.descriptionAr || service.description) && (
                              <p className="text-muted-foreground mb-4">
                                {service.descriptionAr || service.description}
                              </p>
                            )}
                            {pricing && <div className="text-2xl font-bold text-primary mb-4">{pricing}</div>}
                          </div>
                        </div>

                        {Array.isArray(service.features) && service.features.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-foreground">الميزات الرئيسية:</h4>
                            <ul className="space-y-2">
                              {service.features.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-center text-muted-foreground">
                                  <span className="w-2 h-2 bg-primary rounded-full ml-3" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {Array.isArray(service.technologies) && service.technologies.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-foreground">التقنيات:</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech: string) => (
                                <Badge key={tech} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </ScrollAnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Benefits (Arabic) */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">لماذا خدماتنا البرمجية؟</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                نقدّم كودًا عالي الجودة يدفع نجاح عملك
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollAnimatedSection key={benefit.title} animation="scale-in" delay={index * 100}>
                <div className="text-center">
                  <div className="text-primary mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process (Arabic) */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">منهجية التطوير</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">منهجية منهجية تضمن الجودة والتسليم في الوقت</p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <ScrollAnimatedSection key={step.step} animation="scale-in" delay={index * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="opacity-90 text-sm">{step.description}</p>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (Arabic) */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">جاهز لبناء تطبيقك؟</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              دعنا نناقش متطلبات مشروعك ونحوّل أفكارك إلى واقع باحترافية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 gradient-hero"
              >
                ابدأ مشروعك <ArrowRight className="mr-2 w-5 h-5" />
              </Button>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgrammingAr;
