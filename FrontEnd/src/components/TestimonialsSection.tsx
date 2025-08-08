import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";
interface Testimonial {
    id: number;
    clientName: string;
    clientTitle: string;
    content: string;
    imageUrl: string;
    rating: number;
}
export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        clientName: "",
        clientTitle: "",
        content: "",
        rating: 5
    });
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [visibleTestimonialsCount, setVisibleTestimonialsCount] = useState(4);
    useEffect(() => {
        AOS.init({ once: true });
        fetchTestimonials();
    }, []);
    const fetchTestimonials = async () => {
        try {
            const res = await axios.get("/testimonial/public");
            setTestimonials(res.data);
        } catch (err) {
            console.error("Error loading testimonials", err);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("ClientName", formData.clientName);
        data.append("ClientTitle", formData.clientTitle);
        data.append("Content", formData.content);
        data.append("Rating", formData.rating.toString());
        data.append("Image", new Blob()); 
        try {
            setLoading(true);
            await axios.post("/testimonial", data);
            toast.success("Your review has been submitted successfully!");
            setSubmitted(true);
            setFormData({
                clientName: "",
                clientTitle: "",
                content: "",
                rating: 5
            });
            setShowForm(false);
            fetchTestimonials();
            localStorage.setItem("newTestimonial", "true");
        } catch (err) {
            console.error("Submit error", err);
        } finally {
            setLoading(false);
        }
    };
    const renderStars = (rating: number, clickable = false) => {
        return Array.from({ length: 5 }, (_, index) => {
            const currentStar = index + 1;
            const isActive = clickable
                ? hoverRating !== null
                    ? currentStar <= hoverRating
                    : currentStar <= formData.rating
                : currentStar <= rating;
            return (
                <i
                    key={index}
                    className={`bi bi-star-fill star ${isActive ? "text-warning" : "text-secondary"}`}
                    onMouseEnter={() => clickable && setHoverRating(currentStar)}
                    onMouseLeave={() => clickable && setHoverRating(null)}
                    onClick={() => clickable && setFormData(prev => ({ ...prev, rating: currentStar }))}
                    style={{ cursor: clickable ? "pointer" : "default", fontSize: "1.2rem", marginRight: 5 }}
                />
            );
        });
    };
    const handleShowMore = () => {
        setVisibleTestimonialsCount(prevCount => prevCount + 2);
    };
    return (
        <section className="section py-5" style={{ background: "#f9f9f9" }}>
            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
            <div className="container">
                <style>
                    {`
          .testimonial-card {
            background: #fff;
            border: 1px solid #eee;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
            transition: all 0.3s ease-in-out;
          }
          .testimonial-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          }
          .testimonial-avatar {
            width: 64px;
            height: 64px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 16px;
          }
          .testimonial-name {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0;
          }
          .testimonial-title {
            font-size: 0.9rem;
            color: #888;
          }
          .testimonial-content {
            font-style: italic;
            color: #555;
            margin-top: 12px;
          }
          .stars i {
            color: #f1c40f;
            font-size: 1rem;
            cursor: pointer;
            margin-right: 3px;
            transition: color 0.2s ease;
          }
        `}
                </style>
                <h2 className="text-center mb-4">What People Are Saying</h2>
                <div className="row g-4 mb-5">
                    {testimonials.slice(0, visibleTestimonialsCount).map((t, index) => (
                        <div className="col-md-6" key={t.id} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="testimonial-card d-flex flex-column h-100">
                                <div className="d-flex align-items-center">
                                    <div className="testimonial-avatar text-white bg-primary d-flex justify-content-center align-items-center">
                                        {t.clientName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="testimonial-name">{t.clientName}</p>
                                        <p className="testimonial-title">{t.clientTitle}</p>
                                        <div className="stars">{renderStars(t.rating)}</div>
                                    </div>
                                </div>
                                <p className="testimonial-content mt-3">
                                    {t.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {visibleTestimonialsCount < testimonials.length && (
                    <div className="text-center mb-4">
                        <button className="btn btn-primary" onClick={handleShowMore}>
                            View More
                        </button>
                    </div>
                )}
                <div className="text-center mb-4">
                    <button className="btn btn-outline-primary text-white" onClick={() => setShowForm(prev => !prev)}>
                        {showForm ? "Cancel" : "Add Your Review"}
                    </button>
                </div>
                {showForm && (
                    <form className="row g-3 justify-content-center" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="clientTitle"
                                value={formData.clientTitle}
                                onChange={handleChange}
                                placeholder="Your Title"
                                required
                            />
                        </div>
                        <div className="col-md-12">
                            <textarea
                                className="form-control"
                                name="content"
                                rows={4}
                                placeholder="Your Review"
                                value={formData.content}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-12 text-center">
                            <label className="mb-2 fw-bold">Your Rating</label>
                            <div className="stars d-flex justify-content-center">
                                {Array.from({ length: 5 }, (_, index) => {
                                    const current = index + 1;
                                    const isActive = hoverRating !== null
                                        ? current <= hoverRating
                                        : current <= formData.rating;
                                    return (
                                        <i
                                            key={index}
                                            className={`bi bi-star-fill ${isActive ? "text-warning" : "text-secondary"}`}
                                            onMouseEnter={() => setHoverRating(current)}
                                            onMouseLeave={() => setHoverRating(null)}
                                            onClick={() => setFormData(prev => ({ ...prev, rating: current }))}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn btn-primary mt-3" type="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <style>
                {`
  .testimonial-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: #086a87  !important;
    color: white;
    margin-right: 16px;
  }
`}
            </style>
        </section>
    );
}
