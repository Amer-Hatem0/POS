import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { ArrowRight, Code, Smartphone, Globe, Search, Megaphone, ShoppingBag, Zap, Shield, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const serviceCategories = [
    {
      title: 'Programming Services',
      description: 'Custom software development solutions for web and mobile platforms',
      icon: <Code className="w-12 h-12" />,
      services: [
        'Custom Web Applications',
        'E-commerce Platforms',
        'Mobile App Development',
        'API Development',
        'Database Design',
        'System Integration'
      ],
      link: '/services/programming'
    },
    {
      title: 'Marketing Services',
      description: 'Comprehensive digital marketing strategies to grow your business',
      icon: <Megaphone className="w-12 h-12" />,
      services: [
        'Search Engine Optimization',
        'Pay-Per-Click Advertising',
        'Social Media Marketing',
        'Content Marketing',
        'Email Marketing',
        'Analytics & Reporting'
      ],
      link: '/services/marketing'
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Complete online store development and management services',
      icon: <ShoppingBag className="w-12 h-12" />,
      services: [
        'Online Store Development',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Processing',
        'Customer Support',
        'Performance Optimization'
      ],
      link: '/services/ecommerce'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Quick turnaround times without compromising quality'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Solutions',
      description: 'Enterprise-grade security in all our implementations'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock support and maintenance services'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Serving clients worldwide with localized solutions'
    }
  ];

  const technologies = [
    {
      category: 'Frontend',
      items: ['React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'TypeScript']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'PHP', 'Laravel', 'Django', 'Express.js']
    },
    {
      category: 'Mobile',
      items: ['React Native', 'Flutter', 'iOS', 'Android', 'Ionic', 'Xamarin']
    },
    {
      category: 'Database',
      items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis', 'SQLite']
    },
    {
      category: 'Cloud',
      items: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Netlify', 'Heroku']
    },
    {
      category: 'Marketing',
      items: ['Google Ads', 'Facebook Ads', 'SEO Tools', 'Analytics', 'CRM', 'Automation']
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Discovery',
      description: 'We understand your requirements and business goals'
    },
    {
      step: 2,
      title: 'Planning',
      description: 'Create detailed project plan and timeline'
    },
    {
      step: 3,
      title: 'Development',
      description: 'Build your solution using best practices'
    },
    {
      step: 4,
      title: 'Testing',
      description: 'Rigorous testing to ensure quality and performance'
    },
    {
      step: 5,
      title: 'Deployment',
      description: 'Launch your project with full support'
    },
    {
      step: 6,
      title: 'Maintenance',
      description: 'Ongoing support and updates as needed'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Comprehensive digital solutions to help your business succeed in today's competitive market
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">What We Offer</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose from our comprehensive range of digital services designed to meet all your business needs
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <ScrollAnimatedSection 
                key={category.title} 
                animation="scale-in" 
                delay={index * 200}
              >
                <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-8 text-center">
                    <div className="text-primary mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-foreground">{category.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{category.description}</p>
                    
                    <div className="mb-8">
                      <ul className="space-y-2 text-left">
                        {category.services.map((service, idx) => (
                          <li key={idx} className="flex items-center text-muted-foreground">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link to={category.link}>
                      <Button className="w-full gradient-primary hover:shadow-glow">
                        Learn More <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Why Choose Us</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We deliver exceptional value through our commitment to quality and innovation
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollAnimatedSection 
                key={feature.title} 
                animation="fade-up" 
                delay={index * 100}
              >
                <div className="text-center">
                  <div className="text-primary mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Technologies We Use</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We work with the latest and most reliable technologies to deliver cutting-edge solutions
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <ScrollAnimatedSection 
                key={tech.category} 
                animation="slide-in-left" 
                delay={index * 100}
              >
                <Card className="shadow-elegant">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-foreground text-center">{tech.category}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {tech.items.map((item) => (
                        <div key={item} className="text-center p-3 bg-accent rounded-lg text-muted-foreground hover:text-primary transition-colors">
                          {item}
                        </div>
                      ))}
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
              <h2 className="text-4xl font-bold mb-6">Our Process</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                A proven methodology that ensures project success from start to finish
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="opacity-90">{step.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your project requirements and create a custom solution for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Get Free Quote
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                Schedule Consultation
              </Button>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Services;