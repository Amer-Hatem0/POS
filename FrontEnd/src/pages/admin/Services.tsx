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
  Shield,
  MessageCircle,
  Palette,
  Laptop,
  DollarSign,
  Tags,
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
import { Badge } from "@/components/ui/badge";

// Optional base for serving static files if your API returns relative paths like /uploads/xyz.png
const ASSET_BASE = import.meta.env.VITE_API_BASE_URL1 as string | undefined;

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

type ServiceVM = {
  id: number;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  categoryId: number;
  categoryName?: string;
  iconUrl?: string;
  isVisible: boolean;
  priceFrom?: number | null;
  features?: string[];
  technologies?: string[];
};

export default function Services() {
  const [services, setServices] = useState<ServiceVM[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceVM | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    category: "",
    priceFrom: "",
    features: [] as string[],
    technologies: [] as string[],
    icon: null as File | null,
  });

  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const [validationErrors, setValidationErrors] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    category: "",
    priceFrom: "",
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

  const resetForm = () => {
    setFormData({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      category: "",
      priceFrom: "",
      features: [],
      technologies: [],
      icon: null,
    });
    setFeatureInput("");
    setTechInput("");
    setValidationErrors({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      category: "",
      priceFrom: "",
    });
  };

  const handleAddService = () => {
    setEditingService(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditService = (service: ServiceVM) => {
    setEditingService(service);
    setFormData({
      title: service.title || "",
      titleAr: service.titleAr || "",
      description: service.description || "",
      descriptionAr: service.descriptionAr || "",
      category: String(service.categoryId ?? ""),
      priceFrom: service.priceFrom ? String(service.priceFrom) : "",
      features: service.features || [],
      technologies: service.technologies || [],
      icon: null,
    });
    setFeatureInput("");
    setTechInput("");
    setValidationErrors({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      category: "",
      priceFrom: "",
    });
    setIsDialogOpen(true);
  };

  const pushTag = (value: string, kind: "features" | "technologies") => {
    const v = value.trim();
    if (!v) return;
    setFormData((p) => ({
      ...p,
      [kind]: Array.from(new Set([...(p as any)[kind], v])),
    }) as any);
    if (kind === "features") setFeatureInput("");
    else setTechInput("");
  };

  const removeTag = (value: string, kind: "features" | "technologies") => {
    setFormData((p) => ({
      ...p,
      [kind]: (p as any)[kind].filter((x: string) => x !== value),
    }) as any);
  };

  const validate = () => {
    const errs = {
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      category: "",
      priceFrom: "",
    };
    let bad = false;

    if (!formData.title) (errs.title = "Service title (EN) is required."), (bad = true);
    if (!formData.titleAr) (errs.titleAr = "Service title (AR) is required."), (bad = true);
    if (!formData.description) (errs.description = "Description (EN) is required."), (bad = true);
    if (!formData.descriptionAr) (errs.descriptionAr = "Description (AR) is required."), (bad = true);
    if (!formData.category) (errs.category = "Category is required."), (bad = true);

    if (formData.priceFrom && isNaN(Number(formData.priceFrom))) {
      errs.priceFrom = "Price must be a number.";
      bad = true;
    }

    setValidationErrors(errs);
    return !bad;
  };

  const handleSaveService = async () => {
    if (!validate()) {
      toast({
        variant: "destructive",
        title: "Input Error",
        description: "Please fill in all required fields correctly.",
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
    if (formData.priceFrom) data.append("priceFrom", formData.priceFrom);
    formData.features.forEach((f) => data.append("features", f));
    formData.technologies.forEach((t) => data.append("technologies", t));
    if (formData.icon) data.append("icon", formData.icon);

    try {
      if (editingService) {
        const res = await api.put(`/service/${editingService.id}`, data);
        toast({
          title: "Update Successful",
          description: "Service details have been updated.",
          duration: 3000,
        });
        // if API returns updated item, optimistic replace
        if (res?.data?.id) {
          setServices((prev) =>
            prev.map((s) => (s.id === res.data.id ? res.data : s))
          );
        } else {
          fetchServices();
        }
      } else {
        const res = await api.post("/service", data);
        toast({
          title: "Service Added",
          description: "A new service has been successfully created.",
          duration: 3000,
        });
        if (res?.data?.id) setServices((p) => [res.data, ...p]);
        else fetchServices();
      }
      setIsDialogOpen(false);
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
      setServices((p) => p.filter((s) => s.id !== id));
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

  const getServiceIcon = (title: string, titleAr: string | null | undefined) => {
    const combinedTitle = `${title?.toLowerCase() || ""} ${titleAr?.toLowerCase() || ""}`;
    if (combinedTitle.includes("تطوير") || combinedTitle.includes("development")) return serviceIcons.Code;
    if (combinedTitle.includes("ويب") || combinedTitle.includes("web") || combinedTitle.includes("موقع")) return serviceIcons.Laptop;
    if (combinedTitle.includes("تصميم") || combinedTitle.includes("design")) return serviceIcons.Palette;
    if (combinedTitle.includes("سحابة") || combinedTitle.includes("cloud")) return serviceIcons.Cloud;
    if (combinedTitle.includes("بيانات") || combinedTitle.includes("database")) return serviceIcons.Database;
    if (combinedTitle.includes("أمان") || combinedTitle.includes("security")) return serviceIcons.Shield;
    if (combinedTitle.includes("استضافة") || combinedTitle.includes("hosting")) return serviceIcons.Server;
    if (combinedTitle.includes("دعم") || combinedTitle.includes("support")) return serviceIcons.MessageCircle;
    return serviceIcons.Monitor;
  };

  const iconSrc = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (ASSET_BASE && url.startsWith("/")) return `${ASSET_BASE}${url}`;
    return url;
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
              <DialogDescription>Please enter the service details in both English and Arabic.</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <Label htmlFor="title">Title (English)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    setValidationErrors((v) => ({ ...v, title: "" }));
                  }}
                  className={validationErrors.title ? "border-red-500" : ""}
                />
                {validationErrors.title && <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>}
              </div>

              <div className="md:col-span-1">
                <Label htmlFor="titleAr">Title (Arabic)</Label>
                <Input
                  id="titleAr"
                  dir="rtl"
                  value={formData.titleAr}
                  onChange={(e) => {
                    setFormData({ ...formData, titleAr: e.target.value });
                    setValidationErrors((v) => ({ ...v, titleAr: "" }));
                  }}
                  className={validationErrors.titleAr ? "border-red-500" : ""}
                />
                {validationErrors.titleAr && <p className="text-red-500 text-sm mt-1">{validationErrors.titleAr}</p>}
              </div>

              <div className="md:col-span-1">
                <Label htmlFor="description">Description (English)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    setValidationErrors((v) => ({ ...v, description: "" }));
                  }}
                  className={validationErrors.description ? "border-red-500" : ""}
                />
                {validationErrors.description && <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>}
              </div>

              <div className="md:col-span-1">
                <Label htmlFor="descriptionAr">Description (Arabic)</Label>
                <Textarea
                  id="descriptionAr"
                  dir="rtl"
                  value={formData.descriptionAr}
                  onChange={(e) => {
                    setFormData({ ...formData, descriptionAr: e.target.value });
                    setValidationErrors((v) => ({ ...v, descriptionAr: "" }));
                  }}
                  className={validationErrors.descriptionAr ? "border-red-500" : ""}
                />
                {validationErrors.descriptionAr && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.descriptionAr}</p>
                )}
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    setFormData({ ...formData, category: value });
                    setValidationErrors((v) => ({ ...v, category: "" }));
                  }}
                >
                  <SelectTrigger className={validationErrors.category ? "border-red-500" : ""}>
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
                {validationErrors.category && <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>}
              </div>

              <div>
                <Label htmlFor="priceFrom">Starting Price (USD)</Label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 opacity-70" />
                  <Input
                    id="priceFrom"
                    placeholder="e.g. 2000"
                    value={formData.priceFrom}
                    onChange={(e) => {
                      setFormData({ ...formData, priceFrom: e.target.value });
                      setValidationErrors((v) => ({ ...v, priceFrom: "" }));
                    }}
                    className={validationErrors.priceFrom ? "border-red-500" : ""}
                  />
                </div>
                {validationErrors.priceFrom && <p className="text-red-500 text-sm mt-1">{validationErrors.priceFrom}</p>}
              </div>

              <div className="md:col-span-1">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature and press Enter"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        pushTag(featureInput, "features");
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={() => pushTag(featureInput, "features")}>
                    <Tags className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((f) => (
                    <Badge key={f} variant="secondary" className="cursor-pointer" onClick={() => removeTag(f, "features")}>
                      {f} ✕
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="md:col-span-1">
                <Label>Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a technology and press Enter"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        pushTag(techInput, "technologies");
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={() => pushTag(techInput, "technologies")}>
                    <Tags className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((t) => (
                    <Badge key={t} variant="secondary" className="cursor-pointer" onClick={() => removeTag(t, "technologies")}>
                      {t} ✕
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="icon">Upload Icon</Label>
                <Input
                  id="icon"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, icon: e.target.files?.[0] || null })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveService}>{editingService ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = getServiceIcon(service.title, service.titleAr);
          return (
            <Card
              key={service.id}
              className={`card-gradient card-hover relative ${
                !service.isVisible ? "opacity-60" : ""
              }`}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      {service.iconUrl ? (
                        <img src={iconSrc(service.iconUrl)} alt="icon" className="w-6 h-6 object-contain" />
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
                        <span className="text-sm font-bold text-primary">{service.categoryName}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            service.isVisible ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
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
                {service.priceFrom ? (
                  <div className="flex items-center gap-2 text-base font-semibold">
                    <DollarSign className="w-4 h-4" />
                    Starting from ${service.priceFrom}
                  </div>
                ) : null}

                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                  {service.descriptionAr && (
                    <p dir="rtl" className="text-sm mt-1 text-gray-500">
                      {service.descriptionAr}
                    </p>
                  )}
                </CardDescription>

                {service.features && service.features.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Key Features</div>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <Badge key={f} variant="outline">
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {service.technologies && service.technologies.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Technologies</div>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

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
                      service.isVisible ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"
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
                          This action cannot be undone. This will permanently delete the service{" "}
                          <span className="font-bold">"{service.title}"</span>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteService(service.id)}>Delete</AlertDialogAction>
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
