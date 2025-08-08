import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Code, Smartphone, Globe, Database, Zap, Shield, Layers, ArrowRight } from 'lucide-react';

const Programming = () => {
  const services = [
    {
      icon: <Globe className="w-10 h-10" />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      features: ['Responsive Design', 'Fast Performance', 'SEO Optimized', 'Cross-browser Compatible'],
      technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Laravel'],
      pricing: 'Starting from $2,000'
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      features: ['Native Performance', 'Cross-platform', 'Push Notifications', 'Offline Support'],
      technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
      pricing: 'Starting from $5,000'
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: 'Backend Development',
      description: 'Robust server-side solutions and API development',
      features: ['RESTful APIs', 'Database Design', 'Authentication', 'Scalable Architecture'],
      technologies: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS'],
      pricing: 'Starting from $3,000'
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: 'Full-Stack Solutions',
      description: 'Complete end-to-end application development',
      features: ['Frontend + Backend', 'Database Integration', 'Admin Panels', 'User Management'],
      technologies: ['MERN', 'MEAN', 'Django', 'Laravel', 'Next.js'],
      pricing: 'Starting from $7,000'
    }
  ];

  const portfolio = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with payment integration',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: ['Product Management', 'Order Processing', 'Payment Gateway', 'Admin Dashboard']
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management mobile application',
      technologies: ['React Native', 'Firebase', 'Redux', 'Push Notifications'],
      features: ['Real-time Updates', 'Team Collaboration', 'File Sharing', 'Time Tracking']
    },
    {
      title: 'Learning Management System',
      description: 'Online education platform with video streaming',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3'],
      features: ['Video Streaming', 'Progress Tracking', 'Certificates', 'Interactive Quizzes']
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Requirements Analysis',
      description: 'Understanding your needs and defining project scope'
    },
    {
      step: 2,
      title: 'System Design',
      description: 'Creating architecture and technical specifications'
    },
    {
      step: 3,
      title: 'Development',
      description: 'Coding using best practices and modern technologies'
    },
    {
      step: 4,
      title: 'Quality Assurance',
      description: 'Comprehensive testing and bug fixing'
    },
    {
      step: 5,
      title: 'Deployment',
      description: 'Going live with monitoring and support'
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Development',
      description: 'Agile methodology for quick delivery'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Code',
      description: 'Security-first approach in all development'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Maintainable and scalable codebase'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Scalable Solutions',
      description: 'Built to grow with your business'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Programming Services</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Custom software development solutions that bring your ideas to life with cutting-edge technology
              </p>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
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
                      <h4 className="font-semibold mb-3 text-foreground">Key Features:</h4>
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
                      <h4 className="font-semibold mb-3 text-foreground">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full gradient-primary">
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>
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
              <ScrollAnimatedSection 
                key={benefit.title} 
                animation="scale-in" 
                delay={index * 100}
              >
                <div className="text-center">
                  <div className="text-primary mb-4 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Featured Projects</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real projects that showcase our programming expertise
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <ScrollAnimatedSection 
                key={project.title} 
                animation="fade-up" 
                delay={index * 150}
              >
                <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-foreground">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {feature}
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
              <h2 className="text-4xl font-bold mb-6">Our Development Process</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                A systematic approach that ensures quality and timely delivery
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Your Application?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your project requirements and bring your ideas to life with professional development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Get Free Consultation
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                View Portfolio
              </Button>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Programming;