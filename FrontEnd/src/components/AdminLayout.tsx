import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";
import { User, Menu, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export function AdminLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const isNew = localStorage.getItem("newTestimonial") === "true";
    setHasNotification(isNew);
  }, []);

  const handleNotificationClick = () => {
    navigate("/admin/testimonials");
    setHasNotification(false);
    localStorage.setItem("newTestimonial", "false");
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded bg-blue-500"
              >
                <Menu className="text-white" />
              </button>
            </div>

            <div className="flex items-center gap-4 relative">
              {/* Notifications */}
              <div
                className="relative cursor-pointer"
                onClick={handleNotificationClick}
                title="New Testimonials"
              >
                <Bell className="w-6 h-6 text-gray-700" />
                {hasNotification && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                )}
              </div>

              {/* Profile */}
              <div
                className="w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/admin/profile")}
              >
                <User className="w-5 h-5 text-primary-foreground bg-primary" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
