// src/components/LandingPage.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';

const LandingPage = () => {
    useEffect(() => {
        AOS.init({ once: true });
    }, []);

    return (
        <body className="index-page">
            {/* Header */}
            <header id="header" className="header d-flex align-items-center fixed-top">
                <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                    <a href="#hero" className="logo d-flex align-items-center me-auto me-xl-0">
                        <h1 className="sitename">iLanding</h1>
                    </a>
                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><a href="#hero" className="active">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#services">Services</a></li>
                            <li className="dropdown">
                                <a href="#"><span>Services</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                <ul>
                                    <li><a href="#">Services 1</a></li>
                                    <li><a href="#">Services 2</a></li>
                                </ul>
                            </li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>
                    <a className="btn-getstarted" href="#about">Get Started</a>
                </div>
            </header>

            <main className="main">
                {/* Hero Section */}
                <section id="hero" className="hero section">
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="hero-content" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="company-badge mb-4">
                                        <i className="bi bi-gear-fill me-2" />
                                        Working for your success
                                    </div>
                                    <h1 className="mb-4">
                                        Maecenas Vitae <br />
                                        Consectetur Led <br />
                                        <span className="accent-text">Vestibulum Ante</span>
                                    </h1>
                                    <p className="mb-4 mb-md-5">
                                        Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
                                        Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
                                    </p>
                                    <div className="hero-buttons">
                                        <a href="#about" className="btn btn-primary me-0 me-sm-2 mx-1">Get Started</a>
                                        <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="btn btn-link mt-2 mt-sm-0 glightbox">
                                            <i className="bi bi-play-circle me-1" />
                                            Play Video
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>
                                    <img src="assets/img/illustration-1.webp" alt="Hero Image" className="img-fluid" />
                                    <div className="customers-badge">
                                        <div className="customer-avatars">
                                            <img src="assets/img/avatar-1.webp" alt="Customer 1" className="avatar" />
                                            <img src="assets/img/avatar-2.webp" alt="Customer 2" className="avatar" />
                                            <img src="assets/img/avatar-3.webp" alt="Customer 3" className="avatar" />
                                            <img src="assets/img/avatar-4.webp" alt="Customer 4" className="avatar" />
                                            <img src="assets/img/avatar-5.webp" alt="Customer 5" className="avatar" />
                                            <span className="avatar more">12+</span>
                                        </div>
                                        <p className="mb-0 mt-2">12,000+ lorem ipsum dolor sit amet consectetur adipiscing elit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay={500}>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-trophy" />
                                    </div>
                                    <div className="stat-content">
                                        <h4>3x Won Awards</h4>
                                        <p className="mb-0">Vestibulum ante ipsum</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-briefcase" />
                                    </div>
                                    <div className="stat-content">
                                        <h4>6.5k Faucibus</h4>
                                        <p className="mb-0">Nullam quis ante</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-graph-up" />
                                    </div>
                                    <div className="stat-content">
                                        <h4>80k Mauris</h4>
                                        <p className="mb-0">Etiam sit amet orci</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-award" />
                                    </div>
                                    <div className="stat-content">
                                        <h4>6x Phasellus</h4>
                                        <p className="mb-0">Vestibulum ante ipsum</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>{/* /Hero Section */}
                {/* About Section */}
                <section id="about" className="about section">
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row gy-4 align-items-center justify-content-between">
                            <div className="col-xl-5" data-aos="fade-up" data-aos-delay={200}>
                                <span className="about-meta">MORE ABOUT US</span>
                                <h2 className="about-title">Voluptas enim suscipit temporibus</h2>
                                <p className="about-description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                <div className="row feature-list-wrapper">
                                    <div className="col-md-6">
                                        <ul className="feature-list">
                                            <li><i className="bi bi-check-circle-fill" /> Lorem ipsum dolor sit amet</li>
                                            <li><i className="bi bi-check-circle-fill" /> Consectetur adipiscing elit</li>
                                            <li><i className="bi bi-check-circle-fill" /> Sed do eiusmod tempor</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="feature-list">
                                            <li><i className="bi bi-check-circle-fill" /> Incididunt ut labore et</li>
                                            <li><i className="bi bi-check-circle-fill" /> Dolore magna aliqua</li>
                                            <li><i className="bi bi-check-circle-fill" /> Ut enim ad minim veniam</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="info-wrapper">
                                    <div className="row gy-4">
                                        <div className="col-lg-5">
                                            <div className="profile d-flex align-items-center gap-3">
                                                <img src="assets/img/avatar-1.webp" alt="CEO Profile" className="profile-image" />
                                                <div>
                                                    <h4 className="profile-name">Mario Smith</h4>
                                                    <p className="profile-position">CEO &amp; Founder</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-7">
                                            <div className="contact-info d-flex align-items-center gap-2">
                                                <i className="bi bi-telephone-fill" />
                                                <div>
                                                    <p className="contact-label">Call us anytime</p>
                                                    <p className="contact-number">+123 456-789</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6" data-aos="fade-up" data-aos-delay={300}>
                                <div className="image-wrapper">
                                    <div className="images position-relative" data-aos="zoom-out" data-aos-delay={400}>
                                        <img src="assets/img/about-5.webp" alt="Business Meeting" className="img-fluid main-image rounded-4" />
                                        <img src="assets/img/about-2.webp" alt="Team Discussion" className="img-fluid small-image rounded-4" />
                                    </div>
                                    <div className="experience-badge floating">
                                        <h3>15+ <span>Years</span></h3>
                                        <p>Of experience in business service</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>{/* /About Section */}
                {/* Features Section */}
                <section id="features" className="features section">
                    {/* Section Title */}
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Features</h2>
                        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
                    </div>{/* End Section Title */}
                    <div className="container">
                        <div className="d-flex justify-content-center">
                            <ul className="nav nav-tabs" data-aos="fade-up" data-aos-delay={100}>
                                <li className="nav-item">
                                    <a className="nav-link active show" data-bs-toggle="tab" data-bs-target="#features-tab-1">
                                        <h4>Modisit</h4>
                                    </a>
                                </li>{/* End tab nav item */}
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-2">
                                        <h4>Praesenti</h4>
                                    </a>{/* End tab nav item */}
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-3">
                                        <h4>Explica</h4>
                                    </a>
                                </li>{/* End tab nav item */}
                            </ul>
                        </div>
                        <div className="tab-content" data-aos="fade-up" data-aos-delay={200}>
                            <div className="tab-pane fade active show" id="features-tab-1">
                                <div className="row">
                                    <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                                        <h3>Voluptatem dignissimos provident</h3>
                                        <p className="fst-italic">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                            magna aliqua.
                                        </p>
                                        <ul>
                                            <li><i className="bi bi-check2-all" /> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
                                            <li><i className="bi bi-check2-all" /> <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
                                            <li><i className="bi bi-check2-all" /> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</span></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 order-1 order-lg-2 text-center">
                                        <img src="assets/img/features-illustration-1.webp" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>{/* End tab content item */}
                            <div className="tab-pane fade" id="features-tab-2">
                                <div className="row">
                                    <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                                        <h3>Neque exercitationem debitis</h3>
                                        <p className="fst-italic">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                            magna aliqua.
                                        </p>
                                        <ul>
                                            <li><i className="bi bi-check2-all" /> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
                                            <li><i className="bi bi-check2-all" /> <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
                                            <li><i className="bi bi-check2-all" /> <span>Provident mollitia neque rerum asperiores dolores quos qui a. Ipsum neque dolor voluptate nisi sed.</span></li>
                                            <li><i className="bi bi-check2-all" /> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</span></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 order-1 order-lg-2 text-center">
                                        <img src="assets/img/features-illustration-2.webp" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>{/* End tab content item */}
                            <div className="tab-pane fade" id="features-tab-3">
                                <div className="row">
                                    <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                                        <h3>Voluptatibus commodi accusamu</h3>
                                        <ul>
                                            <li><i className="bi bi-check2-all" /> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
                                            <li><i className="bi bi-check2-all" /> <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
                                            <li><i className="bi bi-check2-all" /> <span>Provident mollitia neque rerum asperiores dolores quos qui a. Ipsum neque dolor voluptate nisi sed.</span></li>
                                        </ul>
                                        <p className="fst-italic">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                            magna aliqua.
                                        </p>
                                    </div>
                                    <div className="col-lg-6 order-1 order-lg-2 text-center">
                                        <img src="assets/img/features-illustration-3.webp" alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>{/* End tab content item */}
                        </div>
                    </div>
                </section>{/* /Features Section */}
                {/* Services Section */}
                <section id="services" className="services section light-background">
                    {/* Section Title */}
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Services</h2>
                        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
                    </div>{/* End Section Title */}
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row g-4">
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
                                <div className="service-card d-flex">
                                    <div className="icon flex-shrink-0">
                                        <i className="bi bi-activity" />
                                    </div>
                                    <div>
                                        <h3>Nesciunt Mete</h3>
                                        <p>Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur.</p>
                                        <a href="service-details.html" className="read-more">Read More <i className="bi bi-arrow-right" /></a>
                                    </div>
                                </div>
                            </div>{/* End Service Card */}
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
                                <div className="service-card d-flex">
                                    <div className="icon flex-shrink-0">
                                        <i className="bi bi-diagram-3" />
                                    </div>
                                    <div>
                                        <h3>Eosle Commodi</h3>
                                        <p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>
                                        <a href="service-details.html" className="read-more">Read More <i className="bi bi-arrow-right" /></a>
                                    </div>
                                </div>
                            </div>{/* End Service Card */}
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={300}>
                                <div className="service-card d-flex">
                                    <div className="icon flex-shrink-0">
                                        <i className="bi bi-easel" />
                                    </div>
                                    <div>
                                        <h3>Ledo Markt</h3>
                                        <p>Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.</p>
                                        <a href="service-details.html" className="read-more">Read More <i className="bi bi-arrow-right" /></a>
                                    </div>
                                </div>
                            </div>{/* End Service Card */}
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={400}>
                                <div className="service-card d-flex">
                                    <div className="icon flex-shrink-0">
                                        <i className="bi bi-clipboard-data" />
                                    </div>
                                    <div>
                                        <h3>Asperiores Commodit</h3>
                                        <p>Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.</p>
                                        <a href="service-details.html" className="read-more">Read More <i className="bi bi-arrow-right" /></a>
                                    </div>
                                </div>
                            </div>{/* End Service Card */}
                        </div>
                    </div>
                </section>{/* /Services Section */}
                {/* Stats Section */}
                <section id="stats" className="stats section">
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row gy-4">
                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <span data-purecounter-start={0} data-purecounter-end={232} data-purecounter-duration={1} className="purecounter" />
                                    <p>Clients</p>
                                </div>
                            </div>{/* End Stats Item */}
                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <span data-purecounter-start={0} data-purecounter-end={521} data-purecounter-duration={1} className="purecounter" />
                                    <p>Projects</p>
                                </div>
                            </div>{/* End Stats Item */}
                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <span data-purecounter-start={0} data-purecounter-end={1453} data-purecounter-duration={1} className="purecounter" />
                                    <p>Hours Of Support</p>
                                </div>
                            </div>{/* End Stats Item */}
                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <span data-purecounter-start={0} data-purecounter-end={32} data-purecounter-duration={1} className="purecounter" />
                                    <p>Workers</p>
                                </div>
                            </div>{/* End Stats Item */}
                        </div>
                    </div>
                </section>{/* /Stats Section */}
                {/* Faq Section */}
                <section className="faq-9 faq section light-background" id="faq">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5" data-aos="fade-up">
                                <h2 className="faq-title">Have a question? Check out the FAQ</h2>
                                <p className="faq-description">Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero sit amet adipiscing sem neque sed ipsum.</p>
                                <div className="faq-arrow d-none d-lg-block" data-aos="fade-up" data-aos-delay={200}>
                                    <svg className="faq-arrow" width={200} height={211} viewBox="0 0 200 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M198.804 194.488C189.279 189.596 179.529 185.52 169.407 182.07L169.384 182.049C169.227 181.994 169.07 181.939 168.912 181.884C166.669 181.139 165.906 184.546 167.669 185.615C174.053 189.473 182.761 191.837 189.146 195.695C156.603 195.912 119.781 196.591 91.266 179.049C62.5221 161.368 48.1094 130.695 56.934 98.891C84.5539 98.7247 112.556 84.0176 129.508 62.667C136.396 53.9724 146.193 35.1448 129.773 30.2717C114.292 25.6624 93.7109 41.8875 83.1971 51.3147C70.1109 63.039 59.63 78.433 54.2039 95.0087C52.1221 94.9842 50.0776 94.8683 48.0703 94.6608C30.1803 92.8027 11.2197 83.6338 5.44902 65.1074C-1.88449 41.5699 14.4994 19.0183 27.9202 1.56641C28.6411 0.625793 27.2862 -0.561638 26.5419 0.358501C13.4588 16.4098 -0.221091 34.5242 0.896608 56.5659C1.8218 74.6941 14.221 87.9401 30.4121 94.2058C37.7076 97.0203 45.3454 98.5003 53.0334 98.8449C47.8679 117.532 49.2961 137.487 60.7729 155.283C87.7615 197.081 139.616 201.147 184.786 201.155L174.332 206.827C172.119 208.033 174.345 211.287 176.537 210.105C182.06 207.125 187.582 204.122 193.084 201.144C193.346 201.147 195.161 199.887 195.423 199.868C197.08 198.548 193.084 201.144 195.528 199.81C196.688 199.192 197.846 198.552 199.006 197.935C200.397 197.167 200.007 195.087 198.804 194.488ZM60.8213 88.0427C67.6894 72.648 78.8538 59.1566 92.1207 49.0388C98.8475 43.9065 106.334 39.2953 114.188 36.1439C117.295 34.8947 120.798 33.6609 124.168 33.635C134.365 33.5511 136.354 42.9911 132.638 51.031C120.47 77.4222 86.8639 93.9837 58.0983 94.9666C58.8971 92.6666 59.783 90.3603 60.8213 88.0427Z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col-lg-7" data-aos="fade-up" data-aos-delay={300}>
                                <div className="faq-container">
                                    <div className="faq-item faq-active">
                                        <h3>Non consectetur a erat nam at lectus urna duis?</h3>
                                        <div className="faq-content">
                                            <p>Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>{/* End Faq item*/}
                                    <div className="faq-item">
                                        <h3>Feugiat scelerisque varius morbi enim nunc faucibus?</h3>
                                        <div className="faq-content">
                                            <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>{/* End Faq item*/}
                                    <div className="faq-item">
                                        <h3>Dolor sit amet consectetur adipiscing elit pellentesque?</h3>
                                        <div className="faq-content">
                                            <p>Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>{/* End Faq item*/}
                                    <div className="faq-item">
                                        <h3>Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?</h3>
                                        <div className="faq-content">
                                            <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>{/* End Faq item*/}
                                    <div className="faq-item">
                                        <h3>Tempus quam pellentesque nec nam aliquam sem et tortor?</h3>
                                        <div className="faq-content">
                                            <p>Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>{/* End Faq item*/}
                                    <div className="faq-item">
                                        <h3>Perspiciatis quod quo quos nulla quo illum ullam?</h3>
                                        <div className="faq-content">
                                            <p>Enim ea facilis quaerat voluptas quidem et dolorem. Quis et consequatur non sed in suscipit sequi. Distinctio ipsam dolore et.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>{/* End Faq item*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>{/* /Faq Section */}
                {/* Call To Action 2 Section */}
                <section id="call-to-action-2" className="call-to-action-2 section dark-background">
                    <div className="container">
                        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay={100}>
                            <div className="col-xl-10">
                                <div className="text-center">
                                    <h3>Call To Action</h3>
                                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <a className="cta-btn" href="#">Call To Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>{/* /Call To Action 2 Section */}
                {/* Testimonials Section */}
                <section id="testimonials" className="testimonials section light-background">
                    {/* Section Title */}
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Testimonials</h2>
                        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
                    </div>{/* End Section Title */}
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
                                <div className="testimonial-item">
                                    <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img" alt="" />
                                    <h3>Saul Goodman</h3>
                                    <h4>Ceo &amp; Founder</h4>
                                    <div className="stars">
                                        <i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" />
                                    </div>
                                    <p>
                                        <i className="bi bi-quote quote-icon-left" />
                                        <span>Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.</span>
                                        <i className="bi bi-quote quote-icon-right" />
                                    </p>
                                </div>
                            </div>{/* End testimonial item */}
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
                                <div className="testimonial-item">
                                    <img src="assets/img/testimonials/testimonials-2.jpg" className="testimonial-img" alt="" />
                                    <h3>Sara Wilsson</h3>
                                    <h4>Designer</h4>
                                    <div className="stars">
                                        <i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" />
                                    </div>
                                    <p>
                                        <i className="bi bi-quote quote-icon-left" />
                                        <span>Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.</span>
                                        <i className="bi bi-quote quote-icon-right" />
                                    </p>
                                </div>
                            </div>{/* End testimonial item */}
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={300}>
                                <div className="testimonial-item">
                                    <img src="assets/img/testimonials/testimonials-3.jpg" className="testimonial-img" alt="" />
                                    <h3>Jena Karlis</h3>
                                    <h4>Store Owner</h4>
                                    <div className="stars">
                                        <i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" />
                                    </div>
                                    <p>
                                        <i className="bi bi-quote quote-icon-left" />
                                        <span>Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.</span>
                                        <i className="bi bi-quote quote-icon-right" />
                                    </p>
                                </div>
                            </div>{/* End testimonial item */}
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={400}>
                                <div className="testimonial-item">
                                    <img src="assets/img/testimonials/testimonials-4.jpg" className="testimonial-img" alt="" />
                                    <h3>Matt Brandon</h3>
                                    <h4>Freelancer</h4>
                                    <div className="stars">
                                        <i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" />
                                    </div>
                                    <p>
                                        <i className="bi bi-quote quote-icon-left" />
                                        <span>Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.</span>
                                        <i className="bi bi-quote quote-icon-right" />
                                    </p>
                                </div>
                            </div>{/* End testimonial item */}
                        </div>
                    </div>
                </section>{/* /Testimonials Section */}
                {/* Contact Section */}
                <section id="contact" className="contact section light-background">
                    {/* Section Title */}
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Contact</h2>
                        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
                    </div>{/* End Section Title */}
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row g-4 g-lg-5">
                            <div className="col-lg-5">
                                <div className="info-box" data-aos="fade-up" data-aos-delay={200}>
                                    <h3>Contact Info</h3>
                                    <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis.</p>
                                    <div className="info-item" data-aos="fade-up" data-aos-delay={300}>
                                        <div className="icon-box">
                                            <i className="bi bi-geo-alt" />
                                        </div>
                                        <div className="content">
                                            <h4>Our Location</h4>
                                            <p>A108 Adam Street</p>
                                            <p>New York, NY 535022</p>
                                        </div>
                                    </div>
                                    <div className="info-item" data-aos="fade-up" data-aos-delay={400}>
                                        <div className="icon-box">
                                            <i className="bi bi-telephone" />
                                        </div>
                                        <div className="content">
                                            <h4>Phone Number</h4>
                                            <p>+1 5589 55488 55</p>
                                            <p>+1 6678 254445 41</p>
                                        </div>
                                    </div>
                                    <div className="info-item" data-aos="fade-up" data-aos-delay={500}>
                                        <div className="icon-box">
                                            <i className="bi bi-envelope" />
                                        </div>
                                        <div className="content">
                                            <h4>Email Address</h4>
                                            <p>info@example.com</p>
                                            <p>contact@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="contact-form" data-aos="fade-up" data-aos-delay={300}>
                                    <h3>Get In Touch</h3>
                                    <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis.</p>
                                    <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay={200}>
                                        <div className="row gy-4">
                                            <div className="col-md-6">
                                                <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                                            </div>
                                            <div className="col-md-6 ">
                                                <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                                            </div>
                                            <div className="col-12">
                                                <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                                            </div>
                                            <div className="col-12">
                                                <textarea className="form-control" name="message" rows={6} placeholder="Message" required defaultValue={""} />
                                            </div>
                                            <div className="col-12 text-center">
                                                <div className="loading">Loading</div>
                                                <div className="error-message" />
                                                <div className="sent-message">Your message has been sent. Thank you!</div>
                                                <button type="submit" className="btn">Send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>{/* /Contact Section */}

             
            </main>
               {/* Footer */}
                <footer id="footer" className="footer">
                    <div className="container footer-top">
                        <div className="row gy-4">
                            <div className="col-lg-4 col-md-6 footer-about">
                                <a href="#" className="logo d-flex align-items-center">
                                    <span className="sitename">iLanding</span>
                                </a>
                                <div className="footer-contact pt-3">
                                    <p>A108 Adam Street</p>
                                    <p>New York, NY 535022</p>
                                    <p className="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                                    <p><strong>Email:</strong> <span>info@example.com</span></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Services</a></li>
                                    <li><a href="#">Terms of service</a></li>
                                    <li><a href="#">Privacy policy</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-md-3 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><a href="#">Web Design</a></li>
                                    <li><a href="#">Web Development</a></li>
                                    <li><a href="#">Product Management</a></li>
                                    <li><a href="#">Marketing</a></li>
                                    <li><a href="#">Graphic Design</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container copyright text-center mt-4">
                        <p>&copy; <span>Copyright</span> <strong className="px-1 sitename">iLanding</strong> <span>All Rights Reserved</span></p>
                        <div className="credits">
                            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                        </div>
                    </div>
                </footer>
        </body>
    );
};

export default LandingPage;
