import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AboutAdmin() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await api.get("/AboutSection");
        const data = {
          ...res.data,
          servicesEn: res.data.servicesEn || [],
          servicesAr: res.data.servicesAr || [],
        };
        setAboutData(data);
      } catch (error) {
        console.error("Failed to load About section:", error);
        toast({
          title: "Error",
          description: "Failed to load About section.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, [toast]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("titleEn", aboutData.titleEn);
      formData.append("titleAr", aboutData.titleAr);
      formData.append("descriptionEn", aboutData.descriptionEn);
      formData.append("descriptionAr", aboutData.descriptionAr);
      aboutData.servicesEn.forEach((item: string) => formData.append("servicesEn", item));
      aboutData.servicesAr.forEach((item: string) => formData.append("servicesAr", item));
      formData.append("yearsOfExperience", aboutData.yearsOfExperience);
      if (aboutData.mainImage) formData.append("mainImage", aboutData.mainImage);
      if (aboutData.smallImage) formData.append("smallImage", aboutData.smallImage);

      await api.put("/AboutSection", formData);
      toast({ title: "Success", description: "About section updated successfully." });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update About section:", error);
      toast({
        title: "Update Failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const updateField = (field: string, value: string) => {
    setAboutData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateService = (lang: "En" | "Ar", index: number, value: string) => {
    const key = `services${lang}`;
    const services = [...aboutData[key]];
    services[index] = value;
    setAboutData({ ...aboutData, [key]: services });
  };

  const addService = (lang: "En" | "Ar") => {
    const key = `services${lang}`;
    const updated = [...aboutData[key], ""];
    setAboutData({ ...aboutData, [key]: updated });
  };

  const removeService = (lang: "En" | "Ar", index: number) => {
    const key = `services${lang}`;
    const updated = [...aboutData[key]];
    updated.splice(index, 1);
    setAboutData({ ...aboutData, [key]: updated });
  };

  if (loading || !aboutData) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">About Section</h2>
        {isEditing ? (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => window.location.reload()}>Cancel</Button>
            <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}><Edit className="w-4 h-4 mr-2" /> Edit</Button>
        )}
      </div>

      <Card>
        <CardHeader><CardTitle>English</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Label>Title</Label>
          {isEditing ? <Input value={aboutData.titleEn} onChange={(e) => updateField("titleEn", e.target.value)} /> : <p>{aboutData.titleEn}</p>}

          <Label>Description</Label>
          {isEditing ? <Textarea value={aboutData.descriptionEn} onChange={(e) => updateField("descriptionEn", e.target.value)} /> : <p>{aboutData.descriptionEn}</p>}

          <Label>Services</Label>
          {aboutData.servicesEn.map((s: string, i: number) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <Input value={s} onChange={(e) => updateService("En", i, e.target.value)} disabled={!isEditing} />
              {isEditing && <Button variant="destructive" onClick={() => removeService("En", i)}>Delete</Button>}
            </div>
          ))}
          {isEditing && <Button variant="outline" onClick={() => addService("En")}>+ Add Service</Button>}

          {isEditing && (
            <>
              <Label>Main Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setAboutData((prev: any) => ({ ...prev, mainImage: e.target.files?.[0] }))} />
              {aboutData.mainImageUrl && <img src={aboutData.mainImageUrl} className="mt-2 w-32 rounded" alt="Main" />}

              <Label>Small Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setAboutData((prev: any) => ({ ...prev, smallImage: e.target.files?.[0] }))} />
              {aboutData.smallImageUrl && <img src={aboutData.smallImageUrl} className="mt-2 w-20 rounded" alt="Small" />}
            </>
          )}

          <Label>Years of Experience</Label>
          {isEditing ? (
            <Input type="number" value={aboutData.yearsOfExperience} onChange={(e) => updateField("yearsOfExperience", e.target.value)} className="w-32" />
          ) : (
            <p className="text-muted-foreground">{aboutData.yearsOfExperience}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>العربية</CardTitle></CardHeader>
        <CardContent className="space-y-4" dir="rtl">
          <Label>العنوان</Label>
          {isEditing ? <Input value={aboutData.titleAr} onChange={(e) => updateField("titleAr", e.target.value)} className="text-right" /> : <p className="text-right">{aboutData.titleAr}</p>}

          <Label>الوصف</Label>
          {isEditing ? <Textarea value={aboutData.descriptionAr} onChange={(e) => updateField("descriptionAr", e.target.value)} className="text-right" /> : <p className="text-right">{aboutData.descriptionAr}</p>}

          <Label>الخدمات</Label>
          {aboutData.servicesAr.map((s: string, i: number) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <Input value={s} onChange={(e) => updateService("Ar", i, e.target.value)} className="text-right" disabled={!isEditing} />
              {isEditing && <Button variant="destructive" onClick={() => removeService("Ar", i)}>حذف</Button>}
            </div>
          ))}
          {isEditing && <Button variant="outline" onClick={() => addService("Ar")}>+ إضافة خدمة</Button>}
        </CardContent>
      </Card>
    </div>
  );
}
