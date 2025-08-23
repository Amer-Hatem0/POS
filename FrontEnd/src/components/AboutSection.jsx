import { useEffect, useState } from "react";
import api from "@/lib/axios";

const AboutSection = () => {
  const [about, setAbout] = useState(null);
const BASE_URL = "http://localhost:5010";
  useEffect(() => {
    api.get("/AboutSection")
      .then((res) => setAbout(res.data))
      .catch((err) => console.error("Failed to load about section", err));
  }, []);

  if (!about) return null;

  return (
    <section id="about" className="about section">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4 align-items-center justify-content-between">
          <div className="col-xl-5" data-aos="fade-up" data-aos-delay={200}>
            <h1 className="about-meta">WHO WE ARE</h1>
            <h2 className="about-title">{about.titleEn}</h2>
            <p className="about-description">{about.descriptionEn}</p>
            <div className="row feature-list-wrapper">
              <div className="col-md-6">
                <ul className="feature-list">
                  {about.servicesEn.slice(0, Math.ceil(about.servicesEn.length / 2)).map((item, index) => (
                    <li key={index}><i className="bi bi-check-circle-fill" /> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="feature-list">
                  {about.servicesEn.slice(Math.ceil(about.servicesEn.length / 2)).map((item, index) => (
                    <li key={index}><i className="bi bi-check-circle-fill" /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-6 d-none d-lg-flex" data-aos="fade-up" data-aos-delay={300}>
            <div className="image-wrapper">
              <div className="images position-relative" data-aos="zoom-out" data-aos-delay={400}>
                <img src={BASE_URL + about.mainImageUrl} alt="Business Meeting" className="img-fluid main-image rounded-4" />
                <img src={BASE_URL + about.smallImageUrl} alt="Team Discussion" className="img-fluid small-image rounded-4" />
              </div>
              <div className="experience-badge floating">
                <h3>{about.yearsOfExperience}+ <span>Years</span></h3>
                <p>of Excellence in Digital Innovation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
