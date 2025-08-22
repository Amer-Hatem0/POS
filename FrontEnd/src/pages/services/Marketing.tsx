import React, { useEffect, useState } from 'react';
import api from "@/lib/axios";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { ArrowRight, Monitor } from 'lucide-react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ASSET_BASE = import.meta.env.VITE_API_BASE_URL1 as string | undefined;

const formatUSD = (n?: number | null) =>
  typeof n === "number" ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n) : "";

const resolveIconSrc = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (ASSET_BASE && url.startsWith("/")) return `${ASSET_BASE}${url}`;
  return url;
};

const Marketing = () => {
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
        // عرض فقط الخدمات التي فئتها 2 والظاهرة
        const marketingServices = (res.data || []).filter(
          (s: any) => s.isVisible && s.categoryId === 2
        );
        setServices(marketingServices);
      } catch {
        setErr("Failed to load marketing services. Please try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  const process = [
    { step: 1, title: 'Strategy Development', description: 'Analyze your business and create a customized marketing strategy' },
    { step: 2, title: 'Campaign Setup', description: 'Set up campaigns across chosen marketing channels' },
    { step: 3, title: 'Content Creation', description: 'Develop compelling content and creative assets' },
    { step: 4, title: 'Launch & Optimize', description: 'Launch campaigns and continuously optimize performance' },
    { step: 5, title: 'Monitor & Report', description: 'Track results and provide detailed performance reports' }
  ];

  return (
    <div className="min-h-screen pt-20">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Marketing Services</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Comprehensive digital marketing strategies that drive real results and grow your business
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Marketing Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Full-service digital marketing solutions tailored to your business goals
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
            <div className="text-center text-muted-foreground">No marketing services available at the moment.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service: any, index: number) => {
                const iconSrc = resolveIconSrc(service.iconUrl);
                const pricing = service.priceFrom ? `Starting from ${formatUSD(service.priceFrom)}` : "";

                return (
                  <ScrollAnimatedSection
                    key={service.id}
                    animation={index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}
                    delay={index * 100}
                  >
                    <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="text-primary1 flex-shrink-0">
                            {iconSrc ? (
                              <img src={iconSrc} alt="icon" className="w-10 h-10 object-contain" />
                            ) : (
                              <Monitor className="w-10 h-10" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-2 text-foreground">{service.title}</h3>
                            {service.description && <p className="text-muted-foreground mb-4">{service.description}</p>}
                            {pricing && <div className="text-2xl font-bold text-primary1 mb-4">{pricing}</div>}
                          </div>
                        </div>

                        {Array.isArray(service.features) && service.features.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-foreground">What We Do:</h4>
                            <ul className="space-y-2">
                              {service.features.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-center text-muted-foreground">
                                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {Array.isArray(service.technologies) && service.technologies.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-foreground">Deliverables:</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech: string) => (
                                <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
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
      <section className="py-20 bg-primary1 text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Marketing Process</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                A proven methodology that ensures successful marketing campaigns
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
                  <div className="w-16 h-16 bg-white text-primary1 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
      <section className="py-20   t ">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's create a custom marketing strategy that drives real results for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-2 border-white text-white  hover:bg-white hover:text-primary1 text-lg px-8 py-4 gradient-hero">
                Start Growing Today <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
             
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marketing;
