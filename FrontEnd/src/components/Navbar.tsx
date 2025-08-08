import React, { useState, useEffect } from 'react';


import { Dropdown } from 'react-bootstrap';


import Logo from '@/assets/1.png';


import { useNavigate } from 'react-router-dom'; // استيراد useNavigate من react-router-dom



// كائن يحتوي على ترجمات لروابط شريط التنقل


const translations = {


  en: {


    home: 'Home',


    about: 'About',


    projects: 'Projects',


    advertisements: 'Advertisements',


    services: 'Services',


    contact: 'Contact',


    service1: 'Services 1',


    service2: 'Services 2',


    language: 'EN',


  },


  ar: {


    home: 'الرئيسية',


    about: 'من نحن',


    projects: 'المشاريع',


    advertisements: 'الإعلانات',


    services: 'الخدمات',


    contact: 'اتصل بنا',


    service1: 'خدمة 1',


    service2: 'خدمة 2',


    language: 'AR',


  },


};



const Navbar = () => {


  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);


  // قراءة اللغة المحفوظة من localStorage أو تعيين الافتراضية إلى الإنجليزية


  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('appLanguage') || 'en');


  const navigate = useNavigate(); // تهيئة hook useNavigate للتنقل بين الصفحات



  // الحصول على كائن الترجمة الحالي بناءً على اللغة المختارة


  const t = translations[currentLanguage];



  // تبديل شريط التنقل للجوال


  const toggleMobileNav = () => {


    setIsMobileNavOpen(!isMobileNavOpen);


  };



  // إغلاق شريط التنقل للجوال عند النقر على رابط


  const handleNavLinkClick = () => {


    setIsMobileNavOpen(false);


  };



  // التعامل مع تغيير اللغة والتنقل وفقًا لذلك


  const handleLanguageChange = (lang) => {


    setCurrentLanguage(lang); // تحديث حالة اللغة


    localStorage.setItem('appLanguage', lang); // حفظ اللغة في الذاكرة المحلية



    // التنقل إلى الصفحة المناسبة بناءً على اللغة المختارة


    if (lang === 'ar') {


      navigate('/home/ar'); // الانتقال إلى الصفحة العربية


    } else {


      navigate('/home'); // الانتقال إلى الصفحة الإنجليزية


    }


  };



  // إغلاق شريط التنقل للجوال عند تغيير حجم الشاشة إلى سطح المكتب


  useEffect(() => {


    const handleResize = () => {


      if (window.innerWidth >= 1200) {


        setIsMobileNavOpen(false);


      }


    };


    window.addEventListener('resize', handleResize);


    return () => window.removeEventListener('resize', handleResize);


  }, []);



  return (


    <header


      id="header"


      className="header d-flex align-items-center fixed-top"


      // تم إزالة خاصية dir من هنا للحفاظ على موضع الشعار وزر اللغة


    >


      <div className="py-3 header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">


        <img src={Logo} alt="Logo" className="logo-img ps-3" style={{ width: '160px', height: '40px' }} />



        <nav


          id="navmenu"


          className={`navmenu ${isMobileNavOpen ? 'navmenu-mobile' : ''}`}


          dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} // تطبيق اتجاه RTL هنا فقط على روابط التنقل


        >


          <ul>


            <li>


              <a href="#hero" className="active" onClick={handleNavLinkClick}>


                {t.home}


              </a>


            </li>


            <li>


              <a href="#about" onClick={handleNavLinkClick}>


                {t.about}


              </a>


            </li>


            <li>


              <a href="#projects" onClick={handleNavLinkClick}>


                {t.projects}


              </a>


            </li>


            <li>


              <a href="#advertisements" onClick={handleNavLinkClick}>


                {t.advertisements}


              </a>


            </li>


            {/* تم تغيير الرابط ليتوافق مع قسم الخدمات */}


            <li>


              <a href="#services" onClick={handleNavLinkClick}>


                {t.services}


              </a>


            </li>


            {/* تم إزالة القائمة المنسدلة للخدمات لتبسيط التنقل، يمكنك إعادتها إذا لزم الأمر */}


            <li>


              <a href="#contact" onClick={handleNavLinkClick}>


                {t.contact}


              </a>


            </li>


          </ul>


          <i


            className={`mobile-nav-toggle d-xl-none bi ${isMobileNavOpen ? 'bi-x' : 'bi-list'}`}


            onClick={toggleMobileNav}


          ></i>


        </nav>



        {/* قائمة اختيار اللغة المنسدلة */}


        <div className="language-selector d-flex align-items-center">


          <Dropdown>


            <Dropdown.Toggle


              variant="secondary"


              id="languageDropdown"


              style={{ backgroundColor: '#086a87', border: '1px solid #ffffff' }}


            >


              {t.language}


            </Dropdown.Toggle>



            <Dropdown.Menu>


              <Dropdown.Item onClick={() => handleLanguageChange('en')}>EN</Dropdown.Item>


              <Dropdown.Item onClick={() => handleLanguageChange('ar')}>AR</Dropdown.Item>


            </Dropdown.Menu>


          </Dropdown>


        </div>


      </div>


    </header>


  );


};




export default Navbar; 