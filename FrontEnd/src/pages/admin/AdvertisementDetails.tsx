import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL1;

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'list', 'bullet', 'ordered',
  'link', 'image', 'video',
  'color', 'background',
  'align'
];

export default function AdvertisementDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<any>({});
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newMediaFiles, setNewMediaFiles] = useState<FileList | null>(null);

  useEffect(() => {
    api.get(`/Advertisement/${id}`)
      .then(res => {
        setAd(res.data);
        setForm(res.data);
      })
      .catch(() => console.error("Failed to fetch ad details"));
  }, [id]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("Title", form.title);
      formData.append("TitleAr", form.titleAr || "");
      formData.append("Content", form.content);
      formData.append("ContentAr", form.contentAr || "");
      formData.append("IsPublished", form.isPublished);
      formData.append("CategoryId", form.categoryId);
      if (form.expirationDate) {
        formData.append("ExpirationDate", form.expirationDate);
      }

      if (newImageFile) {
        formData.append("Image", newImageFile);
      }

      if (newMediaFiles) {
        for (let i = 0; i < newMediaFiles.length; i++) {
          formData.append("MediaFiles", newMediaFiles[i]);
        }
      }

      await api.put(`/Advertisement/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const res = await api.get(`/Advertisement/${id}`);
      setAd(res.data);
      setForm(res.data);
      setIsEditing(false);
      setNewImageFile(null);
      setNewMediaFiles(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!ad) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        {isEditing ? (
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="text-3xl font-bold"
          />
        ) : (
          <h1 className="text-3xl font-bold">{ad.title}</h1>
        )}
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 md:w-1/2">
          {ad.imageUrl && (
            <div className="mb-4">
              <img
                src={`${BASE_URL}${ad.imageUrl}`}
                alt="Ad main image"
                className="rounded-lg w-full max-h-[500px] object-cover border"
              />
            </div>
          )}

          {ad.mediaUrls && ad.mediaUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ad.mediaUrls.map((url: string, i: number) =>
                url.includes(".mp4") ? (
                  <video key={i} controls src={`${BASE_URL}${url}`} className="rounded-lg w-full h-32 object-cover" />
                ) : (
                  <img key={i} src={`${BASE_URL}${url}`} className="rounded-lg w-full h-32 object-cover" alt={`media-${i}`} />
                )
              )}
            </div>
          )}
        </div>

        <div className="flex-1 md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold">الوصف (العربي والإنجليزي)</h2>

          {isEditing ? (
            <>
              <Label>الوصف (إنجليزي)</Label>
              <ReactQuill
                theme="snow"
                value={form.content}
                onChange={(value) => setForm({ ...form, content: value })}
                modules={modules}
                formats={formats}
                className="h-40 mb-4"
              />
              <Label>الوصف (عربي)</Label>
              <ReactQuill
                theme="snow"
                value={form.contentAr || ""}
                onChange={(value) => setForm({ ...form, contentAr: value })}
                modules={modules}
                formats={formats}
                className="h-40 mb-4"
              />
            </>
          ) : (
            <>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: ad.content }} />
              <div className="text-gray-700 border-t pt-4 mt-4" dangerouslySetInnerHTML={{ __html: ad.contentAr }} />
            </>
          )}

          <div>
            <Label>العنوان بالعربية:</Label>
            {isEditing ? (
              <Input
                value={form.titleAr || ""}
                onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
              />
            ) : (
              <p className="font-semibold text-right">{ad.titleAr}</p>
            )}
          </div>

          <div>
            <Label>Category:</Label>
            <p>{ad.categoryName || "N/A"}</p>
          </div>

          <div className="flex items-center gap-2">
            <Label>Published:</Label>
            {isEditing ? (
              <Switch
                checked={form.isPublished}
                onCheckedChange={(val) => setForm({ ...form, isPublished: val })}
              />
            ) : (
              <span>{ad.isPublished ? "Yes" : "No"}</span>
            )}
          </div>

          <div>
            <Label>Expiration Date:</Label>
            {isEditing ? (
              <Input
                type="date"
                value={form.expirationDate?.substring(0, 10) || ""}
                onChange={(e) => setForm({ ...form, expirationDate: e.target.value })}
              />
            ) : (
              <p>{ad.expirationDate ? new Date(ad.expirationDate).toLocaleDateString('en-CA') : "No expiration"}</p>
            )}
          </div>

          {isEditing && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="main-image">Update Main Image:</Label>
                <Input
                  id="main-image"
                  type="file"
                  className="mt-2"
                  onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                />
              </div>
              <div>
                <Label htmlFor="media-files">Add More Media:</Label>
                <Input
                  id="media-files"
                  type="file"
                  multiple
                  className="mt-2"
                  onChange={(e) => setNewMediaFiles(e.target.files)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
