import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, EyeOff, CheckCircle } from "lucide-react";

interface Testimonial {
    id: number;
    clientName: string;
    clientTitle: string;
    content: string;
    rating: number;
    isApproved: boolean;
    isVisible: boolean;
    createdAt: string;
}

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTestimonials = async () => {
        try {
            const res = await axios.get("/testimonial");
            setTestimonials(res.data);
        } catch (err) {
            console.error("Error loading testimonials", err);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const approve = async (id: number) => {
        await axios.patch(`/testimonial/${id}/approve`);
        fetchTestimonials();
    };

    const toggleVisibility = async (id: number) => {
        await axios.patch(`/testimonial/${id}/toggle-visibility`);
        fetchTestimonials();
    };

    const deleteTestimonial = async (id: number) => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            await axios.delete(`/testimonial/${id}`);
            fetchTestimonials();
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4 fw-bold">Testimonials Management</h2>

            {loading && <p>Loading...</p>}
            {!loading && testimonials.length === 0 && <p>No testimonials found.</p>}

            <style>
                {`
                    .testimonial-admin-card {
                        border: 1px solid #eee;
                        border-radius: 12px;
                        padding: 20px;
                        margin-bottom: 20px;
                        background: #fff;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.03);
                    }
                    .testimonial-header {
                        font-weight: bold;
                        margin-bottom: 6px;
                    }
                    .testimonial-meta {
                        font-size: 0.9rem;
                        color: #777;
                    }
                    .testimonial-content {
                        font-style: italic;
                        color: #444;
                        margin-top: 10px;
                    }
                    .status-label {
                        font-size: 0.85rem;
                        font-weight: 600;
                        padding: 4px 8px;
                        border-radius: 6px;
                        margin-right: 8px;
                    }
                `}
            </style>

            {testimonials.map((t) => (
                <div className="testimonial-admin-card" key={t.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="testimonial-header">{t.clientName} - {t.clientTitle}</div>
                            <div className="testimonial-meta">Rating: {t.rating} ★ | Created at: {new Date(t.createdAt).toLocaleDateString()}</div>
                            <div className="testimonial-content">{t.content}</div>
                            <div className="mt-2">
                                <span
                                    className="status-label"
                                    style={{
                                        backgroundColor: t.isApproved ? "#d1e7dd" : "#f8d7da",
                                        color: t.isApproved ? "#0f5132" : "#842029"
                                    }}
                                >
                                    {t.isApproved ? "Approved" : "Not Approved"}
                                </span>
                                <span
                                    className="status-label"
                                    style={{
                                        backgroundColor: t.isVisible ? "#cfe2ff" : "#fefefe",
                                        color: t.isVisible ? "#084298" : "#6c757d"
                                    }}
                                >
                                    {t.isVisible ? "Visible" : "Hidden"}
                                </span>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            {!t.isApproved && (
                                <Button variant="success" onClick={() => approve(t.id)} title="Approve">
                                    <CheckCircle className="me-1" size={16} /> Approve
                                </Button>
                            )}
                            <Button
                                onClick={() => toggleVisibility(t.id)}
                                title="Toggle Visibility"
                                className={t.isVisible ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-400 hover:bg-red-600 text-white"}
                            >
                                {t.isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                            </Button>
                            <Button variant="destructive" onClick={() => deleteTestimonial(t.id)} title="Delete">
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}