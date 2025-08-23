import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  Briefcase,
  Mail,
  HelpCircle,
  Settings,
  Folder,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import Chart from 'chart.js/auto';

// Mock data for line chart (ads over time)
const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Advertisements Created',
    data: [10, 15, 20, 25, 30, 35],
    fill: true,
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    tension: 0.4,
    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
    pointBorderColor: '#fff',
    pointHoverRadius: 8
  }]
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalProjects: 0,
    totalServices: 0,
    totalUsers: 0,
    totalFAQs: 0,
    totalAds: 0,
    contactInfoStatus: "Not Configured",
    activeProjects: 0,
    inactiveProjects: 0,
    activeServices: 0,
    inactiveServices: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [categoriesRes, projectsRes, servicesRes, usersRes, faqsRes, adsRes, contactRes] = await Promise.all([
          api.get("/Category"),
          api.get("/project"),
          api.get("/service"),
          api.get("/auth/users"),
          api.get("/FAQ"),
          api.get("/Advertisement"),
          api.get("/CompanyContact")
        ]);

        const newStats = {
          totalCategories: categoriesRes.data.length || 0,
          totalProjects: projectsRes.data.length || 0,
          totalServices: servicesRes.data.length || 0,
          totalUsers: usersRes.data.length || 0,
          totalFAQs: faqsRes.data.length || 0,
          totalAds: adsRes.data.length || 0,
          contactInfoStatus: contactRes.data.email && contactRes.data.address ? "Configured" : "Not Configured",
          activeProjects: projectsRes.data.filter(p => p.isActive).length || 0,
          inactiveProjects: projectsRes.data.filter(p => !p.isActive).length || 0,
          activeServices: servicesRes.data.filter(s => s.isVisible).length || 0,
          inactiveServices: servicesRes.data.filter(s => !s.isVisible).length || 0,
        };

        setStats(newStats);

        // Initialize Bar Chart
        const barChartData = {
          labels: ['Categories', 'Projects', 'Services', 'Users', 'FAQs', 'Ads'],
          datasets: [{
            label: 'Total Counts',
            data: [
              newStats.totalCategories,
              newStats.totalProjects,
              newStats.totalServices,
              newStats.totalUsers,
              newStats.totalFAQs,
              newStats.totalAds
            ],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
            hoverBorderColor: 'rgba(59, 130, 246, 1)'
          }]
        };

        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {
          type: 'bar',
          data: barChartData,
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top', labels: { font: { size: 14, family: 'Inter' } } },
              title: { display: true, text: 'Platform Metrics Overview', font: { size: 18, family: 'Inter' } }
            },
            scales: {
              y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
              x: { grid: { display: false } }
            },
            animation: {
              duration: 1200,
              easing: 'easeOutBounce'
            }
          }
        });

        // Initialize Pie Chart
        const pieChartData = {
          labels: ['Active Projects', 'Inactive Projects', 'Active Services', 'Inactive Services'],
          datasets: [{
            data: [
              newStats.activeProjects,
              newStats.inactiveProjects,
              newStats.activeServices,
              newStats.inactiveServices
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 2,
            hoverOffset: 20
          }]
        };

        const pieCtx = document.getElementById('pieChart').getContext('2d');
        new Chart(pieCtx, {
          type: 'pie',
          data: pieChartData,
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top', labels: { font: { size: 14, family: 'Inter' } } },
              title: { display: true, text: 'Projects and Services Status', font: { size: 18, family: 'Inter' } }
            },
            animation: {
              duration: 1200,
              easing: 'easeInOutQuart'
            }
          }
        });

        // Initialize Line Chart
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineCtx, {
          type: 'line',
          data: lineChartData,
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top', labels: { font: { size: 14, family: 'Inter' } } },
              title: { display: true, text: 'Advertisements Trend Over Time', font: { size: 18, family: 'Inter' } }
            },
            scales: {
              y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
              x: { grid: { display: false } }
            },
            animation: {
              duration: 1200,
              easing: 'easeInOutQuad'
            }
          }
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  const statCards = [
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: Folder,
      color: "text-blue-600",
      navigateTo: "/admin/categories",
    },
    {
      title: "Projects",
      value: stats.totalProjects,
      icon: Briefcase,
      color: "text-green-600",
      navigateTo: "/admin/projects",
    },
    {
      title: "Services",
      value: stats.totalServices,
      icon: Settings,
      color: "text-purple-600",
      navigateTo: "/admin/services",
    },
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-orange-600",
      navigateTo: "/admin/users",
    },
    {
      title: "FAQs",
      value: stats.totalFAQs,
      icon: HelpCircle,
      color: "text-teal-600",
      navigateTo: "/admin/faqs",
    },
    {
      title: "Advertisements",
      value: stats.totalAds,
      icon: MessageSquare,
      color: "text-pink-600",
      navigateTo: "/admin/advertisement",
    },
    {
      title: "Contact Info",
      value: stats.contactInfoStatus,
      icon: Mail,
      color: "text-indigo-600",
      navigateTo: "/admin/contact",
    },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in-up relative max-w-7xl mx-auto">
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-16 h-16 bg-blue-100 rounded-full opacity-10 animate-float top-20 left-20"></div>
        <div className="absolute w-12 h-12 bg-purple-100 opacity-10 animate-spin-slow bottom-40 right-24" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        <div className="absolute w-20 h-20 bg-green-100 rounded-md opacity-10 animate-pulse bottom-20 left-32"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-10 shadow-lg card-hover">
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-foreground mb-4 flex items-center gap-4 animate-slide-in-left">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center animate-pulse-glow">
              <BarChart3 className="w-8 h-8 text-primary-foreground" />
            </div>
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mb-4 max-w-2xl animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            Comprehensive overview of your platform's key metrics and management tools.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card
            key={stat.title}
            className="card-gradient card-hover animate-slide-up shadow-md hover:shadow-xl transition-shadow duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {loading ? "Loading..." : stat.value}
                  </p>
                </div>
                <div className={`p-4 rounded-xl bg-primary/10 ${stat.color} animate-float`}>
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full font-medium hover:bg-primary/10 transition-colors duration-200"
                onClick={() => navigate(stat.navigateTo)}
                disabled={loading}
              >
                Manage {stat.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-foreground text-center animate-slide-in-up">Data Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-gradient card-hover shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
                Platform Metrics
              </CardTitle>
              <CardDescription>Bar chart of total counts across sections</CardDescription>
            </CardHeader>
            <CardContent>
              <canvas id="barChart" className="w-full h-80"></canvas>
            </CardContent>
          </Card>

          <Card className="card-gradient card-hover shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
                Status Distribution
              </CardTitle>
              <CardDescription>Pie chart of active vs inactive items</CardDescription>
            </CardHeader>
            <CardContent>
              <canvas id="pieChart" className="w-full h-80"></canvas>
            </CardContent>
          </Card>

          <Card className="card-gradient card-hover shadow-md hover:shadow-xl transition-shadow duration-300 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
                Advertisements Trend
              </CardTitle>
              <CardDescription>Line chart of ads creation over time</CardDescription>
            </CardHeader>
            <CardContent>
              <canvas id="lineChart" className="w-full h-80"></canvas>
            </CardContent>
          </Card>
        </div>
      </div>

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
        @keyframes slide-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-pulse { animation: pulse 5s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.5s ease-out forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}