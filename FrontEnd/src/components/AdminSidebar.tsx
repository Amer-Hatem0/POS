 

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
  X
} from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

const navigationItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, description: "Overview & Analytics" },
  { title: "About", url: "/admin/about", icon: Briefcase },
  { title: "Services", url: "/admin/services", icon: Settings, description: "Manage Services" },
  { title: "Projects", url: "/admin/projects", icon: Briefcase, description: "Portfolio Management" },
  { title: "Contact Info", url: "/admin/contact", icon: Mail, description: "Contact Details" },
  { title: "FAQs", url: "/admin/FAQs", icon: BarChart3, description: "Frequently Asked Questions" },
  { title: "Users", url: "/admin/users", icon: Users, description: "Manage Users" },
  { title: "Advertisements", url: "/admin/advertisement", icon: FileText, description: "Manage Advertisements" },
  { title: "Categories", url: "/admin/categories", icon: Globe, description: "Manage Categories" },
  { title: "Featrue", url: "/admin/featrue", icon: ChevronRight },
  { title: "Testimonials", url: "/admin/testimonials", icon: BarChart3 },
  { title: "Profile", url: "/admin/profile", icon: User, description: "Admin Personal Profile" },
];

type AdminSidebarProps = {
  collapsed: boolean;          // لسلوك الأجهزة الكبيرة
  mobileOpen?: boolean;        // فتح الدروار على الموبايل
  onCloseMobile?: () => void;  // إغلاق الدروار على الموبايل
};

export function AdminSidebar({ collapsed, mobileOpen = false, onCloseMobile }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isExactActive = (path: string) => location.pathname === path;

  // المكوّن الأساسي للسايدبار (مُعاد استخدامه بين الديسكتوب والموبايل)
  const SidebarInner = (
    <div className="p-4 flex flex-col h-full bg-white2">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center animate-spin-slow">
          <Shield className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div className="ml-3">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-white">Dashboard</p>
          </div>
        )}
        {/* زر إغلاق للموبايل فقط */}
        <button
          aria-label="Close sidebar"
          onClick={onCloseMobile}
          className="ml-auto p-2 rounded-md hover:bg-gray-100 md:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 space-y-2">
        {navigationItems.map((item) => (
          <Tooltip key={item.title} content={collapsed ? item.title : ""} side="right">
            <NavLink
              to={item.url}
              onClick={onCloseMobile} // عند الضغط على رابط بالموبايل، أغلق الدروار
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition-all text-sm font-medium aqqqq
                ${item.url === "/admin"
                  ? isExactActive(item.url)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100  "
                  : isActive
                    ? "bg-white text-primary"
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
          {!collapsed && <span className="text-sm font-medium text-white">Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* نسخة الديسكتوب/التابلت (ثابتة) */}
      <aside
        className={`${collapsed ? "w-20" : "w-72"} transition-all duration-300 bg-white border-r border-gray-200 shadow-md h-screen hidden md:block sticky top-0`}
        aria-label="Desktop sidebar"
      >
        {SidebarInner}
      </aside>

      {/* نسخة الموبايل (Drawer) */}
      <div
        className={`md:hidden fixed inset-0 z-50 ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={onCloseMobile}
        />
        {/* Drawer */}
        <aside
          className={`absolute left-0 top-0 h-full bg-white2 border-r border-gray-200 shadow-xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ width: "18rem" }}
          aria-label="Mobile sidebar"
        >
          {/* بالموبايل نعرض دائمًا غير مصغّر */}
          <div className="w-72">{SidebarInner}</div>
        </aside>
      </div>
    </>
  );
}
