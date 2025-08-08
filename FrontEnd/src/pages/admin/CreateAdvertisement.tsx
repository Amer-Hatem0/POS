// ✅ AdvertisementManager.tsx with Arabic Support (titleAr, contentAr)

import { useEffect, useState } from "react";
import { Trash2, Plus, Save, X, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

const BASE_URL = import.meta.env.VITE_API_BASE_URL1;

export default function AdvertisementManager() {
  const [ads, setAds] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    titleAr: "",
    content: "",
    contentAr: "",
    isPublished: true,
    expirationDate: "",
    image: null,
    mediaFiles: [] as File[],
    categoryId: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchData = async () => {
    const res1 = await api.get("/Advertisement");
    const res2 = await api.get("/Category");
    setAds(res1.data);
    setCategories(res2.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("titleAr", formData.titleAr);
    data.append("content", formData.content);
    data.append("contentAr", formData.contentAr);
    data.append("isPublished", String(formData.isPublished));
    if (formData.expirationDate) data.append("expirationDate", formData.expirationDate);
    if (formData.image) data.append("image", formData.image);
    if (formData.categoryId) data.append("categoryId", formData.categoryId);
    formData.mediaFiles.forEach(file => data.append("mediaFiles", file));

    try {
      await api.post("/Advertisement", data);
      toast({ title: "Created", description: "Ad added." });
      setFormData({
        title: "", titleAr: "", content: "", contentAr: "",
        isPublished: true, expirationDate: "",
        image: null, mediaFiles: [], categoryId: ""
      });
      setOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Failed to create ad.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this ad?")) return;
    await api.delete(`/Advertisement/${id}`);
    fetchData();
    toast({ title: "Deleted" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Advertisement Management</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Advertisement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map(ad => (
          <Card key={ad.id}>
            {ad.imageUrl && <img src={`${BASE_URL}${ad.imageUrl}`} alt="cover" className="h-48 w-full object-cover" />}
            <CardHeader>
              <CardTitle>{ad.title}<div className="text-sm text-muted-foreground">{ad.titleAr}</div></CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">{ad.content}<br /><span className="text-xs text-muted-foreground">{ad.contentAr}</span></div>
              <p className="text-xs">Published: <span className={ad.isPublished ? "text-green-600" : "text-red-600"}>{ad.isPublished ? "Yes" : "No"}</span></p>
              <div className="flex justify-between pt-2">
                <Button size="sm" onClick={() => navigate(`/admin/advertisements/${ad.id}`)}>
                  <Eye className="w-4 h-4 mr-1" /> View
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(ad.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Advertisement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title (EN)</Label>
              <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
              <Label>Title (AR)</Label>
              <Input value={formData.titleAr} onChange={e => setFormData({ ...formData, titleAr: e.target.value })} />
            </div>
            <div>
              <Label>Content (EN)</Label>
              <Textarea rows={3} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
              <Label>Content (AR)</Label>
              <Textarea rows={3} value={formData.contentAr} onChange={e => setFormData({ ...formData, contentAr: e.target.value })} />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={formData.categoryId} onValueChange={val => setFormData({ ...formData, categoryId: val })}>
                <SelectTrigger><SelectValue placeholder="Choose category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={e => setFormData({ ...formData, image: e.target.files?.[0] || null })} />
            </div>
            <div>
              <Label>Media Files</Label>
              <Input type="file" accept="image/*,video/*" multiple onChange={e => setFormData({ ...formData, mediaFiles: Array.from(e.target.files || []) })} />
            </div>
            <div>
              <Label>Expiration Date</Label>
              <Input type="date" value={formData.expirationDate} onChange={e => setFormData({ ...formData, expirationDate: e.target.value })} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}><X className="mr-2" /> Cancel</Button>
              <Button type="submit"><Save className="mr-2" /> Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
