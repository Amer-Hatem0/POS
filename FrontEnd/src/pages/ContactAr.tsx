import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/FooterAr";
import FAQSectionAr from './sections/FAQSectionAr';

// Define the type for the company contact information, including Arabic fields
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

  // Fetch contact information from the API
  useEffect(() => {
    api
      .get('/CompanyContact')
      .then((res) => setData(res.data as CompanyContact))
      .finally(() => setLoading(false));
  }, []);

  // Services list in Arabic
  const services = [
    'تطوير الويب',
    'تطوير تطبيقات الجوال',
    'حلول التجارة الإلكترونية',
    'التسويق الرقمي',
    'خدمات تحسين محركات البحث (SEO)',
    'التسويق عبر وسائل التواصل الاجتماعي',
    'إعلانات الدفع بالنقرة (PPC)',
    'استشارات'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Optional: Connect the form to a general messages API if available later
  };

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-muted-foreground">
        جارٍ تحميل معلومات الاتصال...
      </div>
    );
  }

  // Get contact info with fallbacks
  const email = data?.email || '—';
  const phone1 = data?.phoneNumber1 || '—';
  const phone2 = data?.phoneNumber2 || '';
  // Use the Arabic address if available, otherwise fallback to the English one
  const address = data?.addressAr || data?.address || '—';

  // Contact cards data with Arabic titles and descriptions
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'راسلنا عبر البريد الإلكتروني',
      info: email,
      description: 'أرسل لنا بريدًا إلكترونيًا في أي وقت'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'اتصل بنا',
      info: phone2 ? `${phone1} / ${phone2}` : phone1,
      description: 'سوف نعود إليك بسرعة'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'تفضل بزيارتنا',
      info: address,
      description: 'موقع مكتبنا'
    },
  ];

  return (
    <div className="min-h-screen pt-20" dir="rtl">
      <Navbar />
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">اتصل بنا</h1>
              {/* Use the Arabic tagline if available, otherwise fallback */}
              <p className="text-xl mb-2 opacity-90">
                {data?.taglineAr || data?.tagline || "لنعمل معًا على بناء شيء رائع"}
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
              <h2 className="text-4xl font-bold mb-6 text-foreground">تواصل معنا</h2>
              {/* Use the Arabic description if available, otherwise fallback */}
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {data?.descriptionAr || data?.description || "يسعدنا أن نسمع منك. اختر أفضل طريقة للتواصل معنا."}
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((contact, index) => (
              <ScrollAnimatedSection key={contact.title} animation="scale-in" delay={index * 100}>
                <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="text-primary mb-4 flex justify-center">{contact.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{contact.title}</h3>
                    <p className="text-primary font-semibold mb-2">{contact.info}</p>
                    <p className="text-muted-foreground text-sm">{contact.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollAnimatedSection animation="slide-in-right">
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-6 text-foreground">أرسل لنا رسالة</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">الاسم الأول</Label>
                        <Input id="firstName" placeholder="علي" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">الاسم الأخير</Label>
                        <Input id="lastName" placeholder="أحمد" className="mt-1" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" placeholder="ali@example.com" className="mt-1" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input id="phone" type="tel" placeholder="+966 (55) 123-4567" className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="service">الخدمة التي تهتم بها</Label>
                      <select
                        id="service"
                        className="w-full mt-1 p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="">اختر خدمة</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">الرسالة</Label>
                      <Textarea id="message" placeholder="أخبرنا عن مشروعك..." className="mt-1 min-h-32" required />
                    </div>

                    <Button type="submit" className="w-full gradient-primary text-lg py-3">
                      أرسل الرسالة <Send className="mr-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection animation="slide-in-left">
              <div className="space-y-8">
                <Card className="shadow-elegant">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">لماذا تختارنا؟</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        <span>فريق ذو خبرة وتقنيات حديثة</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        <span>تسليم ودعم مثبت</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        <span>تسعير وخطط زمنية شفافة</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        <span>استشارة مجانية وتحليل للمشروع</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="gradient-primary text-white shadow-elegant">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">هل تحتاج إلى مساعدة فورية؟</h3>
                    <p className="mb-6 opacity-90">للاستفسارات العاجلة، اتصل بنا مباشرة أو أرسل لنا بريدًا إلكترونيًا</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {phone1 !== '—' && (
                        <a
                          href={`tel:${phone1}`}
                          className="flex-1 border-white text-white hover:bg-white hover:text-primary border rounded-md py-2 text-center"
                        >
                          <Phone className="w-4 h-4 inline ml-2" />
                          اتصل الآن
                        </a>
                      )}
                      {email !== '—' && (
                        <a
                          href={`mailto:${email}`}
                          className="flex-1 border-white text-white hover:bg-white hover:text-primary border rounded-md py-2 text-center"
                        >
                          <Mail className="w-4 h-4 inline ml-2" />
                          راسلنا عبر البريد
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

      <FAQSectionAr />
      <Footer />
    </div>
  );
};

export default Contact;
