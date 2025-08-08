import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { ShoppingBag, CreditCard, Package, BarChart3, Shield, Zap, Users, Smartphone, ArrowRight } from 'lucide-react';
import projectsImage from '@/assets/projects-showcase.jpg';

const ECommerce = () => {
  const services = [
    {
      icon: <ShoppingBag className="w-10 h-10" />,
      title: 'Online Store Development',
      description: 'Custom e-commerce websites built for performance and conversions',
      features: ['Responsive Design', 'Product Management', 'Shopping Cart', 'User Accounts'],
      platforms: ['Shopify', 'WooCommerce', 'Magento', 'Custom Solutions'],
      pricing: 'Starting from $3,000'
    },
    {
      icon: <CreditCard className="w-10 h-10" />,
      title: 'Payment Gateway Integration',
      description: 'Secure payment processing with multiple payment options',
      features: ['Multi-payment Support', 'Secure Checkout', 'Fraud Protection', 'PCI Compliance'],
      platforms: ['Stripe', 'PayPal', 'Square', 'Local Gateways'],
      pricing: 'Starting from $500'
    },
    {
      icon: <Package className="w-10 h-10" />,
      title: 'Inventory Management',
      description: 'Advanced inventory tracking and management systems',
      features: ['Stock Tracking', 'Auto Reorder', 'Supplier Management', 'Multi-location'],
      platforms: ['Custom Systems', 'API Integration', 'Third-party Tools', 'Cloud Solutions'],
      pricing: 'Starting from $1,500'
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: 'Mobile Commerce',
      description: 'Mobile apps and responsive design for mobile shopping',
      features: ['Mobile Apps', 'PWA Development', 'Mobile Optimization', 'Push Notifications'],
      platforms: ['React Native', 'Flutter', 'PWA', 'Responsive Web'],
      pricing: 'Starting from $4,000'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Compliant',
      description: 'SSL certificates, PCI compliance, and data protection'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Performance',
      description: 'Optimized for speed and better user experience'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'User-Friendly',
      description: 'Intuitive design that converts visitors into customers'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics Ready',
      description: 'Built-in tracking for sales, inventory, and customer data'
    }
  ];

  const portfolio = [
    {
      title: 'Fashion E-Commerce Store',
      description: 'Complete online fashion store with 1000+ products and advanced filtering',
      platform: 'Custom React/Node.js',
      features: ['Advanced Search', 'Wishlist', 'Reviews', 'Size Guide'],
      results: ['300% increase in sales', '50% better conversion rate', '200% more mobile traffic'],
      image: projectsImage
    },
    {
      title: 'Electronics Marketplace',
      description: 'Multi-vendor marketplace with vendor dashboard and commission system',
      platform: 'Laravel/Vue.js',
      features: ['Vendor Management', 'Commission System', 'Multi-payment', 'Admin Dashboard'],
      results: ['150+ active vendors', '5000+ products listed', '99.9% uptime'],
      image: projectsImage
    },
    {
      title: 'Food Delivery Platform',
      description: 'Complete food ordering system with real-time tracking',
      platform: 'React Native/Node.js',
      features: ['Real-time Tracking', 'Multiple Restaurants', 'Payment Integration', 'Driver App'],
      results: ['10000+ orders processed', '95% customer satisfaction', '30min average delivery'],
      image: projectsImage
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Business Analysis',
      description: 'Understanding your business model and requirements'
    },
    {
      step: 2,
      title: 'Platform Selection',
      description: 'Choosing the best e-commerce platform for your needs'
    },
    {
      step: 3,
      title: 'Design & Development',
      description: 'Creating your store with custom design and features'
    },
    {
      step: 4,
      title: 'Integration & Testing',
      description: 'Integrating payments, shipping, and thorough testing'
    },
    {
      step: 5,
      title: 'Launch & Support',
      description: 'Going live with ongoing maintenance and support'
    }
  ];

  const pricing = [
    {
      title: 'Starter Package',
      price: '$3,000',
      description: 'Perfect for small businesses starting online',
      features: [
        'Up to 50 products',
        'Basic payment integration',
        'Responsive design',
        'SSL certificate',
        '3 months support'
      ],
      popular: false
    },
    {
      title: 'Professional Package',
      price: '$7,500',
      description: 'Ideal for growing businesses with advanced needs',
      features: [
        'Unlimited products',
        'Multiple payment gateways',
        'Advanced features',
        'SEO optimization',
        '6 months support',
        'Analytics dashboard'
      ],
      popular: true
    },
    {
      title: 'Enterprise Package',
      price: '$15,000+',
      description: 'Custom solutions for large businesses',
      features: [
        'Custom development',
        'Multi-vendor support',
        'Advanced integrations',
        'Custom features',
        '1 year support',
        'Priority support'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">E-Commerce Solutions</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Complete online store solutions that drive sales and grow your business
              </p>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Start Selling Online <ArrowRight className="ml-2 w-5 h-5" />
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our E-Commerce Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive e-commerce solutions from store setup to ongoing optimization
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
                      <h4 className="font-semibold mb-3 text-foreground">Platforms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.platforms.map((platform) => (
                          <Badge key={platform} variant="outline">{platform}</Badge>
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

      {/* Features */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Why Choose Our E-Commerce Solutions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built for performance, security, and growth
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollAnimatedSection 
                key={feature.title} 
                animation="scale-in" 
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

      {/* Portfolio */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Featured E-Commerce Projects</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Successful online stores we've built for our clients
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
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">{project.platform}</Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-foreground">Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">{feature}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Results:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {project.results.map((result, idx) => (
                          <li key={idx} className="flex items-center">
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

      {/* Pricing */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">E-Commerce Packages</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect package for your online store needs
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {pricing.map((pkg, index) => (
              <ScrollAnimatedSection 
                key={pkg.title} 
                animation="scale-in" 
                delay={index * 150}
              >
                <Card className={`h-full shadow-elegant hover:shadow-glow transition-all duration-300 ${pkg.popular ? 'ring-2 ring-primary scale-105' : ''}`}>
                  <CardContent className="p-8 text-center">
                    {pkg.popular && (
                      <Badge className="mb-4 bg-primary text-white">Most Popular</Badge>
                    )}
                    <h3 className="text-3xl font-bold mb-2 text-foreground">{pkg.title}</h3>
                    <div className="text-4xl font-bold text-primary mb-4">{pkg.price}</div>
                    <p className="text-muted-foreground mb-6">{pkg.description}</p>
                    
                    <ul className="space-y-3 mb-8 text-left">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-muted-foreground">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${pkg.popular ? 'gradient-primary' : ''}`}
                      variant={pkg.popular ? 'default' : 'outline'}
                    >
                      Choose Package
                    </Button>
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
              <h2 className="text-4xl font-bold mb-6">Our E-Commerce Process</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                From concept to launch, we handle every aspect of your online store
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Selling Online?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's build your e-commerce store and start generating revenue for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Get Free Consultation
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                View Our Portfolio
              </Button>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ECommerce;