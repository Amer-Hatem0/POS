 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/lib/axios'; // تأكد من أن هذا المسار صحيح لملف axios الخاص بك
import {
  Code,
  Laptop,
  Palette,
  Cloud,
  Database,
  Shield,
  Server,
  MessageCircle,
  Monitor,
} from 'lucide-react';

// كائنات الترجمة للنصوص الثابتة في الواجهة
const translations = {
  en: {
    title: 'Our Featured Services',
    subtitle: 'Discover how we can help you achieve your goals.',
    button: 'More Services',
  },
  ar: {
    title: 'خدماتنا المميزة',
    subtitle: 'اكتشف كيف يمكننا مساعدتك على تحقيق أهدافك.',
    button: 'المزيد من الخدمات',
  },
};

// ربط أيقونات الخدمات
const serviceIcons = {
  Code,
  Laptop,
  Palette,
  Cloud,
  Database,
  Shield,
  Server,
  MessageCircle,
  Monitor,
};

// دالة لاختيار الأيقونة المناسبة بناءً على العنوان الإنجليزي والعربي
const getServiceIcon = (title, titleAr) => {
  const combinedTitle = `${title.toLowerCase()} ${titleAr?.toLowerCase() || ''}`;

  if (combinedTitle.includes('development') || combinedTitle.includes('تطوير')) {
    return serviceIcons.Code;
  }
  if (combinedTitle.includes('web') || combinedTitle.includes('ويب') || combinedTitle.includes('موقع')) {
    return serviceIcons.Laptop;
  }
  if (combinedTitle.includes('design') || combinedTitle.includes('تصميم')) {
    return serviceIcons.Palette;
  }
  if (combinedTitle.includes('cloud') || combinedTitle.includes('سحابة')) {
    return serviceIcons.Cloud;
  }
  if (combinedTitle.includes('database') || combinedTitle.includes('بيانات')) {
    return serviceIcons.Database;
  }
  if (combinedTitle.includes('security') || combinedTitle.includes('أمان')) {
    return serviceIcons.Shield;
  }
  if (combinedTitle.includes('hosting') || combinedTitle.includes('استضافة')) {
    return serviceIcons.Server;
  }
  if (combinedTitle.includes('support') || combinedTitle.includes('دعم')) {
    return serviceIcons.MessageCircle;
  }

  return serviceIcons.Monitor;
};

// مكون قسم الخدمات
const ServicesSectionAr = ({ currentLanguage = 'ar' }) => { // افتراضيًا اللغة العربية
  const [services, setServices] = useState([]);
  const t = translations[currentLanguage]; // جلب الترجمات للغة الحالية

  // جلب الخدمات من الواجهة الخلفية
  const fetchServices = async () => {
    try {
      const res = await api.get('/service');
      // تصفية الخدمات المرئية والحد إلى أول 3
      const visibleServices = res.data.filter((service) => service.isVisible);
      setServices(visibleServices.slice(0, 3));
    } catch (err) {
      console.error('فشل في جلب الخدمات', err);
    }
  };

  // جلب الخدمات عند تحميل المكون
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-5 bg-light">
      <div className="container" data-aos="fade-up" data-aos-delay={100} dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold">{t.title}</h2>
          <p className="lead text-muted">{t.subtitle}</p>
        </div>

        <div className="row justify-content-center g-4">
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service.title, service.titleAr);
            return (
              <div key={service.id} className="col-lg-4 col-md-6">
                <div
                  className="card h-100 border-0 shadow-lg rounded-4 p-4 text-center transition-transform hover-scale"
                  data-aos="fade-up"
                  data-aos-delay={200 + index * 100}
                >
                  <div className="card-body">
                    <div className="icon-box mb-4 mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
                      {service.iconUrl ? (
                        <img
                          src={service.iconUrl}
                          alt={currentLanguage === 'ar' ? service.titleAr : service.title}
                          className="img-fluid"
                          style={{ width: '48px', height: '48px' }}
                        />
                      ) : (
                        <IconComponent size={48} />
                      )}
                    </div>
                    <h5 className="card-title fw-bold mb-2">
                      {currentLanguage === 'ar' ? service.titleAr : service.title}
                    </h5>
                    <p className="card-text text-muted">
                      {currentLanguage === 'ar' ? service.descriptionAr : service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* زر المزيد من الخدمات */}
        <div className="text-center mt-5">
          <Link to="/services" className="btn btn-outline-primary btn-lg rounded-pill px-5">
            {t.button}
          </Link>
        </div>
      </div>

      {/* تنسيقات CSS للمكون */}
      <style jsx>{`
        .icon-box {
          width: 80px;
          height: 80px;
        }
        .transition-transform {
          transition: transform 0.3s ease-in-out;
        }
        .hover-scale:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  );
};

export default ServicesSectionAr;
