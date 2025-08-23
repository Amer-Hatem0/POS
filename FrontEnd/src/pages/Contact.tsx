import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQSection from './sections/FAQGridEn';

 



type CompanyContact = {
  name?: string;
  tagline?: string;
  taglineAr?: string;
  description?: string;
  descriptionAr?: string;
  email?: string;
  phoneNumber1?: string;
  phoneNumber2?: string;
  address?: string;
  addressAr?: string;
  website?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedInUrl?: string;
  whatsAppNumber?: string;
};

const Contact = () => {
  const [data, setData] = useState<CompanyContact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/CompanyContact')
      .then((res) => setData(res.data as CompanyContact))
      .finally(() => setLoading(false));
  }, []);

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
    // اختياري: اربط الفورم مع API الرسائل العامة إذا متوفر لاحقًا
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-muted-foreground">
        Loading contact information...
      </div>
    );
  }

  const email = data?.email || '—';
  const phone1 = data?.phoneNumber1 || '—';
  const phone2 = data?.phoneNumber2 || '';
  const address = data?.address || '—';
  
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      info: email,
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      info: phone2 ? `${phone1} / ${phone2}` : phone1,
      description: 'We’ll get back to you quickly'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      info: address,
      description: 'Our office location'
    },
 
  ];

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl mb-2 opacity-90">
                {data?.tagline || "Let's build something great together"}
              </p>
              {data?.website ? (
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 underline"
                >
                  {data.website}
                </a>
              ) : null}
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Get In Touch</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {data?.description || "We'd love to hear from you. Choose the best way to reach us."}
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((contact, index) => (
              <ScrollAnimatedSection key={contact.title} animation="scale-in" delay={index * 100}>
                <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="text-primary111 mb-4 flex justify-center aaaaaaaaaaa">{contact.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-foreground ">{contact.title}</h3>
                    <p className="text-primary111 font-semibold mb-2 aaaaaaaaaaa">{contact.info}</p>
                    <p className="text-muted-foreground text-sm">{contact.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollAnimatedSection animation="slide-in-left">
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-foreground">Send us a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="mt-1" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="mt-1" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
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
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
 

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us about your project..." className="mt-1 min-h-32" required />
                    </div>

                    <Button type="submit" className="w-full gradient-primary text-lg py-3">
                      Send Message <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection animation="slide-in-right">
              <div className="space-y-8">
                <Card className="shadow-elegant">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Why Choose Us?</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primaryY rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Experienced team and modern stack</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primaryY rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Proven delivery and support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primaryY rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Transparent pricing and timelines</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primaryY rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Free consultation and project analysis</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-foreground">Find us online</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {data?.facebookUrl ? (
                        <a
                          href={data.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 border rounded-md hover:bg-accent1 social-link-facebook"
                        >
                          <Facebook className="w-5 h-5" /> Facebook
                        </a>
                      ) : null}
                      {data?.twitterUrl ? (
                        <a
                          href={data.twitterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 border rounded-md hover:bg-accent1 social-link-twitter"
                        >
                          <Twitter className="w-5 h-5" /> Twitter
                        </a>
                      ) : null}
                      {data?.instagramUrl ? (
                        <a
                          href={data.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 border rounded-md hover:bg-accent1 social-link-instagram"
                        >
                          <Instagram className="w-5 h-5" /> Instagram
                        </a>
                      ) : null}
                      {data?.linkedInUrl ? (
                        <a
                          href={data.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 border rounded-md hover:bg-accent1 social-link-linkedin"
                        >
                          <Linkedin className="w-5 h-5" /> LinkedIn
                        </a>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-primary text-white shadow-elegant">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                    <p className="mb-6 opacity-90">For urgent inquiries, call us directly or send us an email</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {phone1 !== '—' && (
                        <a
                          href={`tel:${phone1}`}
                          className="flex-1 border-white text-white hover:bg-white hover:text-primary111 border rounded-md py-2 text-center"
                        >
                          <Phone className="w-4 h-4 inline mr-2" />
                          Call Now
                        </a>
                      )}
                      {email !== '—' && (
                        <a
                          href={`mailto:${email}`}
                          className="flex-1 border-white text-white hover:bg-white hover:text-primary111 border rounded-md py-2 text-center"
                        >
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Us
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

  <FAQSection />
      <Footer />
    </div>
  );
};

export default Contact;
