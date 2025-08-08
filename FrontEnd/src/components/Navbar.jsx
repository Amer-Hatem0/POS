import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/assets/1.png';
import { Code, Megaphone, ShoppingBag, ChevronDown } from 'lucide-react';

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    advertisements: 'Advertisements',
    services: 'Services',
    contact: 'Contact',
    language: 'EN',
    serviceTitle: 'Our Services',
    links: [
      { name: 'Home', path: '/', isServices: false },
      { name: 'About', path: '/about', isServices: false },
      { name: 'Projects', path: '/projects', isServices: false },
      { name: 'Advertisements', path: '/advertisements', isServices: false },
      {
        name: 'Services',
        path: '/services',
        isServices: true,
        dropdown: [
          {
            title: 'Programming Services',
            description: 'Web & Mobile Development',
            path: '/services/programming',
            icon: <Code className="w-5 h-5" />,
          },
          {
            title: 'Marketing Services',
            description: 'Digital Marketing & SEO',
            path: '/services/marketing',
            icon: <Megaphone className="w-5 h-5" />,
          },
          {
            title: 'E-Commerce Solutions',
            description: 'Online Store Development',
            path: '/services/ecommerce',
            icon: <ShoppingBag className="w-5 h-5" />,
          },
        ],
      },
      { name: 'Contact', path: '/contact', isServices: false },
    ],
  },
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    projects: 'المشاريع',
    advertisements: 'الإعلانات',
    services: 'الخدمات',
    contact: 'اتصل بنا',
    language: 'AR',
    serviceTitle: 'خدماتنا',
    links: [
      { name: 'الرئيسية', path: '/ar', isServices: false },
      { name: 'من نحن', path: '/about/ar', isServices: false },
      { name: 'المشاريع', path: '/projects/ar', isServices: false },
      { name: 'الإعلانات', path: '/advertisements/ar', isServices: false },
      {
        name: 'الخدمات',
        path: 'services/ar',
        isServices: true,
        dropdown: [
          {
            title: 'خدمات البرمجة',
            description: 'تطوير الويب والجوال',
            path: '/services/programming/ar',
            icon: <Code className="w-5 h-5" />,
          },
          {
            title: 'خدمات التسويق',
            description: 'التسويق الرقمي وتحسين محركات البحث',
            path: '/services/marketing/ar',
            icon: <Megaphone className="w-5 h-5" />,
          },
          {
            title: 'حلول التجارة الإلكترونية',
            description: 'تطوير المتاجر الإلكترونية',
            path: '/services/ecommerce/ar',
            icon: <ShoppingBag className="w-5 h-5" />,
          },
        ],
      },
      { name: 'اتصل بنا', path: '/contact/ar', isServices: false },
    ],
  },
};

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentLanguage = location.pathname.startsWith('/ar') ? 'ar' : 'en';
  const t = translations[currentLanguage];

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileNavOpen(false);
  };

  const handleLanguageChange = (lang) => {
    const currentPath = location.pathname;
    let newPath = currentPath;

    if (lang === 'ar') {
      if (currentPath === '/') {
        newPath = '/ar';
      } else if (!currentPath.startsWith('/ar')) {
        newPath = `/ar${currentPath}`;
      }
    } else {
      if (currentPath === '/ar') {
        newPath = '/';
      } else if (currentPath.startsWith('/ar')) {
        newPath = currentPath.replace('/ar', '');
        if (newPath === '') newPath = '/';
      }
    }
    navigate(newPath);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div
        className={`py-3 header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between ${
          currentLanguage === 'ar' ? 'flex-row-reverse' : ''
        }`}
      >
        <Link to={currentLanguage === 'ar' ? '/ar' : '/'} className="logo-link">
          <img src={Logo} alt="Logo" className="logo-img ps-3" style={{ width: '160px', height: '40px' }} />
        </Link>
        
        <nav
          id="navmenu"
          className={`navmenu ${isMobileNavOpen ? 'navmenu-mobile' : ''}`}
          dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
        >
          <ul>
            {t.links.map((link, index) => (
              <li key={index} className={link.isServices ? 'dropdown' : ''}>
                <Link to={link.path} className={getNavLinkClass(link.path)} onClick={handleNavLinkClick}>
                  {link.name}
                  {link.isServices && <ChevronDown className="ms-1" />}
                </Link>
                {link.isServices && (
                  <ul className="dropdown-menu">
                    {link.dropdown.map((service, serviceIndex) => (
                      <li key={serviceIndex}>
                        <Link to={service.path} className="dropdown-item" onClick={handleNavLinkClick}>
                          <div className="d-flex align-items-center">
                            {service.icon}
                            <div className="ms-3">
                              <div className="fw-bold">{service.title}</div>
                              <small className="text-muted">{service.description}</small>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <i
            className={`mobile-nav-toggle d-xl-none bi ${isMobileNavOpen ? 'bi-x' : 'bi-list'}`}
            onClick={toggleMobileNav}
          ></i>
        </nav>
        
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