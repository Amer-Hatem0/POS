import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Trash2, Link as LinkIcon, Phone, Mail, Globe, MapPin, Image as ImageIcon } from "lucide-react";

type Advertisement = {
  id: number;
  title: string;
  titleAr?: string | null;
  content: string;
  contentAr?: string | null;
  clientName?: string | null;
  longDescription?: string | null;
  longDescriptionAr?: string | null;
  clientUrl?: string | null;
  clientContactEmail?: string | null;
  clientContactPhone?: string | null;
  clientWebsite?: string | null;
  clientAddress?: string | null;
  imageUrl?: string | null;
  isPublished: boolean;
  expirationDate?: string | null;
  createdById?: string | null;
  createdAt: string;
  categoryId?: number | null;
  categoryName?: string | null;
  mediaUrls: string[];
};

const ASSET_BASE = (import.meta.env.VITE_API_BASE_URL1 as string) || ""; // مثل: https://api.example.com
const resolveUrl = (u?: string | null) => (!u ? "" : /^https?:\/\//i.test(u) ? u : `${ASSET_BASE}${u}`);

export default function AdminAdvertisementsPage() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchAds = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/advertisement");
      setAds(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // نشر/إلغاء نشر عبر إرسال نفس بيانات الإعلان مع تبديل isPublished
  const togglePublish = async (ad: Advertisement) => {
    const fd = new FormData();
    fd.append("title", ad.title);
    fd.append("titleAr", ad.titleAr || "");
    fd.append("content", ad.content);
    fd.append("contentAr", ad.contentAr || "");
    fd.append("clientName", ad.clientName || "");
    fd.append("longDescription", ad.longDescription || "");
    fd.append("longDescriptionAr", ad.longDescriptionAr || "");
    fd.append("clientUrl", ad.clientUrl || "");
    fd.append("clientContactEmail", ad.clientContactEmail || "");
    fd.append("clientContactPhone", ad.clientContactPhone || "");
    fd.append("clientWebsite", ad.clientWebsite || "");
    fd.append("clientAddress", ad.clientAddress || "");
    fd.append("isPublished", String(!ad.isPublished));
    if (ad.expirationDate) fd.append("expirationDate", ad.expirationDate.split("T")[0]);
    if (ad.categoryId) fd.append("categoryId", String(ad.categoryId));
    await axios.put(`/advertisement/${ad.id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    fetchAds();
  };

  const deleteAd = async (id: number) => {
    if (confirm("Delete this advertisement?")) {
      await axios.delete(`/advertisement/${id}`);
      fetchAds();
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return ads;
    const q = search.toLowerCase();
    return ads.filter(a =>
      (a.title || "").toLowerCase().includes(q) ||
      (a.titleAr || "").toLowerCase().includes(q) ||
      (a.clientName || "").toLowerCase().includes(q) ||
      (a.categoryName || "").toLowerCase().includes(q)
    );
  }, [ads, search]);

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Advertisements Management</h2>

      <div className="d-flex gap-2 mb-4">
        <input
          className="form-control"
          placeholder="Search by title, client, or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={fetchAds}>Refresh</Button>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && filtered.length === 0 && <p>No advertisements found.</p>}

      <style>
        {`
          .ad-card{border:1px solid #eee;border-radius:12px;padding:20px;margin-bottom:20px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,0.03)}
          .ad-title{font-weight:700;font-size:1.05rem}
          .ad-meta{font-size:.9rem;color:#6b7280}
          .badge{font-size:.8rem;font-weight:600;padding:4px 8px;border-radius:6px;margin-right:8px}
          .grid{display:grid;gap:12px}
          .grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}
          .img-thumb{width:80px;height:60px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb}
        `}
      </style>

      {filtered.map((a) => (
        <div className="ad-card" key={a.id}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <div className="ad-title">{a.title} {a.titleAr ? ` / ${a.titleAr}` : ""}</div>
              <div className="ad-meta">
                {a.categoryName ? `Category: ${a.categoryName} • ` : ""}Created: {new Date(a.createdAt).toLocaleDateString()}
                {a.expirationDate ? ` • Expires: ${new Date(a.expirationDate).toLocaleDateString()}` : ""}
              </div>
              <div className="mt-2">
                <span className="badge" style={{ backgroundColor: a.isPublished ? "#d1e7dd" : "#f8d7da", color: a.isPublished ? "#0f5132" : "#842029" }}>
                  {a.isPublished ? "Published" : "Unpublished"}
                </span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Link to={`/admin/ad/${a.id}`}>
                <Button variant="outline" title="View">View</Button>
              </Link>
              <Button variant="outline" onClick={() => togglePublish(a)} title={a.isPublished ? "Unpublish" : "Publish"}>
                {a.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
              <Button variant="destructive" onClick={() => deleteAd(a.id)} title="Delete">
                <Trash2 size={16} />
              </Button>
            </div>
          </div>

          <div className="ad-meta">Content: {a.content}{a.contentAr ? ` / ${a.contentAr}` : ""}</div>
          {a.clientName && <div className="ad-meta">Client: {a.clientName}</div>}

          <div className="mt-3 grid grid-3">
            <div className="ad-meta d-flex align-items-center gap-2">
              {a.clientUrl ? <a className="d-inline-flex align-items-center gap-1" href={a.clientUrl} target="_blank" rel="noreferrer"><LinkIcon size={16}/>Client Link</a> : <span className="text-muted d-inline-flex align-items-center gap-1"><LinkIcon size={16}/>No Link</span>}
            </div>
            <div className="ad-meta d-flex align-items-center gap-2">
              {a.clientWebsite ? <a className="d-inline-flex align-items-center gap-1" href={a.clientWebsite} target="_blank" rel="noreferrer"><Globe size={16}/>Website</a> : <span className="text-muted d-inline-flex align-items-center gap-1"><Globe size={16}/>No Website</span>}
            </div>
            <div className="ad-meta d-flex align-items-center gap-2">
              {a.clientContactEmail ? <span className="d-inline-flex align-items-center gap-1"><Mail size={16}/>{a.clientContactEmail}</span> : <span className="text-muted d-inline-flex align-items-center gap-1"><Mail size={16}/>No Email</span>}
            </div>
            <div className="ad-meta d-flex align-items-center gap-2">
              {a.clientContactPhone ? <span className="d-inline-flex align-items-center gap-1"><Phone size={16}/>{a.clientContactPhone}</span> : <span className="text-muted d-inline-flex align-items-center gap-1"><Phone size={16}/>No Phone</span>}
            </div>
            <div className="ad-meta d-flex align-items-center gap-2">
              {a.clientAddress ? <span className="d-inline-flex align-items-center gap-1"><MapPin size={16}/>{a.clientAddress}</span> : <span className="text-muted d-inline-flex align-items-center gap-1"><MapPin size={16}/>No Address</span>}
            </div>
          </div>

          <div className="mt-3 d-flex align-items-center gap-2 flex-wrap">
            {a.imageUrl ? (
              <img src={resolveUrl(a.imageUrl)} className="img-thumb" alt="" />
            ) : (
              <div className="d-inline-flex align-items-center text-muted">
                <ImageIcon size={16} className="me-1"/>No cover image
              </div>
            )}
            {Array.isArray(a.mediaUrls) && a.mediaUrls.length > 0 && a.mediaUrls.map((u, i) => (
              <img key={i} src={resolveUrl(u)} className="img-thumb" alt="" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
