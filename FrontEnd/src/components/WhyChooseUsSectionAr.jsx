import { useEffect, useState } from "react";
import api from "@/lib/axios";

const WhyChooseUsSectionAr = () => {
  const [data, setData] = useState(null);
  const BASE_URL = "http://localhost:5010";

  useEffect(() => {
    api.get("/WhyChooseUs")
      .then(res => setData(res.data))
      .catch(() => console.error("فشل تحميل قسم لماذا نحن"));
  }, []);

  if (!data) return null;

  return (
    <section id="features" className="features section" style={{ backgroundColor: '#f2f7f9' }} dir="rtl">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="Choose aaaaaaaaaaa">{data.mainTitleAr}</h2>
        <p>{data.subtitleAr}</p>
      </div>

      <div className="container">
        <div className="tab-content" data-aos="fade-up" data-aos-delay={200}>
          <div className="tab-pane fade active show">
            <div className="row">
              <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center text-end">
                <h3 className="hhh3 aaaaaaaaaaa">{data.highlightTitleAr}</h3>
                <p className="fst-italic">{data.highlightDescriptionAr}</p>
                <ul>
                  {data.bulletPointsAr?.map((item, idx) => (
                    <li key={idx}><i className="bi bi-check2-all me-2" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-6 order-1 order-lg-2 text-center">
                <img src={BASE_URL + data.imageUrl} alt="لماذا تختارنا" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSectionAr;
