 
import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
import {
  Mail, Phone, MapPin, Globe,
  Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';

const ContactSection = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    api.get('/CompanyContact')
      .then(res => {
        const data = res.data;
        setContactData({
          business: {
            name: data.name || 'Creative Digital Agency',
            tagline: data.tagline || "Building tomorrow's digital experiences today",
            taglineAr: data.taglineAr || '',
            description: data.description || 'We specialize in creating innovative digital solutions...',
            descriptionAr: data.descriptionAr || '',
            email: data.email || '',
            phone: data.phoneNumber1 || '',
            phone2: data.phoneNumber2 || '',
            address: data.address || '',
            addressAr: data.addressAr || '',
            website: data.website || ''
          },
          social: {
            facebook: data.facebookUrl || '',
            twitter: data.twitterUrl || '',
            instagram: data.instagramUrl || '',
            linkedin: data.linkedInUrl || ''
          },
          office: {
            hours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed',
            timezone: 'Eastern Standard Time (EST)'
          }
        });
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Could not load contact info.',
          variant: 'destructive'
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !contactData) {
    return <div className="p-6 text-center text-lg text-muted-foreground">Loading contact information...</div>;
  }

  return (
    <section id="contact" className="contact section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>{contactData.business.tagline}</p>
        {contactData.business.taglineAr && (
          <p className="text-muted-foreground" dir="rtl">{contactData.business.taglineAr}</p>
        )}
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <div className="info-box" data-aos="fade-up" data-aos-delay={200}>
              <h3>Contact Info</h3>
              <p>{contactData.business.description}</p>
              
              <div className="info-item" data-aos="fade-up" data-aos-delay={300}>
                <div className="icon-box">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="content">
                  <h4>Our Location</h4>
                  <p>{contactData.business.address}</p>
                  {contactData.business.addressAr && (
                    <p className="text-muted-foreground" dir="rtl">{contactData.business.addressAr}</p>
                  )}
                </div>
              </div>
              <div className="info-item" data-aos="fade-up" data-aos-delay={400}>
                <div className="icon-box">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="content">
                  <h4>Phone Number</h4>
                  <p>{contactData.business.phone}</p>
                  {contactData.business.phone2 && <p>{contactData.business.phone2}</p>}
                </div>
              </div>
              <div className="info-item" data-aos="fade-up" data-aos-delay={500}>
                <div className="icon-box">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="content">
                  <h4>Email Address</h4>
                  <p>{contactData.business.email}</p>
                </div>
              </div>
              <div className="info-item" data-aos="fade-up" data-aos-delay={600}>
                <div className="icon-box">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div className="content">
                  <h4>Social Media</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {[
                      { icon: Facebook, url: contactData.social.facebook, label: 'Facebook' },
                      { icon: Twitter, url: contactData.social.twitter, label: 'Twitter' },
                      { icon: Instagram, url: contactData.social.instagram, label: 'Instagram' },
                      { icon: Linkedin, url: contactData.social.linkedin, label: 'LinkedIn' }
                    ].map(({ icon: Icon, url, label }) => (
                      url && (
                        <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
                          <Icon className="w-5 h-5" />
                        </a>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="contact-form" data-aos="fade-up" data-aos-delay={300}>
              <h3>Get In Touch</h3>
              <p>Send us a message and we'll get back to you as soon as possible.</p>
              <div className="php-email-form" data-aos="fade-up" data-aos-delay={200}>
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Your Email" required />
                  </div>
                  <div className="col-12">
                    <input type="text" className="form-control" placeholder="Subject" required />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control" rows={6} placeholder="Message" required />
                  </div>
                  <div className="col-12 text-center">
                    <div className="loading" style={{ display: 'none' }}>Loading</div>
                    <div className="error-message" style={{ display: 'none' }} />
                    <div className="sent-message" style={{ display: 'none' }}>Your message has been sent. Thank you!</div>
                    <button type="button" className="btn">Send Message</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
 

// import React, { useEffect, useState } from 'react';
// import api from '@/lib/axios';
// import { useToast } from '@/hooks/use-toast';
// import {
//   Mail, Phone, MapPin, Globe,
//   Facebook, Twitter, Instagram, Linkedin
// } from 'lucide-react';

// const translations = {
//   en: {
//     title: 'Contact',
//     contactInfo: 'Contact Info',
//     contactDescription: 'We specialize in creating innovative digital solutions...',
//     locationTitle: 'Our Location',
//     phoneTitle: 'Phone Number',
//     emailTitle: 'Email Address',
//     socialTitle: 'Social Media',
//     getInTouchTitle: 'Get In Touch',
//     getInTouchDescription: "Send us a message and we'll get back to you as soon as possible.",
//     formName: 'Your Name',
//     formEmail: 'Your Email',
//     formSubject: 'Subject',
//     formMessage: 'Message',
//     formSend: 'Send Message',
//     loading: 'Loading',
//     sentMessage: 'Your message has been sent. Thank you!',
//     error: 'Could not load contact info.',
//   },
//   ar: {
//     title: 'اتصل بنا',
//     contactInfo: 'معلومات الاتصال',
//     contactDescription: 'نحن متخصصون في إنشاء حلول رقمية مبتكرة...',
//     locationTitle: 'موقعنا',
//     phoneTitle: 'رقم الهاتف',
//     emailTitle: 'عنوان البريد الإلكتروني',
//     socialTitle: 'وسائل التواصل الاجتماعي',
//     getInTouchTitle: 'تواصل معنا',
//     getInTouchDescription: 'أرسل لنا رسالة وسنقوم بالرد عليك في أقرب وقت ممكن.',
//     formName: 'اسمك',
//     formEmail: 'بريدك الإلكتروني',
//     formSubject: 'الموضوع',
//     formMessage: 'الرسالة',
//     formSend: 'أرسل الرسالة',
//     loading: 'جاري التحميل',
//     sentMessage: 'تم إرسال رسالتك. شكراً لك!',
//     error: 'تعذر تحميل معلومات الاتصال.',
//   },
// };

// const ContactSection = ({ currentLanguage }) => {
//   const [contactData, setContactData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();
//   const t = translations[currentLanguage];

//   useEffect(() => {
//     api.get('/CompanyContact')
//       .then(res => {
//         const data = res.data;
//         setContactData({
//           business: {
//             name: data.name || 'Creative Digital Agency',
//             tagline: data.tagline || "Building tomorrow's digital experiences today",
//             taglineAr: data.taglineAr || '',
//             description: data.description || 'We specialize in creating innovative digital solutions...',
//             descriptionAr: data.descriptionAr || '',
//             email: data.email || '',
//             phone: data.phoneNumber1 || '',
//             phone2: data.phoneNumber2 || '',
//             address: data.address || '',
//             addressAr: data.addressAr || '',
//             website: data.website || ''
//           },
//           social: {
//             facebook: data.facebookUrl || '',
//             twitter: data.twitterUrl || '',
//             instagram: data.instagramUrl || '',
//             linkedin: data.linkedInUrl || ''
//           },
//         });
//       })
//       .catch(() => {
//         toast({
//           title: 'Error',
//           description: t.error,
//           variant: 'destructive'
//         });
//       })
//       .finally(() => setLoading(false));
//   }, [currentLanguage]);

//   if (loading || !contactData) {
//     return <div className="p-6 text-center text-lg text-muted-foreground">{t.loading}...</div>;
//   }

//   return (
//     <section id="contact" className="contact section light-background" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
//       <div className="container section-title" data-aos="fade-up">
//         <h2>{t.title}</h2>
//         <p>{currentLanguage === 'ar' && contactData.business.taglineAr ? contactData.business.taglineAr : contactData.business.tagline}</p>
//       </div>
//       <div className="container" data-aos="fade-up" data-aos-delay={100}>
//         <div className="row g-4 g-lg-5">
//           <div className="col-lg-5">
//             <div className="info-box" data-aos="fade-up" data-aos-delay={200}>
//               <h3>{t.contactInfo}</h3>
//               <p>{currentLanguage === 'ar' && contactData.business.descriptionAr ? contactData.business.descriptionAr : contactData.business.description}</p>
              
//               <div className="info-item" data-aos="fade-up" data-aos-delay={300}>
//                 <div className="icon-box">
//                   <MapPin className="w-5 h-5 text-primary" />
//                 </div>
//                 <div className="content">
//                   <h4>{t.locationTitle}</h4>
//                   <p>{currentLanguage === 'ar' && contactData.business.addressAr ? contactData.business.addressAr : contactData.business.address}</p>
//                 </div>
//               </div>
//               <div className="info-item" data-aos="fade-up" data-aos-delay={400}>
//                 <div className="icon-box">
//                   <Phone className="w-5 h-5 text-primary" />
//                 </div>
//                 <div className="content">
//                   <h4>{t.phoneTitle}</h4>
//                   <p>{contactData.business.phone}</p>
//                   {contactData.business.phone2 && <p>{contactData.business.phone2}</p>}
//                 </div>
//               </div>
//               <div className="info-item" data-aos="fade-up" data-aos-delay={500}>
//                 <div className="icon-box">
//                   <Mail className="w-5 h-5 text-primary" />
//                 </div>
//                 <div className="content">
//                   <h4>{t.emailTitle}</h4>
//                   <p>{contactData.business.email}</p>
//                 </div>
//               </div>
//               <div className="info-item" data-aos="fade-up" data-aos-delay={600}>
//                 <div className="icon-box">
//                   <Globe className="w-5 h-5 text-primary" />
//                 </div>
//                 <div className="content">
//                   <h4>{t.socialTitle}</h4>
//                   <div className="d-flex flex-wrap gap-2">
//                     {[
//                       { icon: Facebook, url: contactData.social.facebook, label: 'Facebook' },
//                       { icon: Twitter, url: contactData.social.twitter, label: 'Twitter' },
//                       { icon: Instagram, url: contactData.social.instagram, label: 'Instagram' },
//                       { icon: Linkedin, url: contactData.social.linkedin, label: 'LinkedIn' }
//                     ].map(({ icon: Icon, url, label }) => (
//                       url && (
//                         <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
//                           <Icon className="w-5 h-5" />
//                         </a>
//                       )
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-7">
//             <div className="contact-form" data-aos="fade-up" data-aos-delay={300}>
//               <h3>{t.getInTouchTitle}</h3>
//               <p>{t.getInTouchDescription}</p>
//               <div className="php-email-form" data-aos="fade-up" data-aos-delay={200}>
//                 <div className="row gy-4">
//                   <div className="col-md-6">
//                     <input type="text" className="form-control" placeholder={t.formName} required />
//                   </div>
//                   <div className="col-md-6">
//                     <input type="email" className="form-control" placeholder={t.formEmail} required />
//                   </div>
//                   <div className="col-12">
//                     <input type="text" className="form-control" placeholder={t.formSubject} required />
//                   </div>
//                   <div className="col-12">
//                     <textarea className="form-control" rows={6} placeholder={t.formMessage} required />
//                   </div>
//                   <div className="col-12 text-center">
//                     <div className="loading" style={{ display: 'none' }}>{t.loading}</div>
//                     <div className="error-message" style={{ display: 'none' }} />
//                     <div className="sent-message" style={{ display: 'none' }}>{t.sentMessage}</div>
//                     <button type="button" className="btn">{t.formSend}</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;