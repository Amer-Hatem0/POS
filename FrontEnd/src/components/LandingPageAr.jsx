import React, { useEffect } from 'react';

import AOS from 'aos';

import Logo from "@/assets/1.png";

import ServicesSectionAr from "./ServicesSectionAr";

import FAQSectionAr from "./FAQSectionAr";

import ContactSectionAr from "./ContactSectionAr";

import Navbar from "./Navbar";

import FooterAr from "./FooterAr";
import AboutSectionAr from "./AboutSectionAr";
import WhyChooseUsSectionAr from "./WhyChooseUsSectionAr";




import img from "@/assets/img/features-illustration-3.webp";


const LandingPageAr = () => {

    useEffect(() => {

        AOS.init({ once: true });

    }, []);


    return (

        <div className="index-page"  dir="rtl">

            {/* Header */}

            <Navbar   />


            <main className="main">

                {/* Hero Section */}

                <section id="hero" className="hero section" dir="ltr">

                    <div className="container" data-aos="fade-up" data-aos-delay={100}>

                        <div className="row align-items-center">

                            <div className="col-lg-6">

                                <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>

                                    <img src={img} alt="Hero Image" className="img-fluid" />

                                  

                                </div>

                            </div>

                            <div className="col-lg-6 text-end" dir="rtl">
                                <div className="hero-content" data-aos="fade-up" data-aos-delay="200">

                                    <div className="company-badge mb-4">
                                        <i className="bi bi-gear-fill ms-2"></i>
                                        تعزيز نموك الرقمي
                                    </div>

                                    <h1 className="mb-4">
                                        أطلق مشروعك <br />
                                        بحلول ذكية و <br />
                                        <span className="accent-text">قابلة للتطوير</span>
                                    </h1>

                                    <p className="mb-4 mb-md-5">
                                        من تطوير المواقع والتطبيقات إلى التسويق الرقمي وأنظمة نقاط البيع، تساعد BRIXEL عملك على النمو باستخدام التكنولوجيا الذكية المصممة خصيصًا لاحتياجاتك.
                                    </p>

                                    <div className="hero-buttons d-flex flex-column flex-sm-row justify-content-start align-items-end">
                                        <a href="#about" className="btn btn-primary mb-2 mb-sm-0 mx-1 order-2 order-sm-1">ابدأ الآن</a>
                                      
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

                                        <h4>3x جوائز فاز بها</h4>

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

            <AboutSectionAr />
                {/* Features Section */}

             <WhyChooseUsSectionAr />
                {/* Services Section */}

                <ServicesSectionAr />{/* /Services Section */}



                {/* Faq Section */}

                <FAQSectionAr />{/* /Faq Section */}

                {/* Call To Action 2 Section */}

                <section id="call-to-action-2" className="call-to-action-2 section dark-background">

                    <div className="container">

                        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay={100}>

                            <div className="col-xl-10">

                                <div className="text-center">

                                    <h3>لنطلق مشروعك اليوم!</h3>

                                    <p>فريقنا من الخبراء جاهز لمساعدتك في اختيار الحل المناسب وبدء رحلتك نحو النجاح. سواء كنت بحاجة إلى موقع ويب أو تطبيق أو نظام عمل كامل، نحن هنا من أجلك.</p>

                                    <a className="cta-btn" href="#">احجز استشارة مجانية</a>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>{/* /Call To Action 2 Section */}

                {/* Testimonials Section */}
 

                {/* Contact Section */}

                <ContactSectionAr />{/* /Contact Section */}



            </main>

            {/* Footer */}

            <FooterAr />

        </div>

    );

};


export default LandingPageAr;