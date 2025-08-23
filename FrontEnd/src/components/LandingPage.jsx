import React, { useEffect } from 'react';
import AOS from 'aos';
import Logo from "@/assets/1.png";
import ServicesSection from "./ServicesSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AboutSection from "./AboutSection";
import WhyChooseUsSectionEn from "./WhyChooseUsSectionEn";
import TestimonialsSection from "./TestimonialsSection";
import { Link } from "react-router-dom";


const LandingPage = () => {

    useEffect(() => {

        AOS.init({ once: true });

    }, []);


    return (

        <div className="index-page">

            {/* Header */}

            <Navbar />
            <main className="main">
                {/* Hero Section */}

                <section id="hero" className="hero section">

                    <div className="container" data-aos="fade-up" data-aos-delay={100}>

                        <div className="row align-items-center">

                            <div className="col-lg-6">

                                <div className="hero-content" data-aos="fade-up" data-aos-delay={200}>

                                    <div className="company-badge mb-4">

                                        <i className="bi bi-gear-fill me-2" />

                                        Empowering Your Digital Growth

                                    </div>

                                    <h1 className="mb-4">

                                        Launch Your Project  <br />

                                        with Smart & <br />

                                        <span className="accent-text">Scalable Solutions</span>

                                    </h1>

                                    <p className="mb-4 mb-md-5">

                                        From website and app development to digital marketing and POS systems — BRIXEL helps your business grow with smart technology tailored to your needs.

                                    </p>

                                    <div className="hero-buttons">

                                       <Link
  to="/about"
  className="btn btn-primary me-0 me-sm-2 mx-1"
>
  Get Started
</Link>
                                    

                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-6 ">

                                <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>

                                    <img src="assets/img/illustration-1.webp" alt="Hero Image" className="img-fluid" />

                             

                                </div>

                            </div>

                        </div>

                     

                    </div>

                </section>{/* /Hero Section */}
                {/* AboutSection */}
                <AboutSection />
                <WhyChooseUsSectionEn />

                {/* Services Section */}

                <ServicesSection />{/* /Services Section */}



                {/* Faq Section */}

                <FAQSection />{/* /Faq Section */}

                {/* Call To Action 2 Section */}

                <section id="call-to-action-2" className="call-to-action-2 section dark-background">

                    <div className="container">

                        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay={100}>

                            <div className="col-xl-10">

                                <div className="text-center">

                                    <h3>Let’s Launch Your Project Today!</h3>

                                    <p>Our expert team is ready to help you

                                        choose the right solution and kickstart

                                        your success journey. Whether you need

                                        a website, app, or full business

                                        system—we’re here for you.</p>

                                    <a className="cta-btn" href="#">Book a Free Consultation</a>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>{/* /Call To Action 2 Section */}

              <TestimonialsSection />

                {/* Contact Section */}

                <ContactSection />{/* /Contact Section */}




            </main>

            {/* Footer */}

            <Footer />

        </div>

    );

};


export default LandingPage; 