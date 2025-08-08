import { useEffect, useState } from "react";
import { Plus, Trash2, Folder, Eye, EyeOff } from "lucide-react";
import api from "@/lib/axios";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    categoryId: "",
    images: [],
    isActive: true,
    client: "",
    duration: "",
    technologies: "",
    features: "",
    liveDemoUrl: "",
    sourceCodeUrl: ""
  });
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      const res = await api.get("/project");
      setProjects(res.data);
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch projects." });
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch categories." });
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      categoryId: "",
      images: [],
      isActive: true,
      client: "",
      duration: "",
      technologies: "",
      features: "",
      liveDemoUrl: "",
      sourceCodeUrl: ""
    });
    setIsDialogOpen(true);
  };
  
  const handleSave = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("titleAr", formData.titleAr);
    data.append("description", formData.description);
    data.append("descriptionAr", formData.descriptionAr);
    data.append("categoryId", formData.categoryId);
    data.append("isActive", String(formData.isActive));
    data.append("client", formData.client);
    data.append("duration", formData.duration);
    data.append("technologies", formData.technologies);
    data.append("features", formData.features);
    data.append("liveDemoUrl", formData.liveDemoUrl);
    data.append("sourceCodeUrl", formData.sourceCodeUrl);
    
    // إرسال الصور المتعددة
    formData.images.forEach((img: File) => {
      data.append("images", img);
    });

    try {
      // حاليًا الكود ما بيعمل تعديل من خلال هذه الصفحة.
      // لكن للتوضيح: لو كان فيه تعديل، كان لازم نستخدم HttpPatch
      if (editingProject) {
        // await api.patch(`/project/${editingProject.id}`, data);
        // toast({ title: "Updated", description: "Project updated." });
      } else {
        await api.post("/project", data);
        toast({ title: "Created", description: "New project added." });
      }
      setIsDialogOpen(false);
      fetchProjects();
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save project." });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/project/${id}`);
      fetchProjects();
      toast({ title: "Deleted", description: "Project removed." });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Delete failed" });
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      await api.patch(`/project/toggle-status/${id}`);
      fetchProjects();
      toast({ title: "Status Updated", description: "Project status changed." });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to toggle status" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Folder className="text-primary" /> Project Management
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}><Plus className="mr-2" /> Add Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Project</DialogTitle>
              <DialogDescription>Fill both Arabic and English fields.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Label>Title (EN)</Label>
              <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
              <Label>Title (AR)</Label>
              <Input value={formData.titleAr} onChange={e => setFormData({ ...formData, titleAr: e.target.value })} />
              <Label>Description (EN)</Label>
              <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              <Label>Description (AR)</Label>
              <Textarea value={formData.descriptionAr} onChange={e => setFormData({ ...formData, descriptionAr: e.target.value })} />
              <Label>Client</Label>
              <Input value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} />
              <Label>Duration</Label>
              <Input value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} />
              <Label>Technologies (comma-separated)</Label>
              <Input value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} />
              <Label>Features (comma-separated)</Label>
              <Input value={formData.features} onChange={e => setFormData({ ...formData, features: e.target.value })} />
              <Label>Live Demo URL</Label>
              <Input value={formData.liveDemoUrl} onChange={e => setFormData({ ...formData, liveDemoUrl: e.target.value })} />
              <Label>Source Code URL</Label>
              <Input value={formData.sourceCodeUrl} onChange={e => setFormData({ ...formData, sourceCodeUrl: e.target.value })} />
              <Label>Category</Label>
              <Select value={formData.categoryId} onValueChange={val => setFormData({ ...formData, categoryId: val })}>
                <SelectTrigger><SelectValue placeholder="Choose category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Label>Upload Images</Label>
              <Input type="file" multiple accept="image/*" onChange={e => setFormData({ ...formData, images: Array.from(e.target.files) })} />
              <div className="flex items-center gap-2">
                <Switch checked={formData.isActive} onCheckedChange={(val) => setFormData({ ...formData, isActive: val })} />
                <span>{formData.isActive ? "Active" : "Inactive"}</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <Card key={proj.id} className={!proj.isActive ? "opacity-60" : ""}>
            {proj.imageUrls && proj.imageUrls.length > 0 && (
              <img src={`${API_BASE_URL}${proj.imageUrls[0]}`} alt="Project" className="w-full h-48 object-cover" />
            )}
            <CardHeader>
              <CardTitle>{proj.title} <span className="text-gray-500 block text-sm">{proj.titleAr}</span></CardTitle>
              <CardDescription>{proj.description}<br /><span className="text-xs text-muted-foreground">{proj.descriptionAr}</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Category:</strong> {proj.categoryName}</p>
              <p><strong>Client:</strong> {proj.client}</p>
              <p><strong>Duration:</strong> {proj.duration}</p>
              <p><strong>Status:</strong> {proj.isActive ? "Active" : "Inactive"}</p>
              <p><strong>Technologies:</strong> {(proj.technologies || []).join(', ')}</p>
              <p><strong>Features:</strong> {(proj.features || []).join(', ')}</p>
              {proj.liveDemoUrl && <p><a href={proj.liveDemoUrl} target="_blank" className="text-blue-600 underline">Live Demo</a></p>}
              {proj.sourceCodeUrl && <p><a href={proj.sourceCodeUrl} target="_blank" className="text-blue-600 underline">Source Code</a></p>}
              <div className="flex gap-2">
                <Button asChild>
                  <Link to={`/admin/projects/${proj.id}`} className="w-full">
                    <div className="w-4 h-4 mr-1" /> View & Edit
                  </Link>
                </Button>
                <Button onClick={() => toggleStatus(proj.id)} size="sm">{proj.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive"><Trash2 className="w-4 h-4" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently delete {proj.title} and all its images.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(proj.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}