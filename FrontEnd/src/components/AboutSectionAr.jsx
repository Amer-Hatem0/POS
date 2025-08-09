import { useEffect, useState } from "react";
import api from "@/lib/axios";


const AboutSectionAr = () => {
  const [about, setAbout] = useState(null);
  const BASE_URL = "http://localhost:5010";
  useEffect(() => {
    api.get("/AboutSection")
      .then((res) => setAbout(res.data))
      .catch((err) => console.error("Failed to load about section", err));
  }, []);

  if (!about) return null;

  return (
    <section id="about" className="about section" dir="rtl">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4 align-items-center justify-content-between">
          <div className="col-xl-5" data-aos="fade-up" data-aos-delay={200}>
            <span className="about-meta">من نحن</span>
            <h2 className="about-title text-right">{about.titleAr}</h2>
            <p className="about-description text-right">{about.descriptionAr}</p>
            <div className="row feature-list-wrapper">
              <div className="col-md-6">
                <ul className="feature-list">
                  {about.servicesAr.slice(0, Math.ceil(about.servicesAr.length / 2)).map((item, index) => (
                    <li key={index}><i className="bi bi-check-circle-fill me-2" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="feature-list">
                  {about.servicesAr.slice(Math.ceil(about.servicesAr.length / 2)).map((item, index) => (
                    <li key={index}><i className="bi bi-check-circle-fill me-2" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-6" data-aos="fade-up" data-aos-delay={300}>
            <div className="image-wrapper">
              <div className="images position-relative" data-aos="zoom-out" data-aos-delay={400}>
                <img src={BASE_URL + about.mainImageUrl} alt="الاجتماع الرئيسي" className="img-fluid main-image rounded-4" />
                <img src={BASE_URL + about.smallImageUrl} alt="نقاش الفريق" className="img-fluid small-image rounded-4" />
              </div>
              <div className="experience-badge floating text-center">
                <h3>{about.yearsOfExperience}+ <span>سنة</span></h3>
                <p>من التميز في الابتكار الرقمي</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionAr;
