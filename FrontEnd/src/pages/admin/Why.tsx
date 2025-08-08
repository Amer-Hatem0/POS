import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WhyChooseUsAdmin = () => {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    api.get("/WhyChooseUs")
      .then(res => setData(res.data))
      .catch(() => toast({ title: "Error", description: "Failed to load data.", variant: "destructive" }));
  }, []);

  const handleChange = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  const handleBulletChange = (lang, index, value) => {
    const key = lang === "en" ? "bulletPointsEn" : "bulletPointsAr";
    const updated = [...data[key]];
    updated[index] = value;
    setData(prev => ({ ...prev, [key]: updated }));
  };

  const addBulletPoint = lang => {
    const key = lang === "en" ? "bulletPointsEn" : "bulletPointsAr";
    setData(prev => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const removeBulletPoint = (lang, index) => {
    const key = lang === "en" ? "bulletPointsEn" : "bulletPointsAr";
    const updated = [...data[key]];
    updated.splice(index, 1);
    setData(prev => ({ ...prev, [key]: updated }));
  };

  const handleImageChange = e => setData(prev => ({ ...prev, image: e.target.files?.[0] }));

  const handleSave = async () => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(key, v));
      } else if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });

    await api.put("/WhyChooseUs", formData)
      .then(() => {
        toast({ title: "Success", description: "Section updated successfully." });
        setIsEditing(false);
      })
      .catch(() => toast({ title: "Error", description: "Update failed.", variant: "destructive" }));
  };

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Why Choose Us - Admin</h2>
        {isEditing ? (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => window.location.reload()}>Cancel</Button>
            <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}><Edit className="w-4 h-4 mr-2" /> Edit</Button>
        )}
      </div>

      {/* English Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Main Title (EN)</Label>
          <Input disabled={!isEditing} value={data.mainTitleEn} onChange={e => handleChange("mainTitleEn", e.target.value)} />

          <Label className="mt-2">Subtitle (EN)</Label>
          <Textarea disabled={!isEditing} value={data.subtitleEn} onChange={e => handleChange("subtitleEn", e.target.value)} />

          <Label className="mt-2">Highlight Title (EN)</Label>
          <Input disabled={!isEditing} value={data.highlightTitleEn} onChange={e => handleChange("highlightTitleEn", e.target.value)} />

          <Label className="mt-2">Highlight Description (EN)</Label>
          <Textarea disabled={!isEditing} value={data.highlightDescriptionEn} onChange={e => handleChange("highlightDescriptionEn", e.target.value)} />

          <Label className="mt-2">Bullet Points (EN)</Label>
          {data.bulletPointsEn.map((point, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <Input disabled={!isEditing} value={point} onChange={e => handleBulletChange("en", idx, e.target.value)} />
              {isEditing && <Button variant="destructive" onClick={() => removeBulletPoint("en", idx)}>X</Button>}
            </div>
          ))}
          {isEditing && <Button variant="outline" onClick={() => addBulletPoint("en")}>+ Add</Button>}
        </div>

        {/* Arabic Section */}
        <div dir="rtl">
          <Label>العنوان الرئيسي</Label>
          <Input disabled={!isEditing} value={data.mainTitleAr} onChange={e => handleChange("mainTitleAr", e.target.value)} className="text-right" />

          <Label className="mt-2">الوصف الفرعي</Label>
          <Textarea disabled={!isEditing} value={data.subtitleAr} onChange={e => handleChange("subtitleAr", e.target.value)} className="text-right" />

          <Label className="mt-2">عنوان مميز</Label>
          <Input disabled={!isEditing} value={data.highlightTitleAr} onChange={e => handleChange("highlightTitleAr", e.target.value)} className="text-right" />

          <Label className="mt-2">وصف مميز</Label>
          <Textarea disabled={!isEditing} value={data.highlightDescriptionAr} onChange={e => handleChange("highlightDescriptionAr", e.target.value)} className="text-right" />

          <Label className="mt-2">النقاط</Label>
          {data.bulletPointsAr.map((point, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <Input disabled={!isEditing} value={point} onChange={e => handleBulletChange("ar", idx, e.target.value)} className="text-right" />
              {isEditing && <Button variant="destructive" onClick={() => removeBulletPoint("ar", idx)}>X</Button>}
            </div>
          ))}
          {isEditing && <Button variant="outline" onClick={() => addBulletPoint("ar")}>+ إضافة</Button>}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <Label className="mt-4">Image</Label>
        {isEditing ? (
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        ) : (
          data.imageUrl && <img src={data.imageUrl} alt="Section" className="w-48 mt-2 rounded" />
        )}
      </div>
    </div>
  );
};

export default WhyChooseUsAdmin;
