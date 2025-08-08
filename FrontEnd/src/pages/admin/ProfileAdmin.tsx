import { useEffect, useState } from "react";
import { User, Mail, Shield, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

interface AdminData {
  userId: string;
  fullName: string;
  email: string;
  role: string;
  lastLogin?: string; // Optional, as it may not be provided by /auth/users
}

export default function AdminProfile() {
  const [adminData, setAdminData] = useState<AdminData>({
    userId: "",
    fullName: "",
    email: "",
    role: "",
    lastLogin: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editEmail, setEditEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace this with your actual method to get the current user's ID
  // For example, from auth context, localStorage, or a token
  const currentUserId = localStorage.getItem("userId") || "admin-id-placeholder"; // Adjust as needed

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get("/auth/users");
        const users: AdminData[] = response.data;

        // Find the current admin (e.g., by userId or role)
        const currentAdmin = users.find(
          (user) => user.userId === currentUserId || user.role === "Admin"
        );

        if (!currentAdmin) {
          throw new Error("Admin user not found.");
        }

        setAdminData({
          userId: currentAdmin.userId,
          fullName: currentAdmin.fullName,
          email: currentAdmin.email,
          role: currentAdmin.role,
          lastLogin: currentAdmin.lastLogin || "N/A", // Fallback if lastLogin is not provided
        });
        setEditEmail(currentAdmin.email);
      } catch (err: any) {
        console.error("Failed to fetch admin profile:", err);
        const message = err?.response?.data || "Failed to load admin profile data.";
        setError(typeof message === "string" ? message : JSON.stringify(message));
        toast.error("Failed to load admin profile data.", { duration: 7000 });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleEditEmail = async () => {
    try {
      await axios.put(`/auth/update/${adminData.userId}`, {
        email: editEmail,
        fullName: adminData.fullName,
        role: adminData.role,
      });
      setAdminData({ ...adminData, email: editEmail });
      setIsEditing(false);
      toast.success("Email updated successfully.", { duration: 7000 });
    } catch (err: any) {
      console.error("Failed to update email:", err);
      const message = err?.response?.data || "Failed to update email.";
      setError(typeof message === "string" ? message : JSON.stringify(message));
      toast.error("Failed to update email.", { duration: 7000 });
    }
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in-up relative max-w-4xl mx-auto">
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-16 h-16 bg-blue-100 rounded-full opacity-10 animate-float top-20 left-20"></div>
        <div className="absolute w-12 h-12 bg-purple-100 opacity-10 animate-spin-slow bottom-40 right-24" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        <div className="absolute w-20 h-20 bg-green-100 rounded-md opacity-10 animate-pulse bottom-20 left-32"></div>
      </div>

      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-10 shadow-lg card-hover">
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-foreground mb-4 flex items-center gap-4 animate-slide-in-left">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center animate-pulse-glow">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            Admin Profile
          </h1>
          <p className="text-lg text-muted-foreground mb-4 max-w-2xl animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            Manage your admin account details and settings.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
      </div>

      {/* Profile Card */}
      <Card className="card-gradient card-hover shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary" />
            Admin Information
          </CardTitle>
         
        </CardHeader>
        <CardContent className="space-y-6">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {loading ? (
            <p className="text-center text-muted-foreground">Loading profile...</p>
          ) : (
            <div className="space-y-4">
              {/* Admin Avatar */}
             

              {/* Admin Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Full Name</p>
                    <p className="text-lg font-medium">{adminData.fullName || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Email</p>
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full"
                          placeholder="Enter new email"
                          type="email"
                        />
                        <Button size="sm" onClick={handleEditEmail}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-medium">{adminData.email || "N/A"}</p>
                        
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Role</p>
                    <p className="text-lg font-medium">{adminData.role || "N/A"}</p>
                  </div>
                </div>
               
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CSS for Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.15); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-pulse { animation: pulse 5s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}