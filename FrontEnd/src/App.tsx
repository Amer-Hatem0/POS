import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "@/components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Services from "./pages/admin/Services";
import Projects from "./pages/admin/Projects";
import Contacts from "./pages/admin/Contact";
import FAQs from "./pages/admin/FAQs";
import Users from "./pages/admin/Users";
import CreateAdvertisement from "./pages/admin/CreateAdvertisement";

import AdvertisementDetails from "./pages/admin/AdvertisementDetails";
import Profile from "./pages/admin/ProfileAdmin";
import CategoryManagement from "./pages/admin/CategoryManagement";
import AboutAdmin from "./pages/admin/AboutAdmin";
import Why from "./pages/admin/Why";
import AdminTestimonialsPage from "./pages/admin/AdminTestimonialsPage";
import ProjectDetailsPage from "./pages/admin/ProjectDetailsPage";



 
import Login from "./pages/Login";
 
import About from "./pages/About";
import Project from "./pages/Projects";
import Advertisement from "./pages/Advertisements";
import Service from "./pages/Services";
import Programming from "./pages/services/Programming";
import Marketing from "./pages/services/Marketing";
import ECommerce from "./pages/services/ECommerce";
import Contact from "./pages/Contact";
import ProjectsAr from "./pages/ProjectsAr";



 
import ProtectedRoute from "@/components/ProtectedRoute"; 
import LandingPage from "@/components/LandingPage"; 
import LandingPageAr from "@/components/LandingPageAr"; 
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
           <Route path="/home" element={<LandingPage />} />
         
             <Route path="/home/Ar" element={<LandingPageAr />} />
                     <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Project />} />
               <Route path="ar/projects" element={<  ProjectsAr />} />

          
            <Route path="/advertisements" element={<Advertisement />} />
            <Route path="/services" element={<Service />} />
            <Route path="/services/programming" element={<Programming />} />
            <Route path="/services/marketing" element={<Marketing />} />
            <Route path="/services/ecommerce" element={<ECommerce />} />
            <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* ✅ محمية بالـ JWT */}
       <Route path="/admin" element={<ProtectedRoute />}>
  <Route element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="services" element={<Services />} />
    <Route path="projects" element={<Projects />} />
    <Route path="contact" element={<Contacts />} />
    <Route path="FAQs" element={<FAQs />} />
    <Route path="users" element={<Users />} />
    <Route path="advertisement" element={<CreateAdvertisement />} />
      <Route path="categories" element={<CategoryManagement />} />
       <Route path="profile" element={<Profile />} />
          <Route path="about" element={<AboutAdmin />} />
              <Route path="featrue" element={<Why />} />
                   <Route path="testimonials" element={<AdminTestimonialsPage />} />
<Route path="projects/:id" element={<ProjectDetailsPage />} />

       
    
 
    <Route path="advertisements/:id" element={<AdvertisementDetails />} />
  </Route>
</Route>


          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
