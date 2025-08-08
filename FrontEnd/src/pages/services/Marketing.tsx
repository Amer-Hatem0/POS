import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Search, Megaphone, BarChart3, Mail, Target, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react';
import marketingImage from '@/assets/marketing.jpg';

const Marketing = () => {
  const services = [
    {
      icon: <Search className="w-10 h-10" />,
      title: 'Search Engine Optimization',
      description: 'Improve your website ranking and organic traffic with proven SEO strategies',
      features: ['Keyword Research', 'On-page Optimization', 'Link Building', 'Technical SEO'],
      deliverables: ['SEO Audit Report', 'Keyword Strategy', 'Monthly Reports', 'Performance Analytics'],
      pricing: 'Starting from $800/month'
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: 'Pay-Per-Click Advertising',
      description: 'Drive immediate traffic with targeted PPC campaigns across multiple platforms',
      features: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Campaign Optimization'],
      deliverables: ['Campaign Setup', 'Ad Creation', 'Landing Pages', 'Performance Reports'],
      pricing: 'Starting from $1,200/month'
    },
    {
      icon: <Megaphone className="w-10 h-10" />,
      title: 'Social Media Marketing',
      description: 'Build brand awareness and engage with your audience across social platforms',
      features: ['Content Creation', 'Community Management', 'Paid Social', 'Influencer Outreach'],
      deliverables: ['Content Calendar', 'Post Creation', 'Community Management', 'Growth Reports'],
      pricing: 'Starting from $600/month'
    },
    {
      icon: <Mail className="w-10 h-10" />,
      title: 'Email Marketing',
      description: 'Nurture leads and retain customers with personalized email campaigns',
      features: ['Email Design', 'Automation Setup', 'List Segmentation', 'A/B Testing'],
      deliverables: ['Email Templates', 'Automation Flows', 'Performance Reports', 'List Growth'],
      pricing: 'Starting from $400/month'
    }
  ];

  const results = [
    {
      metric: '250%',
      label: 'Average Traffic Increase',
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      metric: '180%',
      label: 'ROI Improvement',
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      metric: '95%',
      label: 'Client Retention Rate',
      icon: <Users className="w-8 h-8" />
    },
    {
      metric: '30+',
      label: 'Industries Served',
      icon: <Zap className="w-8 h-8" />
    }
  ];

  const caseStudies = [
    {
      title: 'E-Commerce Growth Campaign',
      client: 'Fashion Retailer',
      challenge: 'Low online sales and brand awareness',
      solution: 'Comprehensive SEO and PPC strategy with social media marketing',
      results: [
        '300% increase in organic traffic',
        '250% boost in online sales',
        '150% growth in social media followers',
        'ROAS of 450%'
      ],
      duration: '6 months'
    },
    {
      title: 'Local Business Visibility',
      client: 'Restaurant Chain',
      challenge: 'Poor local search visibility and foot traffic',
      solution: 'Local SEO optimization and Google My Business management',
      results: [
        '400% increase in local searches',
        '200% more phone inquiries',
        '180% growth in store visits',
        'Top 3 rankings for local keywords'
      ],
      duration: '4 months'
    },
    {
      title: 'B2B Lead Generation',
      client: 'SaaS Company',
      challenge: 'Lack of qualified leads and low conversion rates',
      solution: 'LinkedIn advertising and content marketing strategy',
      results: [
        '500% increase in qualified leads',
        '180% improvement in conversion rate',
        '300% growth in demo requests',
        'ROI of 380%'
      ],
      duration: '8 months'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Strategy Development',
      description: 'Analyze your business and create a customized marketing strategy'
    },
    {
      step: 2,
      title: 'Campaign Setup',
      description: 'Set up campaigns across chosen marketing channels'
    },
    {
      step: 3,
      title: 'Content Creation',
      description: 'Develop compelling content and creative assets'
    },
    {
      step: 4,
      title: 'Launch & Optimize',
      description: 'Launch campaigns and continuously optimize performance'
    },
    {
      step: 5,
      title: 'Monitor & Report',
      description: 'Track results and provide detailed performance reports'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Marketing Services</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Comprehensive digital marketing strategies that drive real results and grow your business
              </p>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Start Growing Today <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Proven Results</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Our data-driven approach delivers measurable growth for businesses of all sizes
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <ScrollAnimatedSection 
                key={result.label} 
                animation="scale-in" 
                delay={index * 100}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4 text-white/80">
                    {result.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{result.metric}</div>
                  <div className="text-white/80">{result.label}</div>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
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
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ScrollAnimatedSection 
                key={service.title} 
                animation={index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}
                delay={index * 100}
              >
                <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="text-primary flex-shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-foreground">{service.title}</h3>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <div className="text-2xl font-bold text-primary mb-4">{service.pricing}</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-foreground">What We Do:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-muted-foreground">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-foreground">Deliverables:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((deliverable) => (
                          <Badge key={deliverable} variant="outline" className="text-xs">{deliverable}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full gradient-primary">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Success Stories</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real campaigns with real results that showcase our marketing expertise
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <ScrollAnimatedSection 
                key={study.title} 
                animation="fade-up" 
                delay={index * 150}
              >
                <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={marketingImage} 
                      alt={study.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">{study.duration}</Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{study.title}</h3>
                    <p className="text-primary font-semibold mb-4">{study.client}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-foreground">Challenge:</h4>
                      <p className="text-muted-foreground text-sm">{study.challenge}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-foreground">Solution:</h4>
                      <p className="text-muted-foreground text-sm">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Results:</h4>
                      <ul className="space-y-1 text-sm">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-center text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-primary text-white">
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

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's create a custom marketing strategy that drives real results for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Get Free Marketing Audit
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                Schedule Strategy Call
              </Button>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Marketing;