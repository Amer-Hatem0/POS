import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  Mail,
  Users,
  BarChart3,
  FileText,
  Shield,
  Globe,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

import { Tooltip } from "@/components/ui/tooltip";

const navigationItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, description: "Overview & Analytics" },
  { title: "Services", url: "/admin/services", icon: Settings, description: "Manage Services" },
  { title: "Projects", url: "/admin/projects", icon: Briefcase, description: "Portfolio Management" },
  { title: "Contact Info", url: "/admin/contact", icon: Mail, description: "Contact Details" },
  { title: "FAQs", url: "/admin/FAQs", icon: BarChart3, description: "Frequently Asked Questions" },
  { title: "Users", url: "/admin/users", icon: Users, description: "Manage Users" },
  { title: "Advertisements", url: "/admin/advertisement", icon: FileText, description: "Manage Advertisements" },
  { title: "Categories", url: "/admin/categories", icon: Globe, description: "Manage Categories" },
  { title: "Profile", url: "/admin/profile", icon: User, description: "Admin Personal Profile" },
    { title: "About", url: "/admin/about", icon: User },
      { title: "Featrue", url: "/admin/featrue", icon: User },
          { title: "Testimonials", url: "/admin/testimonials", icon: BarChart3 },

      
];

export function AdminSidebar({ collapsed }: { collapsed: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.startsWith(path);
  const isExactActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } transition-all duration-300 bg-white border-r border-gray-200 shadow-md   h-screen`}
    >
<div  className={`${
        collapsed ? "w-20" : "w-72"
      } transition-all duration-300 bg-white border-r border-gray-200 shadow-md fixed  h-screen`}> 
      <div className="p-4 flex flex-col h-full bg-white   ">
        {/* Logo */}
        <div className="flex items-center mb-8 ">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center animate-spin-slow mt-0"  >
            <Shield className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div className="ml-3 ">
              <h1 className="text-xl font-bold text-gray-800 ">Admin Panel</h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 space-y-2">
          {navigationItems.map((item) => (
            <Tooltip key={item.title} content={collapsed ? item.title : ""} side="right">
              <NavLink
                to={item.url}
                className={({ isActive: active }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition-all text-sm font-medium
                  ${
              
                    item.url === "/admin"
                      ? isExactActive(item.url)
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                      : active
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </Tooltip>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all w-full justify-center"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">Log Out</span>}
          </button>
        </div>
      </div>
</div>

    </div>
  );
}