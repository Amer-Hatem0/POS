 
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Plus,
  Edit,
  Trash2,
  Settings,
  Monitor,
  Code,
  Server,
  Cloud,
  Database,
  Layout,
  Shield,
  MessageCircle,
  Palette,
  Laptop,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

// Service icons mapping
const serviceIcons = {
  Code,
  Laptop,
  Palette,
  Cloud,
  Database,
  Shield,
  Server,
  MessageCircle,
  Monitor,
};

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    category: "",
    icon: null as File | null,
  });
  // New state for validation errors
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    category: "",
  });
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      const res = await api.get("/service");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const handleAddService = () => {
    setEditingService(null);
    setFormData({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      category: "",
      icon: null,
    });
    setValidationErrors({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      category: "",
    }); // Reset errors
    setIsDialogOpen(true);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      titleAr: service.titleAr || "",
      description: service.description,
      descriptionAr: service.descriptionAr || "",
      category: String(service.category?.id ?? service.categoryId ?? ""),
      icon: null,
    });
    setValidationErrors({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      category: "",
    }); // Reset errors
    setIsDialogOpen(true);
  };

  const handleSaveService = async () => {
    const newErrors = {
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      category: "",
    };
    let hasError = false;

    if (!formData.title) {
      newErrors.title = "Service title (EN) is required.";
      hasError = true;
    }
    if (!formData.titleAr) {
      newErrors.titleAr = "Service title (AR) is required.";
      hasError = true;
    }
    if (!formData.description) {
      newErrors.description = "Service description (EN) is required.";
      hasError = true;
    }
    if (!formData.descriptionAr) {
      newErrors.descriptionAr = "Service description (AR) is required.";
      hasError = true;
    }
    if (!formData.category) {
      newErrors.category = "Service category is required.";
      hasError = true;
    }

    setValidationErrors(newErrors);

    if (hasError) {
      toast({
        variant: "destructive",
        title: "Input Error",
        description: "Please fill in all required fields.",
        duration: 3000,
      });
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("titleAr", formData.titleAr);
    data.append("description", formData.description);
    data.append("descriptionAr", formData.descriptionAr);
    data.append("categoryId", formData.category);
    if (formData.icon) data.append("icon", formData.icon);

    try {
      if (editingService) {
        await api.put(`/service/${editingService.id}`, data);
        toast({
          title: "Update Successful",
          description: "Service details have been updated.",
          duration: 3000,
        });
      } else {
        await api.post("/service", data);
        toast({
          title: "Service Added",
          description: "A new service has been successfully created.",
          duration: 3000,
        });
      }
      setIsDialogOpen(false);
      fetchServices();
    } catch (error) {
      console.error("Error saving service", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "An error occurred while saving the service. Please try again.",
        duration: 3000,
      });
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      await api.delete(`/service/${id}`);
      fetchServices();
      toast({
        title: "Service Deleted",
        description: "The service has been successfully removed.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Delete failed", error);
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: "An error occurred while deleting the service. Please try again.",
        duration: 3000,
      });
    }
  };

  const toggleServiceStatus = async (id: number) => {
    try {
      await api.put(`/service/toggle/${id}`);
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s))
      );
      toast({
        title: "Status Updated",
        description: "The service visibility has been changed.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to toggle visibility", error);
      toast({
        variant: "destructive",
        title: "Status Update Failed",
        description: "An error occurred while updating the service status.",
        duration: 3000,
      });
    }
  };

  const getServiceIcon = (title: string, titleAr: string | null) => {
    const combinedTitle = `${title.toLowerCase()} ${titleAr?.toLowerCase()}`;
    if (combinedTitle.includes("تطوير") || combinedTitle.includes("development")) {
      return serviceIcons.Code;
    }
    if (
      combinedTitle.includes("ويب") ||
      combinedTitle.includes("web") ||
      combinedTitle.includes("موقع")
    ) {
      return serviceIcons.Laptop;
    }
    if (combinedTitle.includes("تصميم") || combinedTitle.includes("design")) {
      return serviceIcons.Palette;
    }
    if (combinedTitle.includes("سحابة") || combinedTitle.includes("cloud")) {
      return serviceIcons.Cloud;
    }
    if (combinedTitle.includes("بيانات") || combinedTitle.includes("database")) {
      return serviceIcons.Database;
    }
    if (combinedTitle.includes("أمان") || combinedTitle.includes("security")) {
      return serviceIcons.Shield;
    }
    if (combinedTitle.includes("استضافة") || combinedTitle.includes("hosting")) {
      return serviceIcons.Server;
    }
    if (combinedTitle.includes("دعم") || combinedTitle.includes("support")) {
      return serviceIcons.MessageCircle;
    }
    return serviceIcons.Monitor;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="text-primary" />
          Services Management
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddService}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Add New Service"}
              </DialogTitle>
              <DialogDescription>
                Please enter the service details in both English and Arabic.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title (English)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    setValidationErrors({ ...validationErrors, title: "" });
                  }}
                  className={validationErrors.title ? "border-red-500" : ""}
                />
                {validationErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.title}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="titleAr">Title (Arabic)</Label>
                <Input
                  id="titleAr"
                  dir="rtl"
                  value={formData.titleAr}
                  onChange={(e) => {
                    setFormData({ ...formData, titleAr: e.target.value });
                    setValidationErrors({ ...validationErrors, titleAr: "" });
                  }}
                  className={validationErrors.titleAr ? "border-red-500" : ""}
                />
                {validationErrors.titleAr && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.titleAr}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description (English)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    setValidationErrors({
                      ...validationErrors,
                      description: "",
                    });
                  }}
                  className={validationErrors.description ? "border-red-500" : ""}
                />
                {validationErrors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.description}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="descriptionAr">Description (Arabic)</Label>
                <Textarea
                  id="descriptionAr"
                  dir="rtl"
                  value={formData.descriptionAr}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      descriptionAr: e.target.value,
                    });
                    setValidationErrors({
                      ...validationErrors,
                      descriptionAr: "",
                    });
                  }}
                  className={
                    validationErrors.descriptionAr ? "border-red-500" : ""
                  }
                />
                {validationErrors.descriptionAr && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.descriptionAr}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    setFormData({ ...formData, category: value });
                    setValidationErrors({ ...validationErrors, category: "" });
                  }}
                >
                  <SelectTrigger
                    className={validationErrors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.category}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="icon">Upload Icon</Label>
                <Input
                  id="icon"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      icon: e.target.files?.[0] || null,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveService}>
                {editingService ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = getServiceIcon(service.title, service.titleAr);
          return (
            <Card
              key={service.id}
              className={`card-gradient card-hover relative animate-slide-up ${
                !service.isVisible ? "opacity-60" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center animate-float">
                      {service.iconUrl ? (
                        <img src={service.iconUrl} alt="icon" className="w-6 h-6" />
                      ) : (
                        <IconComponent className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      {service.titleAr && (
                        <span dir="rtl" className="block text-gray-500 text-sm">
                          {service.titleAr}
                        </span>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-primary">
                          {service.categoryName}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            service.isVisible
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {service.isVisible ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                  {service.descriptionAr && (
                    <p dir="rtl" className="text-sm mt-1 text-gray-500">
                      {service.descriptionAr}
                    </p>
                  )}
                </CardDescription>
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditService(service)}
                    className="flex-1"
                    disabled={!service.isVisible}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleServiceStatus(service.id)}
                    className={
                      service.isVisible
                        ? "text-orange-600 hover:text-orange-700"
                        : "text-green-600 hover:text-green-700"
                    }
                  >
                    {service.isVisible ? "Deactivate" : "Activate"}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        disabled={!service.isVisible}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the
                          service "<span className="font-bold">{service.title}</span>"
                          and remove its data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteService(service.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}