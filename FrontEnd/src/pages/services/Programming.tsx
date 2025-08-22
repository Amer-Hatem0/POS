import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import { Code, Smartphone, Globe, Database, Zap, Shield, Layers, ArrowRight, Monitor } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
const ASSET_BASE = import.meta.env.VITE_API_BASE_URL1 as string | undefined;

const iconMap = {
  web: Globe,
  mobile: Smartphone,
  backend: Database,
  fullstack: Layers,
  default: Monitor,
};

const formatUSD = (n?: number | null) =>
  typeof n === "number" ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n) : "";

const pickIcon = (title: string, titleAr?: string | null) => {
  const t = `${title} ${titleAr || ""}`.toLowerCase();
  if (t.includes("web")) return iconMap.web;
  if (t.includes("mobile") || t.includes("app") || t.includes("ios") || t.includes("android")) return iconMap.mobile;
  if (t.includes("backend") || t.includes("api")) return iconMap.backend;
  if (t.includes("full") || t.includes("stack")) return iconMap.fullstack;
  return iconMap.default;
};

const resolveIconSrc = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (ASSET_BASE && url.startsWith("/")) return `${ASSET_BASE}${url}`;
  return url;
};

const Programming = () => {
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
        const programmingOnly = (res.data || []).filter(
  (s: any) => s.categoryName?.toLowerCase().includes("programming") || s.categoryId === 1
);
const visibleProgramming = programmingOnly.filter((s: any) => s.isVisible);
setServices(visibleProgramming);
        // نعرض فقط الظاهرة
      
      } catch (e: any) {
        setErr("Failed to load services. Please try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const benefits = [
    { icon: <Zap className="w-8 h-8" />, title: "Fast Development", description: "Agile methodology for quick delivery" },
    { icon: <Shield className="w-8 h-8" />, title: "Secure Code", description: "Security-first approach in all development" },
    { icon: <Code className="w-8 h-8" />, title: "Clean Code", description: "Maintainable and scalable codebase" },
    { icon: <Database className="w-8 h-8" />, title: "Scalable Solutions", description: "Built to grow with your business" },
  ];

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      {/* Hero Section */}
      <section className="pt-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Programming Services</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Custom software development solutions that bring your ideas to life with cutting-edge technology
              </p>
          
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Services Grid (Dynamic) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Programming Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive development solutions for web, mobile, and backend systems
              </p>
            </div>
          </ScrollAnimatedSection>

          {err && (
            <div className="text-center text-red-600 mb-8">
              {err}
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center text-muted-foreground">No services available at the moment.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service: any, index: number) => {
                const Icon = pickIcon(service.title, service.titleAr);
                const pricing = service.priceFrom ? `Starting from ${formatUSD(service.priceFrom)}` : "";
                const iconSrc = resolveIconSrc(service.iconUrl);

                return (
                  <ScrollAnimatedSection
                    key={service.id}
                    animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                    delay={index * 100}
                  >
                    <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="text-primary1 flex-shrink-0">
                            {iconSrc ? (
                              <img src={iconSrc} alt="icon" className="w-10 h-10 object-contain" />
                            ) : (
                              <Icon className="w-10 h-10" />
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
                            <h4 className="font-semibold mb-3 text-foreground">Key Features:</h4>
                            <ul className="space-y-2">
                              {service.features.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-center text-muted-foreground">
                                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {Array.isArray(service.technologies) && service.technologies.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-foreground">Technologies:</h4>
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

      {/* Benefits */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Why Choose Our Programming Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We deliver high-quality code that powers your business success
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollAnimatedSection key={benefit.title} animation="scale-in" delay={index * 100}>
                <div className="text-center">
                  <div className="text-primary1 mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-primary1 text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Development Process</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">A systematic approach that ensures quality and timely delivery</p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <ScrollAnimatedSection key={n} animation="scale-in" delay={i * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white text-primary1 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {n}
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {["Requirements Analysis", "System Design", "Development", "Quality Assurance", "Deployment"][i]}
                  </h3>
                  <p className="opacity-90 text-sm">
                    {
                      [
                        "Understanding your needs and defining project scope",
                        "Creating architecture and technical specifications",
                        "Coding using best practices and modern technologies",
                        "Comprehensive testing and bug fixing",
                        "Going live with monitoring and support",
                      ][i]
                    }
                  </p>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20  ">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Your Application?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your project requirements and bring your ideas to life with professional development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary1 text-lg px-8 py-4 gradient-hero">
                  Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Programming;
