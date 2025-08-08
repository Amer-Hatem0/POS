// src/pages/Login.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
 

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
       
        console.log("✅ Login response data:", data);

        return;
      }
      console.log("✅ Login response data:", data);


      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
     
      navigate("/admin");
      window.scrollTo(0, 0); // لمنع النزول
    } catch (err: any) {
     
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9fa]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 border border-[#78B9B5]">
        <h2 className="text-3xl font-bold text-center text-[#065084] mb-6">Admin Login</h2>
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
            className="w-full bg-[#065084] hover:bg-[#320A6B] text-white font-semibold"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
