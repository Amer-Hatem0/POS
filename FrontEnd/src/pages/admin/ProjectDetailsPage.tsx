import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/project/${id}`);
      setProject(res.data);
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Project not found" });
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch categories" });
    }
  };

  useEffect(() => {
    fetchProject();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProject((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: any) => {
    setImages(Array.from(e.target.files));
  };
  
  const handleUpdate = async () => {
    try {
      const data = new FormData();
      
      // نرسل البيانات اللي تم تعديلها فقط
      const initialProject = await api.get(`/project/${id}`).then(res => res.data);
      Object.keys(project).forEach(key => {
        if (project[key] !== initialProject[key]) {
          // التعامل مع الـ `List<string>`
          if (Array.isArray(project[key])) {
            data.append(key, project[key].join(","));
          } else {
            data.append(key, project[key]);
          }
        }
      });

      // إرسال الصور الجديدة
      if (images.length > 0) {
        images.forEach(img => {
          data.append("images", img);
        });
      }

      await api.patch(`/project/${project.id}`, data);
      toast({ title: "Updated", description: "Project updated successfully." });
      setEditMode(false);
      fetchProject();
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Update failed" });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/project/${id}`);
      toast({ title: "Deleted", description: "Project deleted successfully." });
      navigate("/admin/projects");
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Delete failed" });
    }
  };

  if (!project) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.imageUrls && project.imageUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {project.imageUrls.map((url: string, index: number) => (
                <img
                  key={index}
                  src={`${API_BASE_URL}${url}`}
                  alt={`Project image ${index + 1}`}
                  className="w-full h-48 object-cover rounded"
                />
              ))}
            </div>
          )}

          {editMode ? (
            <div className="space-y-3">
              <Input name="title" value={project.title} onChange={handleInputChange} placeholder="Title" />
              <Input name="titleAr" value={project.titleAr} onChange={handleInputChange} placeholder="Title (Arabic)" />
              <Textarea name="description" value={project.description} onChange={handleInputChange} placeholder="Description" />
              <Textarea name="descriptionAr" value={project.descriptionAr} onChange={handleInputChange} placeholder="Description (Arabic)" />
              <Input name="client" value={project.client} onChange={handleInputChange} placeholder="Client" />
              <Input name="duration" value={project.duration} onChange={handleInputChange} placeholder="Duration" />
              <Input
                name="technologies"
                value={(project.technologies || []).join(",")}
                onChange={(e) => setProject({ ...project, technologies: e.target.value.split(',') })}
                placeholder="Technologies (comma-separated)"
              />
              <Input
                name="features"
                value={(project.features || []).join(",")}
                onChange={(e) => setProject({ ...project, features: e.target.value.split(',') })}
                placeholder="Features (comma-separated)"
              />
              <Input name="liveDemoUrl" value={project.liveDemoUrl} onChange={handleInputChange} placeholder="Live Demo URL" />
              <Input name="sourceCodeUrl" value={project.sourceCodeUrl} onChange={handleInputChange} placeholder="Source Code URL" />

              <div>
                <label>Update Images</label>
                <Input type="file" multiple onChange={handleImageChange} />
              </div>

              <div className="flex gap-4 mt-4">
                <Button onClick={handleUpdate}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-muted-foreground">
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Description (Arabic):</strong> {project.descriptionAr}</p>
              <p><strong>Client:</strong> {project.client}</p>
              <p><strong>Duration:</strong> {project.duration}</p>
              <p><strong>Technologies:</strong> {(project.technologies || []).join(', ')}</p>
              <p><strong>Features:</strong> {(project.features || []).join(', ')}</p>
              {project.liveDemoUrl && <p><a href={project.liveDemoUrl} target="_blank" className="text-blue-600 underline">Live Demo</a></p>}
              {project.sourceCodeUrl && <p><a href={project.sourceCodeUrl} target="_blank" className="text-blue-600 underline">Source Code</a></p>}
            </div>
          )}

          {!editMode && (
            <div className="flex gap-4 mt-6">
              <Button onClick={() => setEditMode(true)}>Edit</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}