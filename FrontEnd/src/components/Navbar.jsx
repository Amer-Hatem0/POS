import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/assets/1.png';
import { Code, Megaphone, ChevronDown, X, Menu } from 'lucide-react';
import './Navbar.css'; // تأكد من وجود هذا الملف

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
        path: '/services/programming',
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
      { name: 'من نحن', path: '/ar/about', isServices: false },
      { name: 'المشاريع', path: '/ar/projects', isServices: false },
      { name: 'الإعلانات', path: '/ar/advertisements', isServices: false },
      {
        name: 'الخدمات',
        path: '/ar/services/programming',
        isServices: true,
        dropdown: [
          {
            title: 'خدمات البرمجة',
            description: 'تطوير الويب والجوال',
            path: '/ar/services/programming',
            icon: <Code className="w-5 h-5" />,
          },
          {
            title: 'خدمات التسويق',
            description: 'التسويق الرقمي وتحسين محركات البحث',
            path: '/ar/services/marketing',
            icon: <Megaphone className="w-5 h-5" />,
          },
        ],
      },
      { name: 'اتصل بنا', path: '/ar/contact', isServices: false },
    ],
  },
};

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentLanguage = location.pathname.startsWith('/ar') ? 'ar' : 'en';
  const t = translations[currentLanguage];

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleNavLinkClick = () => {
    setIsSidebarOpen(false);
    setIsServicesDropdownOpen(false); // إغلاق القائمة المنسدلة عند الضغط على رابط
  };

  const handleLanguageChange = (lang, closeSidebar = true) => {
    const currentPath = location.pathname;
    let newPath = currentPath;

    if (lang === 'ar') {
      if (currentPath === '/') newPath = '/ar';
      else if (!currentPath.startsWith('/ar')) newPath = `/ar${currentPath}`;
    } else {
      if (currentPath === '/ar') newPath = '/';
      else if (currentPath.startsWith('/ar')) {
        newPath = currentPath.replace('/ar', '');
        if (newPath === '') newPath = '/';
      }
    }

    if (closeSidebar) setIsSidebarOpen(false);
    navigate(newPath);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNavLinkClass = (path) => (location.pathname === path ? 'active' : '');

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

        {/* زر فتح وإغلاق القائمة الجانبية (Sidebar) */}
        <div className="d-xl-none p-3">
          <button
            className="btn btn-lg p-0 text-white"
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            {isSidebarOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* القائمة الرئيسية لسطح المكتب */}
        <nav
          id="navmenu"
          className="navmenu d-none d-xl-flex"
          dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
        >
          <ul>
            {t.links.map((link, index) => (
              <li key={index} className={link.isServices ? 'dropdown' : ''}>
                <Link to={link.path} className={getNavLinkClass(link.path)}>
                  {link.name}
                  {link.isServices && <ChevronDown className="ms-1" />}
                </Link>

                {link.isServices && (
                  <ul className="dropdown-menu">
                    {link.dropdown.map((service, serviceIndex) => (
                      <li key={serviceIndex}>
                        <Link to={service.path} className="dropdown-item">
                          <div
                            className={`d-flex align-items-center text-black ${
                              currentLanguage === 'ar' ? 'flex-row-reverse' : ''
                            }`}
                          >
                            <div className={currentLanguage === 'ar' ? 'text-end' : ''}>
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
        </nav>

        {/* زر اللغة لسطح المكتب فقط */}
        <div className="language-selector d-none d-xl-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="languageDropdown"
              style={{ backgroundColor: '#ffffffff', color: '#514087' }}
            >
              {t.language}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLanguageChange('en', false)}>EN</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLanguageChange('ar', false)}>AR</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* القائمة الجانبية للموبايل */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          <h5 className="m-0">القائمة</h5>
          <button className="btn-close" onClick={toggleSidebar} aria-label="Close"></button>
        </div>
        <ul className="sidebar-nav list-unstyled">
          {t.links.map((link, index) => (
            <li key={index}>
              {link.isServices ? (
                <>
                  <div
                    className={`sidebar-dropdown-toggle d-flex justify-content-between align-items-center p-3 cursor-pointer ${
                      isServicesDropdownOpen ? 'active' : ''
                    }`}
                    onClick={() => setIsServicesDropdownOpen((prev) => !prev)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`ms-auto ${isServicesDropdownOpen ? 'rotate' : ''}`} />
                  </div>
                  <ul className={`sidebar-dropdown-menu list-unstyled ${isServicesDropdownOpen ? 'open' : ''}`}>
                    {link.dropdown.map((service, serviceIndex) => (
                      <li key={serviceIndex}>
                        <Link to={service.path} className="sidebar-dropdown-item p-3 d-block" onClick={handleNavLinkClick}>
                          <div
                            className={`d-flex align-items-center gap-2 ${
                              currentLanguage === 'ar' ? 'flex-row-reverse' : ''
                            }`}
                          >
                            <div>{service.icon}</div>
                            <div className={currentLanguage === 'ar' ? 'text-end' : ''}>
                              <div className="fw-bold">{service.title}</div>
                              <small className="text-muted">{service.description}</small>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={link.path} className={`sidebar-link text-black p-3 d-block ${getNavLinkClass(link.path)}`} onClick={handleNavLinkClick}>
                  {link.name}
                </Link>
              )}
            </li>
          ))}

          {/* زر اللغة داخل القائمة الجانبية */}
          <li className="mt-3 p-3">
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`btn btn-sm ${currentLanguage === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('ar')}
                className={`btn btn-sm ${currentLanguage === 'ar' ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                AR
              </button>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;