import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Mail, Phone, MapPin, Globe,
  Facebook, Twitter, Instagram, Linkedin,
  Save, Edit
} from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [contactData, setContactData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch company contact data from the API
    api.get("/CompanyContact")
      .then(res => {
        const data = res.data;
        // Initialize contactData state with fetched data,
        // providing fallbacks for missing fields and new Arabic fields.
        setContactData({
          business: {
            // Assuming 'name' might also come from API, otherwise use default
            name: data.name || "Creative Digital Agency",
            tagline: data.tagline || "Building tomorrow's digital experiences today",
            taglineAr: data.taglineAr || "", // New Arabic tagline field
            description: data.description || "We specialize in creating innovative digital solutions...",
            descriptionAr: data.descriptionAr || "", // New Arabic description field
            email: data.email || "",
            phone: data.phoneNumber1 || "",
            phone2: data.phoneNumber2 || "",
            address: data.address || "",
            addressAr: data.addressAr || "", // New Arabic address field
            website: data.website || "" // Assuming website might come from API or keep as default
          },
          social: {
            facebook: data.facebookUrl || "",
            twitter: data.twitterUrl || "",
            instagram: data.instagramUrl || "",
            linkedin: data.linkedInUrl || ""
          },
          office: {
            // Office hours and timezone are hardcoded as they were in the original component
            hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
            timezone: "Eastern Standard Time (EST)"
          }
        });
      })
      .catch(() => {
        // Display an error toast if data fetching fails
        toast({
          title: "Error",
          description: "Could not load contact info.",
          variant: "destructive"
        });
      })
      .finally(() => setLoading(false)); // Set loading to false after fetch attempt
  }, []);

  // Handles saving the updated contact data to the API
  const handleSave = () => {
    // Construct the DTO (Data Transfer Object) with all fields, including new Arabic ones
    const dto = {
      phoneNumber1: contactData.business.phone,
      phoneNumber2: contactData.business.phone2,
      email: contactData.business.email,
      address: contactData.business.address,
      addressAr: contactData.business.addressAr, // Include Arabic address
      description: contactData.business.description, // Include English description
      descriptionAr: contactData.business.descriptionAr, // Include Arabic description
      tagline: contactData.business.tagline, // Include English tagline
      taglineAr: contactData.business.taglineAr, // Include Arabic tagline
      facebookUrl: contactData.social.facebook,
      instagramUrl: contactData.social.instagram,
      linkedInUrl: contactData.social.linkedin,
      twitterUrl: contactData.social.twitter,
      whatsAppNumber: contactData.business.whatsAppNumber || "" // Assuming whatsAppNumber might exist
    };

    // Send a PUT request to update the company contact data
    api.put("/CompanyContact", dto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` // Include authorization token
      }
    })
      .then(() => {
        // Display success toast and exit editing mode
        toast({
          title: "Success",
          description: "Contact details updated successfully."
        });
        setIsEditing(false);
      })
      .catch(() => {
        // Display error toast if update fails
        toast({
          title: "Update Failed",
          description: "Something went wrong.",
          variant: "destructive"
        });
      });
  };

  // Handles canceling edits by reloading the page
  const handleCancel = () => {
    window.location.reload();
  };

  // Generic function to update business-related state fields
  const updateBusinessData = (field: string, value: string) => {
    setContactData((prev: any) => ({
      ...prev,
      business: {
        ...prev.business,
        [field]: value
      }
    }));
  };

  // Generic function to update social media-related state fields
  const updateSocialData = (field: string, value: string) => {
    setContactData((prev: any) => ({
      ...prev,
      social: {
        ...prev.social,
        [field]: value
      }
    }));
  };

  // Generic function to update office-related state fields (though only hours/timezone are here)
  const updateOfficeData = (field: string, value: string) => {
    setContactData((prev: any) => ({
      ...prev,
      office: {
        ...prev.office,
        [field]: value
      }
    }));
  };

  // Display loading message while data is being fetched
  if (loading || !contactData) {
    return <div className="p-6 text-center text-lg text-muted-foreground">Loading contact information...</div>;
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header section with title and action buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center animate-pulse-glow">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
            Contact Information
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your business contact details and social media presence
          </p>
        </div>
        <div className="flex gap-2">
          {/* Conditional rendering for Save/Cancel or Edit buttons */}
          {isEditing ? (
            <>
              <Button variant="outline" className="" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave} className="">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="">
              <Edit className="w-4 h-4 mr-2" />
              Edit Information
            </Button>
          )}
        </div>
      </div>

      {/* Main content grid for business, social, and office information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information Card */}
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Business Information
            </CardTitle>
            <CardDescription>Core business details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Business Name */}
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              {isEditing ? (
                <Input id="businessName" value={contactData.business.name} onChange={(e) => updateBusinessData('name', e.target.value)} />
              ) : <p className="text-foreground font-medium">{contactData.business.name}</p>}
            </div>

            {/* English Tagline */}
            <div>
              <Label htmlFor="tagline">Tagline (English)</Label>
              {isEditing ? (
                <Input id="tagline" value={contactData.business.tagline} onChange={(e) => updateBusinessData('tagline', e.target.value)} />
              ) : <p className="text-muted-foreground italic">{contactData.business.tagline}</p>}
            </div>

            {/* Arabic Tagline */}
            <div>
              <Label htmlFor="taglineAr">Tagline (Arabic)</Label>
              {isEditing ? (
                <Input id="taglineAr" value={contactData.business.taglineAr} onChange={(e) => updateBusinessData('taglineAr', e.target.value)} dir="rtl" className="text-right" />
              ) : <p className="text-muted-foreground italic text-right" dir="rtl">{contactData.business.taglineAr}</p>}
            </div>

            {/* English Description */}
            <div>
              <Label htmlFor="description">Description (English)</Label>
              {isEditing ? (
                <Textarea id="description" value={contactData.business.description} onChange={(e) => updateBusinessData('description', e.target.value)} rows={3} />
              ) : <p className="text-foreground">{contactData.business.description}</p>}
            </div>

            {/* Arabic Description */}
            <div>
              <Label htmlFor="descriptionAr">Description (Arabic)</Label>
              {isEditing ? (
                <Textarea id="descriptionAr" value={contactData.business.descriptionAr} onChange={(e) => updateBusinessData('descriptionAr', e.target.value)} rows={3} dir="rtl" className="text-right" />
              ) : <p className="text-foreground text-right" dir="rtl">{contactData.business.descriptionAr}</p>}
            </div>

            {/* Contact Details (Email, Phones, Addresses) */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                {isEditing ? (
                  <Input value={contactData.business.email} onChange={(e) => updateBusinessData('email', e.target.value)} />
                ) : <span className="text-foreground">{contactData.business.email}</span>}
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                {isEditing ? (
                  <Input value={contactData.business.phone} onChange={(e) => updateBusinessData('phone', e.target.value)} />
                ) : <span className="text-foreground">{contactData.business.phone}</span>}
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                {isEditing ? (
                  <Input value={contactData.business.phone2} onChange={(e) => updateBusinessData('phone2', e.target.value)} placeholder="Phone number 2" />
                ) : <span className="text-foreground">{contactData.business.phone2}</span>}
              </div>

              {/* English Address */}
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                {isEditing ? (
                  <Input value={contactData.business.address} onChange={(e) => updateBusinessData('address', e.target.value)} />
                ) : <span className="text-foreground">{contactData.business.address}</span>}
              </div>

              {/* Arabic Address */}
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                {isEditing ? (
                  <Input value={contactData.business.addressAr} onChange={(e) => updateBusinessData('addressAr', e.target.value)} placeholder="Address (Arabic)" dir="rtl" className="text-right" />
                ) : <span className="text-foreground text-right" dir="rtl">{contactData.business.addressAr}</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Card */}
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-primary" />
              Social Media
            </CardTitle>
            <CardDescription>Social media profiles and online presence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { icon: Facebook, label: "Facebook", key: "facebook" },
              { icon: Twitter, label: "Twitter", key: "twitter" },
              { icon: Instagram, label: "Instagram", key: "instagram" },
              { icon: Linkedin, label: "LinkedIn", key: "linkedin" }
            ].map(({ icon: Icon, label, key }) => (
              <div key={key} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                {isEditing ? (
                  <Input value={contactData.social[key]} onChange={(e) => updateSocialData(key, e.target.value)} placeholder={`${label} URL`} />
                ) : (
                  <p href={contactData.social[key]} target="_blank" rel="noopener noreferrer" className=" aqqqq hover:underline aqqqq">
                    {contactData.social[key] ? label + " Profile" : "N/A"}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

   
      </div>
    </div>
  );
}
