import { useEffect, useState } from "react";
import api from "@/lib/axios";

const WhyChooseUsSectionEn = () => {
  const [data, setData] = useState(null);
  const BASE_URL = "http://localhost:5010";

  useEffect(() => {
    api.get("/WhyChooseUs")
      .then(res => setData(res.data))
      .catch(() => console.error("Failed to load section"));
  }, []);

  if (!data) return null;

  return (
    <section id="features" className="features section" style={{ backgroundColor: '#f2f7f9' }}>
      <div className="container section-title" data-aos="fade-up">
        <h2 className="Choose">{data.mainTitleEn}</h2>
        <p>{data.subtitleEn}</p>
      </div>

      <div className="container">
        <div className="tab-content" data-aos="fade-up" data-aos-delay={200}>
          <div className="tab-pane fade active show">
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                <h3>{data.highlightTitleEn}</h3>
                <p className="fst-italic">{data.highlightDescriptionEn}</p>
                <ul>
                  {data.bulletPointsEn?.map((item, idx) => (
                    <li key={idx}><i className="bi bi-check2-all" /> <span>{item}</span></li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <img src={BASE_URL + data.imageUrl} alt="why choose us" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSectionEn;
