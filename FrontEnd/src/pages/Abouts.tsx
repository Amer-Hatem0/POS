import React, { useEffect } from "react";
import AOS from "aos";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSectionEn from "@/components/AboutSection";
 

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="about-page">
      {/* Header */}
      <Navbar />

      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container">
          <h1>About</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">About</li>
            </ol>
          </nav>
        </div>
      </div>

      <main className="main">
        {/* About Section */}
        <AboutSectionEn />

        {/* Why Choose Us Section */}
      
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
