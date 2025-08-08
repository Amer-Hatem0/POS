import React from 'react';

// كائنات الترجمة للنصوص الثابتة في الواجهة
const translations = {
  en: {
    address: 'A108 Adam Street',
    cityStateZip: 'New York, NY 535022',
    phone: 'Phone:',
    email: 'Email:',
    usefulLinks: 'Useful Links',
    home: 'Home',
    aboutUs: 'About us',
    services: 'Services',
    termsOfService: 'Terms of service',
    privacyPolicy: 'Privacy policy',
    ourServices: 'Our Services',
    webDesign: 'Web Design',
    webDevelopment: 'Web Development',
    productManagement: 'Product Management',
    marketing: 'Marketing',
    graphicDesign: 'Graphic Design',
    copyright: 'Copyright',
    allRightsReserved: 'All Rights Reserved',
    designedBy: 'Designed by',
  },
  ar: {
    address: 'شارع آدم 108',
    cityStateZip: 'نيويورك، نيويورك 535022',
    phone: 'الهاتف:',
    email: 'البريد الإلكتروني:',
    usefulLinks: 'روابط مفيدة',
    home: 'الرئيسية',
    aboutUs: 'من نحن',
    services: 'الخدمات',
    termsOfService: 'شروط الخدمة',
    privacyPolicy: 'سياسة الخصوصية',
    ourServices: 'خدماتنا',
    webDesign: 'تصميم الويب',
    webDevelopment: 'تطوير الويب',
    productManagement: 'إدارة المنتجات',
    marketing: 'التسويق',
    graphicDesign: 'التصميم الجرافيكي',
    copyright: 'حقوق النشر',
    allRightsReserved: 'جميع الحقوق محفوظة',
    designedBy: 'تصميم بواسطة',
  },
};

const Footer = ({ currentLanguage = 'ar' }) => { // افتراضيًا اللغة العربية
  const t = translations[currentLanguage]; // جلب الترجمات للغة الحالية

  return (
    <footer id="footer" className="footer" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="#" className="logo d-flex align-items-center">
              <span className="sitename">iLanding</span>
            </a>
            <div className="footer-contact pt-3">
              <p>{t.address}</p>
              <p>{t.cityStateZip}</p>
              <p className="mt-3">
                <strong>{t.phone}</strong> <span>+1 5589 55488 55</span>
              </p>
              <p>
                <strong>{t.email}</strong> <span>info@example.com</span>
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>{t.usefulLinks}</h4>
            <ul>
              <li>
                <a href="#">{t.home}</a>
              </li>
              <li>
                <a href="#">{t.aboutUs}</a>
              </li>
              <li>
                <a href="#">{t.services}</a>
              </li>
              <li>
                <a href="#">{t.termsOfService}</a>
              </li>
              <li>
                <a href="#">{t.privacyPolicy}</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>{t.ourServices}</h4>
            <ul>
              <li>
                <a href="#">{t.webDesign}</a>
              </li>
              <li>
                <a href="#">{t.webDevelopment}</a>
              </li>
              <li>
                <a href="#">{t.productManagement}</a>
              </li>
              <li>
                <a href="#">{t.marketing}</a>
              </li>
              <li>
                <a href="#">{t.graphicDesign}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container copyright text-center mt-4">
        <p>
          &copy; <span>{t.copyright}</span> <strong className="px-1 sitename">iLanding</strong>{' '}
          <span>{t.allRightsReserved}</span>
        </p>
        <div className="credits">
          {t.designedBy} <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
