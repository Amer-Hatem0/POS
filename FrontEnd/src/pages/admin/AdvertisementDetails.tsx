import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Save, Pencil, X, Image as ImageIcon, Link as LinkIcon, Phone, Mail, Globe, MapPin } from "lucide-react";

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

const BASE_URL = import.meta.env.VITE_API_BASE_URL1 as string; // مثال: https://api.example.com
const resolveUrl = (u?: string | null) => {
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : `${BASE_URL}${u}`;
};

export default function AdminAdDetailsPage() {
  const { id } = useParams();
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState<Partial<Advertisement> & {
    image?: File | null; mediaFiles?: File[] | null; expirationDate?: string | null;
  }>({ image: null, mediaFiles: null });

  const fetchAd = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/advertisement/${id}`);
      setAd(res.data);
      setForm({
        title: res.data.title,
        titleAr: res.data.titleAr || "",
        content: res.data.content,
        contentAr: res.data.contentAr || "",
        clientName: res.data.clientName || "",
        longDescription: res.data.longDescription || "",
        longDescriptionAr: res.data.longDescriptionAr || "",
        clientUrl: res.data.clientUrl || "",
        clientContactEmail: res.data.clientContactEmail || "",
        clientContactPhone: res.data.clientContactPhone || "",
        clientWebsite: res.data.clientWebsite || "",
        clientAddress: res.data.clientAddress || "",
        isPublished: res.data.isPublished,
        expirationDate: res.data.expirationDate ? res.data.expirationDate.split("T")[0] : "",
        categoryId: res.data.categoryId || undefined,
        image: null,
        mediaFiles: null
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAd(); }, [id]);

  const save = async () => {
    const fd = new FormData();
    fd.append("title", form.title ?? "");
    fd.append("titleAr", form.titleAr ?? "");
    fd.append("content", form.content ?? "");
    fd.append("contentAr", form.contentAr ?? "");
    fd.append("clientName", form.clientName ?? "");
    fd.append("longDescription", form.longDescription ?? "");
    fd.append("longDescriptionAr", form.longDescriptionAr ?? "");
    fd.append("clientUrl", form.clientUrl ?? "");
    fd.append("clientContactEmail", form.clientContactEmail ?? "");
    fd.append("clientContactPhone", form.clientContactPhone ?? "");
    fd.append("clientWebsite", form.clientWebsite ?? "");
    fd.append("clientAddress", form.clientAddress ?? "");
    fd.append("isPublished", String(form.isPublished ?? false));
    if (form.expirationDate) fd.append("expirationDate", form.expirationDate);
    if (form.categoryId !== undefined && form.categoryId !== null) fd.append("categoryId", String(form.categoryId));
    if (form.image) fd.append("image", form.image);
    if (form.mediaFiles && form.mediaFiles.length > 0) form.mediaFiles.forEach(f => fd.append("mediaFiles", f));
    await axios.put(`/advertisement/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
    await fetchAd();
    setEditMode(false);
  };

  if (loading || !ad) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">{ad.title}</h2>
        {!editMode ? (
          <Button onClick={() => setEditMode(true)}><Pencil size={16} className="me-1" />Edit</Button>
        ) : (
          <div className="d-flex gap-2">
            <Button onClick={save}><Save size={16} className="me-1" />Save</Button>
            <Button variant="outline" onClick={() => setEditMode(false)}><X size={16} className="me-1" />Cancel</Button>
          </div>
        )}
      </div>

      <div className="row g-4">
        {/* الصور */}
        <div className="col-md-6">
          <div className="p-3 border rounded">
            <div className="mb-3">
              {ad.imageUrl ? (
                <img src={resolveUrl(ad.imageUrl)} alt="" style={{ width: "100%", borderRadius: 12, objectFit: "cover" }} />
              ) : (
                <div className="text-muted d-flex align-items-center"><ImageIcon className="me-2" />No cover image</div>
              )}
            </div>
            <div className="d-flex flex-wrap gap-2">
              {ad.mediaUrls?.map((u, i) => (
                <img key={i} src={resolveUrl(u)} alt="" style={{ width: 90, height: 70, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }} />
              ))}
            </div>

            {editMode && (
              <div className="mt-3">
                <div className="mb-2">
                  <label className="form-label">Cover Image</label>
                  <input type="file" className="form-control" onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Media Files</label>
                  <input multiple type="file" className="form-control" onChange={(e) => setForm({ ...form, mediaFiles: e.target.files ? Array.from(e.target.files) : null })} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* التفاصيل */}
        <div className="col-md-6">
          {!editMode ? (
            <div className="p-3 border rounded">
              <h5 className="fw-bold mb-2">الوصف (العربي والإِنجليزي)</h5>
              <div className="fs-5 fw-bold">{ad.titleAr || "—"}</div>
              <div className="mt-2">{ad.content || "—"}</div>
              <div className="mt-2">{ad.contentAr || "—"}</div>

              <hr className="my-3" />
              <div className="mb-2"><strong>العنوان بالعربية:</strong> {ad.titleAr || "—"}</div>
              <div className="mb-2"><strong>Category:</strong> {ad.categoryName || "—"}</div>
              <div className="mb-2"><strong>Published:</strong> {ad.isPublished ? "Yes" : "No"}</div>
              <div className="mb-2"><strong>Expiration Date:</strong> {ad.expirationDate ? new Date(ad.expirationDate).toLocaleDateString() : "No expiration"} </div>

              <hr className="my-3" />
              <h5 className="fw-bold mb-2">معلومات العميل</h5>
              <div className="mb-1">الاسم: {ad.clientName || "—"}</div>
              <div className="mb-1">
                الرابط: {ad.clientUrl ? <a href={ad.clientUrl} target="_blank" rel="noreferrer" className="ms-1 d-inline-flex align-items-center"><LinkIcon size={16} className="me-1" />Open</a> : "—"}
              </div>
              <div className="mb-1">{ad.clientWebsite ? <a href={ad.clientWebsite} target="_blank" rel="noreferrer" className="d-inline-flex align-items-center"><Globe size={16} className="me-1" />{ad.clientWebsite}</a> : <>Website: —</>}</div>
              <div className="mb-1"><Mail size={16} className="me-1" />{ad.clientContactEmail || "—"}</div>
              <div className="mb-1"><Phone size={16} className="me-1" />{ad.clientContactPhone || "—"}</div>
              <div className="mb-1"><MapPin size={16} className="me-1" />{ad.clientAddress || "—"}</div>

              <hr className="my-3" />
              <h6 className="fw-bold mb-2">الوصف الطويل</h6>
              <div className="mb-1">{ad.longDescription || "—"}</div>
              <div className="mb-1">{ad.longDescriptionAr || "—"}</div>
            </div>
          ) : (
            <div className="p-3 border rounded">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input className="form-control" value={form.title ?? ""} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Title (AR)</label>
                  <input className="form-control" value={form.titleAr ?? ""} onChange={e => setForm({ ...form, titleAr: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label">Content</label>
                  <textarea className="form-control" rows={3} value={form.content ?? ""} onChange={e => setForm({ ...form, content: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label">Content (AR)</label>
                  <textarea className="form-control" rows={3} value={form.contentAr ?? ""} onChange={e => setForm({ ...form, contentAr: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Client Name</label>
                  <input className="form-control" value={form.clientName ?? ""} onChange={e => setForm({ ...form, clientName: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Client Link</label>
                  <input className="form-control" value={form.clientUrl ?? ""} onChange={e => setForm({ ...form, clientUrl: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Client Email</label>
                  <input className="form-control" value={form.clientContactEmail ?? ""} onChange={e => setForm({ ...form, clientContactEmail: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Client Phone</label>
                  <input className="form-control" value={form.clientContactPhone ?? ""} onChange={e => setForm({ ...form, clientContactPhone: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Client Website</label>
                  <input className="form-control" value={form.clientWebsite ?? ""} onChange={e => setForm({ ...form, clientWebsite: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Client Address</label>
                  <input className="form-control" value={form.clientAddress ?? ""} onChange={e => setForm({ ...form, clientAddress: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label">Long Description</label>
                  <textarea className="form-control" rows={3} value={form.longDescription ?? ""} onChange={e => setForm({ ...form, longDescription: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label">Long Description (AR)</label>
                  <textarea className="form-control" rows={3} value={form.longDescriptionAr ?? ""} onChange={e => setForm({ ...form, longDescriptionAr: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Expiration Date</label>
                  <input type="date" className="form-control" value={form.expirationDate ?? ""} onChange={e => setForm({ ...form, expirationDate: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Category Id</label>
                  <input type="number" className="form-control" value={form.categoryId ?? 0} onChange={e => setForm({ ...form, categoryId: Number(e.target.value) })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Published</label>
                  <select className="form-select" value={String(form.isPublished ?? false)} onChange={(e) => setForm({ ...form, isPublished: e.target.value === "true" })}>
                    <option value="true">Published</option>
                    <option value="false">Unpublished</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
