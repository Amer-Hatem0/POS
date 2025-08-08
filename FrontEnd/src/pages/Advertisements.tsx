import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { TrendingUp, Target, Eye, BarChart3, Calendar, MapPin } from 'lucide-react';
import marketingImage from '@/assets/marketing.jpg';
import Navbar from "../components/Navbar";
 import Footer from "../components/Footer";
const Advertisements = () => {
  const campaigns = [
    {
      id: 1,
      title: 'E-Commerce Growth Campaign',
      description: 'Comprehensive digital marketing campaign that increased online sales by 250% in 3 months.',
      image: marketingImage,
      client: 'Fashion Forward',
      industry: 'E-Commerce',
      duration: '3 months',
      results: {
        impressions: '2.5M+',
        clicks: '150K+',
        conversions: '8.5K+',
        roas: '450%'
      },
      services: ['Google Ads', 'Facebook Ads', 'SEO', 'Email Marketing'],
      status: 'Completed',
      year: '2024'
    },
    {
      id: 2,
      title: 'Local Business Visibility',
      description: 'Local SEO and Google My Business optimization for a restaurant chain.',
      image: marketingImage,
      client: 'Tasty Bites',
      industry: 'Food & Beverage',
      duration: '6 months',
      results: {
        impressions: '500K+',
        clicks: '25K+',
        conversions: '2.1K+',
        roas: '320%'
      },
      services: ['Local SEO', 'GMB Optimization', 'Social Media'],
      status: 'Ongoing',
      year: '2024'
    },
    {
      id: 3,
      title: 'Tech Startup Launch',
      description: 'Full-scale product launch campaign including brand awareness and lead generation.',
      image: marketingImage,
      client: 'InnovateTech',
      industry: 'Technology',
      duration: '4 months',
      results: {
        impressions: '1.8M+',
        clicks: '95K+',
        conversions: '5.2K+',
        roas: '380%'
      },
      services: ['LinkedIn Ads', 'Content Marketing', 'PR', 'PPC'],
      status: 'Completed',
      year: '2023'
    },
    {
      id: 4,
      title: 'Healthcare Practice Growth',
      description: 'Digital marketing strategy for a healthcare practice to increase patient bookings.',
      image: marketingImage,
      client: 'MedCare Plus',
      industry: 'Healthcare',
      duration: '8 months',
      results: {
        impressions: '800K+',
        clicks: '45K+',
        conversions: '3.8K+',
        roas: '290%'
      },
      services: ['Google Ads', 'SEO', 'Content Marketing'],
      status: 'Completed',
      year: '2023'
    },
    {
      id: 5,
      title: 'Real Estate Lead Generation',
      description: 'Targeted advertising campaign for luxury real estate properties.',
      image: marketingImage,
      client: 'Premium Properties',
      industry: 'Real Estate',
      duration: '5 months',
      results: {
        impressions: '1.2M+',
        clicks: '68K+',
        conversions: '4.1K+',
        roas: '420%'
      },
      services: ['Facebook Ads', 'Instagram Ads', 'Video Marketing'],
      status: 'Completed',
      year: '2023'
    },
    {
      id: 6,
      title: 'Educational Platform Promotion',
      description: 'Student acquisition campaign for an online learning platform.',
      image: marketingImage,
      client: 'EduLearn Pro',
      industry: 'Education',
      duration: '6 months',
      results: {
        impressions: '3.1M+',
        clicks: '180K+',
        conversions: '12K+',
        roas: '380%'
      },
      services: ['YouTube Ads', 'Google Ads', 'Social Media'],
      status: 'Ongoing',
      year: '2024'
    }
  ];

  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'PPC Advertising',
      description: 'Google Ads, Facebook Ads, LinkedIn Ads management with ROI optimization'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'SEO Services',
      description: 'On-page and off-page SEO to improve organic search rankings'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Social Media Marketing',
      description: 'Complete social media management and advertising across all platforms'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics & Reporting',
      description: 'Detailed performance tracking and monthly reporting with insights'
    }
  ];

  const stats = [
    { number: '50M+', label: 'Total Impressions Generated' },
    { number: '2.5M+', label: 'Clicks Delivered' },
    { number: '150K+', label: 'Conversions Achieved' },
    { number: '375%', label: 'Average ROAS' }
  ];

  return (
    <div className="min-h-screen pt-20">
       <Navbar />
      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Advertisement Campaigns</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Successful digital marketing campaigns that drive real results for our clients
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

    

      {/* Services Overview */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Marketing Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive digital marketing solutions to grow your business
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ScrollAnimatedSection 
                key={service.title} 
                animation="scale-in" 
                delay={index * 100}
              >
                <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 text-center">
                  <CardContent className="p-6">
                    <div className="text-primary mb-4 flex justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Showcase */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Featured Campaigns</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real campaigns with real results that showcase our expertise
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => (
              <ScrollAnimatedSection 
                key={campaign.id} 
                animation={index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}
                delay={index * 100}
              >
                <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={campaign.status === 'Ongoing' ? 'bg-green-500' : 'bg-primary'}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{campaign.year}</Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{campaign.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{campaign.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Client: {campaign.client}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Duration: {campaign.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Target className="w-4 h-4 mr-2" />
                        <span>Industry: {campaign.industry}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-foreground">Services Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {campaign.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-accent rounded-lg">
                      <h4 className="font-semibold mb-3 text-foreground">Campaign Results:</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-primary">{campaign.results.impressions}</div>
                          <div className="text-muted-foreground">Impressions</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-primary">{campaign.results.clicks}</div>
                          <div className="text-muted-foreground">Clicks</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-primary">{campaign.results.conversions}</div>
                          <div className="text-muted-foreground">Conversions</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-primary">{campaign.results.roas}</div>
                          <div className="text-muted-foreground">ROAS</div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full gradient-primary">
                      View Case Study
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's create a custom marketing strategy that delivers real results for your business
            </p>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              Start Your Campaign Today
            </Button>
          </ScrollAnimatedSection>
        </div>
      </section>
           <Footer />
    </div>
  );
};

export default Advertisements;