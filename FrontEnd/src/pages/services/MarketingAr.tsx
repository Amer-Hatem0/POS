import React, { useEffect, useState } from 'react';
import api from "@/lib/axios";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { ArrowRight, Monitor } from 'lucide-react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/FooterAr";

const ASSET_BASE = import.meta.env.VITE_API_BASE_URL1 as string | undefined;

const formatUSD = (n?: number | null) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
    : "";

const resolveIconSrc = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (ASSET_BASE && url.startsWith("/")) return `${ASSET_BASE}${url}`;
  return url;
};

const MarketingAr = () => {
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
        // فقط خدمات الماركتنج (فئة 2) والظاهرة
        const marketing = (res.data || []).filter(
          (s: any) => s.isVisible && Number(s.categoryId) === 2
        );
        setServices(marketing);
      } catch {
        setErr("فشل في تحميل خدمات التسويق. حاول مرة أخرى.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const process = [
    { step: 1, title: 'بناء الإستراتيجية', description: 'تحليل نشاطك التجاري وبناء خطة تسويق مخصصة' },
    { step: 2, title: 'إعداد الحملات', description: 'تجهيز الحملات عبر القنوات التسويقية المختارة' },
    { step: 3, title: 'إنشاء المحتوى', description: 'إنتاج محتوى جذاب ومواد إبداعية' },
    { step: 4, title: 'الإطلاق والتحسين', description: 'إطلاق الحملات والتحسين المستمر للأداء' },
    { step: 5, title: 'المتابعة والتقارير', description: 'متابعة النتائج وتقديم تقارير أداء تفصيلية' },
  ];

  return (
    <div className="min-h-screen pt-20" dir="rtl">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">خدمات التسويق الرقمي</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                استراتيجيات تسويق رقمي شاملة تقود نتائج حقيقية وتنمّي عملك
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">خدماتنا التسويقية</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                حلول تسويق رقمي متكاملة مصممة لتناسب أهداف عملك
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
            <div className="text-center text-muted-foreground">لا توجد خدمات تسويق متاحة حاليًا.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service: any, index: number) => {
                const iconSrc = resolveIconSrc(service.iconUrl);
                const pricing = service.priceFrom
                  ? `ابتداءً من ${formatUSD(service.priceFrom)}`
                  : "";

                return (
                  <ScrollAnimatedSection
                    key={service.id}
                    animation={index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'}
                    delay={index * 100}
                  >
                    <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="text-primary flex-shrink-0">
                            {iconSrc ? (
                              <img src={iconSrc} alt="icon" className="w-10 h-10 object-contain" />
                            ) : (
                              <Monitor className="w-10 h-10" />
                            )}
                          </div>
                          <div className="text-right">
                            <h3 className="text-2xl font-bold mb-2 text-foreground">{service.titleAr || service.title}</h3>
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
                            <h4 className="font-semibold mb-3 text-foreground">الميزات:</h4>
                            <ul className="space-y-2">
                              {service.features.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-center text-muted-foreground">
                                  <span className="w-2 h-2 bg-primary rounded-full ml-3"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {Array.isArray(service.technologies) && service.technologies.length > 0 && (
                          <div className="mb-2">
                            <h4 className="font-semibold mb-3 text-foreground">التقنيات والأدوات:</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech: string) => (
                                <Badge key={tech} variant="outline" className="text-xs">
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

      {/* Process */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">منهجية العمل</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                منهجية مجرّبة لضمان نجاح الحملات التسويقية
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <ScrollAnimatedSection
                key={step.step}
                animation="scale-in"
                delay={index * 100}
              >
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

      {/* CTA */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">جاهز لتنمية عملك؟</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              دعنا نصمم استراتيجية تسويق مخصصة تحقق نتائج ملموسة لعملك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 gradient-hero"
              >
                ابدأ الآن <ArrowRight className="mr-2 w-5 h-5" />
              </Button>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MarketingAr;
