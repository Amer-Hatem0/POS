import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      info: 'hello@postech.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      info: '123 Business Street, City, Country',
      description: 'Our office location'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      info: 'Mon-Fri: 9:00AM - 6:00PM',
      description: 'Weekend support available'
    }
  ];

  const services = [
    'Web Development',
    'Mobile App Development',
    'E-Commerce Solutions',
    'Digital Marketing',
    'SEO Services',
    'Social Media Marketing',
    'PPC Advertising',
    'Consultation'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Ready to start your project? Get in touch with our team of experts
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Get In Touch</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We'd love to hear from you. Choose the best way to reach us.
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((contact, index) => (
              <ScrollAnimatedSection 
                key={contact.title} 
                animation="scale-in" 
                delay={index * 100}
              >
                <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="text-primary mb-4 flex justify-center">
                      {contact.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{contact.title}</h3>
                    <p className="text-primary font-semibold mb-2">{contact.info}</p>
                    <p className="text-muted-foreground text-sm">{contact.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollAnimatedSection animation="slide-in-left">
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-foreground">Send us a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="John"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="john@example.com"
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="service">Service Interested In</Label>
                      <select 
                        id="service"
                        className="w-full mt-1 p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="budget">Project Budget</Label>
                      <select 
                        id="budget"
                        className="w-full mt-1 p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="over-50k">Over $50,000</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        placeholder="Tell us about your project..."
                        className="mt-1 min-h-32"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full gradient-primary text-lg py-3">
                      Send Message <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>

            {/* Additional Info */}
            <ScrollAnimatedSection animation="slide-in-right">
              <div className="space-y-8">
                <Card className="shadow-elegant">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Why Choose POS Tech?</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Expert team with 3+ years of experience</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>150+ successful projects completed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>24/7 support and maintenance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Competitive pricing and flexible packages</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Free consultation and project analysis</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">What Happens Next?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-semibold text-foreground">We Review Your Request</h4>
                          <p className="text-muted-foreground text-sm">Our team analyzes your requirements within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-semibold text-foreground">Schedule a Call</h4>
                          <p className="text-muted-foreground text-sm">We arrange a consultation to discuss your project</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-semibold text-foreground">Get a Proposal</h4>
                          <p className="text-muted-foreground text-sm">Receive a detailed proposal with timeline and pricing</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">4</div>
                        <div>
                          <h4 className="font-semibold text-foreground">Start the Project</h4>
                          <p className="text-muted-foreground text-sm">Begin development with regular updates and communication</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-primary text-white shadow-elegant">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                    <p className="mb-6 opacity-90">
                      For urgent inquiries, call us directly or send us an email
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-white text-white hover:bg-white hover:text-primary"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-white text-white hover:bg-white hover:text-primary"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email Us
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Quick answers to common questions about our services
              </p>
            </div>
          </ScrollAnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollAnimatedSection animation="slide-in-left">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">How long does a typical project take?</h3>
                  <p className="text-muted-foreground">Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Do you provide ongoing support?</h3>
                  <p className="text-muted-foreground">Yes, we offer maintenance packages and 24/7 support to ensure your project runs smoothly after launch.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Can you work with existing systems?</h3>
                  <p className="text-muted-foreground">Absolutely! We specialize in system integration and can work with your existing infrastructure and third-party tools.</p>
                </div>
              </div>
            </ScrollAnimatedSection>
            
            <ScrollAnimatedSection animation="slide-in-right">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">What is your payment structure?</h3>
                  <p className="text-muted-foreground">We typically work with 50% upfront and 50% on completion, with milestone-based payments for larger projects.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Do you offer free consultations?</h3>
                  <p className="text-muted-foreground">Yes, we provide free initial consultations to understand your needs and provide project estimates.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Can you help with digital marketing?</h3>
                  <p className="text-muted-foreground">Yes, we offer comprehensive digital marketing services including SEO, PPC, social media marketing, and more.</p>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;