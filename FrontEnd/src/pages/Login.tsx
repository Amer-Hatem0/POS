// src/pages/Login.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (token && user?.role === "Admin") {
      navigate("/admin");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      const data = response.data;

      if (data.role !== "Admin") {
        toast.error('Access denied. Only administrators can log in here.', { duration: 2000 });
        console.log("Login response data:", data);
        return;
      }

      toast.success('Login successful!', { duration: 2000 });
      console.log("Login response data:", data);
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      
      navigate("/admin");
      window.scrollTo(0, 0);
    } catch (err: any) {
      let errorMessage = 'An error occurred. Please try again.';
      if (err.response?.status === 401) {
        errorMessage = 'Invalid email or password.';
      }
      toast.error(errorMessage, { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9fa]">
      <Toaster position="top-center" />
      <Navbar />
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 border border-[#78B9B5]">
        <h2 className="text-3xl font-bold text-center text-[#065084] mb-6 ">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-[#0F828C]">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 border-[#78B9B5]"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-[#0F828C]">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 border-[#78B9B5]"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#065084] hover:bg-[#320A6B] text-white font-semibold gradient-hero"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}