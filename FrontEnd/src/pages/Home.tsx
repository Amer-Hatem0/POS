import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { ArrowRight, Code, Palette, Rocket, Star, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bg.jpg';
import teamImage from '@/assets/team.jpg';

const Home = () => {
  const stats = [
    { number: '150+', label: 'Projects Completed', icon: <Award className="w-6 h-6" /> },
    { number: '50+', label: 'Happy Clients', icon: <Users className="w-6 h-6" /> },
    { number: '3', label: 'Years Experience', icon: <Star className="w-6 h-6" /> },
    { number: '99%', label: 'Success Rate', icon: <Rocket className="w-6 h-6" /> },
  ];

  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      icon: <Palette className="w-8 h-8" />,
    },
    {
      title: 'Digital Marketing',
      description: 'Complete digital marketing solutions to grow your business online',
      icon: <Rocket className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <ScrollAnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your <br />
              <span className="text-transparent bg-clip-text gradient-primary">Digital Vision</span>
            </h1>
          </ScrollAnimatedSection>
          
          <ScrollAnimatedSection animation="fade-up" delay={200}>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              We create stunning websites, powerful mobile apps, and drive results with our expert digital marketing services
            </p>
          </ScrollAnimatedSection>
          
          <ScrollAnimatedSection animation="scale-in" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary hover:shadow-glow text-lg px-8 py-4">
                Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                View Our Work
              </Button>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimatedSection key={stat.label} animation="scale-in" delay={index * 100}>
                <div className="text-center">
                  <div className="flex justify-center mb-4 text-white/80">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We offer comprehensive digital solutions to help your business thrive in the digital age
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollAnimatedSection 
                key={service.title} 
                animation={index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}
                delay={index * 100}
              >
                <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="text-primary mb-6 flex justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>
          
          <ScrollAnimatedSection delay={600}>
            <div className="text-center mt-12">
              <Link to="/services">
                <Button size="lg" className="gradient-primary hover:shadow-glow">
                  View All Services <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimatedSection animation="slide-in-left">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About POS Tech</h2>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  We are a passionate team of developers, designers, and digital marketers dedicated to creating exceptional digital experiences.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  With years of experience and a commitment to innovation, we help businesses of all sizes achieve their digital goals through custom solutions and strategic marketing.
                </p>
                <Link to="/about">
                  <Button className="gradient-primary hover:shadow-glow">
                    Learn More About Us <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </ScrollAnimatedSection>
            
            <ScrollAnimatedSection animation="slide-in-right">
              <div className="relative">
                <img 
                  src={teamImage} 
                  alt="Our Team" 
                  className="rounded-2xl shadow-elegant w-full h-auto"
                />
                <div className="absolute inset-0 gradient-hero opacity-20 rounded-2xl"></div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss how we can help transform your business with our comprehensive digital solutions
            </p>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              Contact Us Today <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;