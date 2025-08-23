// src/components/Footer.jsx
import React, { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/lib/axios";
import Logo from '@/assets/1.png';
const Footer = () => {
  const [contact, setContact] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState({ contact: true, services: true });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get("/companycontact");
        setContact(res.data || null);
      } catch (e) {
        console.error("Failed to load company contact", e);
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
        console.error("Failed to load services", e);
      } finally {
        setLoading((s) => ({ ...s, services: false }));
      }
    };

    fetchContact();
    fetchServices();
  }, []);

  const v = (obj, a, b) => (obj?.[a] ?? obj?.[b] ?? undefined);

  const address = v(contact, "address", "Address");
  const phone1 = v(contact, "phoneNumber1", "PhoneNumber1");
  const email = v(contact, "email", "Email");
  const waNum = v(contact, "whatsAppNumber", "WhatsAppNumber");
  const tagline = v(contact, "tagline", "Tagline");
  const description = v(contact, "description", "Description");

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
    <footer className="bg-white514087 border-t border-gray-200 py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
         
          <img src={Logo} alt="Logo" className="logo-imgئ -3" style={{ width: '160px', height: '40px' }} />
  

            <div className="mt-4 space-y-2 text-white">
              <p className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                {loading.contact ? "Loading address..." : (address || "—")}
              </p>

              <p className="flex items-center">
                <Phone size={16} className="mr-2" />
                {loading.contact ? "Loading phone..." : (
                  phone1 ? <a href={telHref} className="hover:text-gray-900 transition">{phone1}</a> : "—"
                )}
              </p>

              <p className="flex items-center">
                <Mail size={16} className="mr-2" />
                {loading.contact ? "Loading email..." : (
                  email ? <a href={mailHref} className="hover:text-gray-900 transition">{email}</a> : "—"
                )}
              </p>
            </div>

            <div className="flex space-x-4 mt-4">
              <SocialIcon href={facebookUrl} label="Facebook">
                <Facebook size={18} className="text-gray-600" />
              </SocialIcon>
              <SocialIcon href={twitterUrl} label="Twitter">
                <Twitter size={18} className="text-gray-600" />
              </SocialIcon>
              <SocialIcon href={instagramUrl} label="Instagram">
                <Instagram size={18} className="text-gray-600" />
              </SocialIcon>
              <SocialIcon href={linkedInUrl} label="LinkedIn">
                <Linkedin size={18} className="text-gray-600" />
              </SocialIcon>
              <SocialIcon href={waHref} label="WhatsApp">
                <Phone size={18} className="text-gray-600" />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Useful Links</h4>
            <ul className="space-y-2 text-white">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/services/programming" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/project" className="hover:text-white transition">Projects</Link></li>
              {/* <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li> */}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2 text-white">
              {loading.services ? (
                <li>Loading services...</li>
              ) : services.length ? (
                services.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services/programming`} className="hover:text-white transition">
                      {s.title || "Service"}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No services available</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{tagline || "Subscribe"}</h4>
            <p className="text-white mb-4">{description || "Get the latest updates and offers."}</p>
          
          </div>
        </div>

        {/* <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-white text-sm">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold">a</span>. All Rights Reserved.
          </p>
          <p>
            Designed by <a href=" " className="text-blue-600 hover:underline">a</a>
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
