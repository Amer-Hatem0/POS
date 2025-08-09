// src/components/FooterAr.jsx
import React, { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/lib/axios";

const FooterAr = () => {
  const [contact, setContact] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState({ contact: true, services: true });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get("/companycontact");
        setContact(res.data || null);
      } catch (e) {
        console.error("فشل تحميل بيانات التواصل", e);
      } finally {
        setLoading((s) => ({ ...s, contact: false }));
      }
    };

    const fetchServices = async () => {
      try {
        const res = await api.get("/service");
        const list = Array.isArray(res.data) ? res.data : [];
        const visible = list.filter((s) => s.isVisible !== false);
        setServices(visible.slice(0, 6));
      } catch (e) {
        console.error("فشل تحميل الخدمات", e);
      } finally {
        setLoading((s) => ({ ...s, services: false }));
      }
    };

    fetchContact();
    fetchServices();
  }, []);

  const v = (obj, a, b) => (obj?.[a] ?? obj?.[b] ?? undefined);

  const address = v(contact, "addressAr", "AddressAr");
  const phone1 = v(contact, "phoneNumber1", "PhoneNumber1");
  const email = v(contact, "email", "Email");
  const waNum = v(contact, "whatsAppNumber", "WhatsAppNumber");
  const tagline = v(contact, "taglineAr", "TaglineAr");
  const description = v(contact, "descriptionAr", "DescriptionAr");

  const facebookUrl = v(contact, "facebookUrl", "FacebookUrl");
  const twitterUrl = v(contact, "twitterUrl", "TwitterUrl");
  const instagramUrl = v(contact, "instagramUrl", "InstagramUrl");
  const linkedInUrl = v(contact, "linkedInUrl", "LinkedInUrl");

  const telHref = phone1 ? `tel:${phone1}` : undefined;
  const mailHref = email ? `mailto:${email}` : undefined;
  const waHref = waNum ? `https://wa.me/${String(waNum).replace(/\D/g, "")}` : undefined;

  const SocialIcon = ({ href, label, children }) => {
    if (!href) return null;
    return (
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noreferrer"
        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
        {children}
      </a>
    );
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-20" dir="rtl">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* معلومات التواصل */}
          <div>
            <Link to="/" className="text-2xl font-bold text-gray-800">iLanding</Link>

            <div className="mt-4 space-y-2 text-gray-600">
              <p className="flex items-start">
                <MapPin size={16} className="ml-2 mt-1" />
                {loading.contact ? "جاري تحميل العنوان..." : (address || "—")}
              </p>

              <p className="flex items-center">
                <Phone size={16} className="ml-2" />
                {loading.contact ? "جاري تحميل الهاتف..." : (
                  phone1 ? <a href={telHref} className="hover:text-gray-900 transition">{phone1}</a> : "—"
                )}
              </p>

              <p className="flex items-center">
                <Mail size={16} className="ml-2" />
                {loading.contact ? "جاري تحميل البريد..." : (
                  email ? <a href={mailHref} className="hover:text-gray-900 transition">{email}</a> : "—"
                )}
              </p>
            </div>

            {/* روابط السوشيال */}
            <div className="flex space-x-4 space-x-reverse mt-4">
              <SocialIcon href={facebookUrl} label="فيسبوك">
                <Facebook size={18} className="text-gray-600" />
              </SocialIcon>
              <SocialIcon href={twitterUrl} label="تويتر">
                <Twitter size={18} className="text-gray-600" />
              </SocialIcon>
              <SocialIcon href={instagramUrl} label="انستغرام">
                <Instagram size={18} className="text-gray-600" />
              </SocialIcon>
              <SocialIcon href={linkedInUrl} label="لينكدإن">
                <Linkedin size={18} className="text-gray-600" />
              </SocialIcon>
              <SocialIcon href={waHref} label="واتساب">
                <Phone size={18} className="text-gray-600" />
              </SocialIcon>
            </div>
          </div>
    
          {/* روابط مفيدة */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">روابط مفيدة</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/ar" className="hover:text-gray-800 transition">الرئيسية</Link></li>
              <li><Link to="/ar/about" className="hover:text-gray-800 transition">من نحن</Link></li>
              <li><Link to="/ar/services/programming" className="hover:text-gray-800 transition">الخدمات</Link></li>
              <li><Link to="/ar/projects" className="hover:text-gray-800 transition">المشاريع</Link></li>
              <li><Link to="/privacy" className="hover:text-gray-800 transition">سياسة الخصوصية</Link></li>
            </ul>
          </div>

          {/* خدماتنا */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">خدماتنا</h4>
            <ul className="space-y-2 text-gray-500">
              {loading.services ? (
                <li>جاري تحميل الخدمات...</li>
              ) : services.length ? (
                services.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services/${s.id}`} className="hover:text-gray-800 transition">
                      {s.titleAr || "خدمة"}
                    </Link>
                  </li>
                ))
              ) : (
                <li>لا توجد خدمات متاحة</li>
              )}
            </ul>
          </div>

          {/* النشرة البريدية */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">{tagline || "اشترك"}</h4>
            <p className="text-gray-500 mb-4">{description || "اشترك للحصول على أحدث الأخبار والعروض."}</p>
         
          </div>
        </div>

        {/* الشريط السفلي
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold">iLanding</span>. جميع الحقوق محفوظة.
          </p>
          <p>
            تصميم <a href="https://bootstrapmade.com/" className="text-blue-600 hover:underline">BootstrapMade</a>
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default FooterAr;
