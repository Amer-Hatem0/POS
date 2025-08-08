import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { ExternalLink, Github, Calendar, Users } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from '@/lib/axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchProjects = async () => {
    try {
      const res = await api.get("/project");
      // فلترة المشاريع وعرض المشاريع النشطة فقط
      setProjects(res.data.filter((proj: any) => proj.isActive));
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      const categoryNames = res.data.map((cat: any) => cat.name);
      setCategories(['All', ...categoryNames]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.categoryName === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Discover our portfolio of successful projects and see how we've helped businesses thrive
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "gradient-primary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollAnimatedSection
                key={project.id}
                animation={index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}
                delay={index * 100}
              >
                <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    {/* عرض الصورة الأولى من قائمة الصور */}
                    {project.imageUrls && project.imageUrls.length > 0 && (
                      <img
                        src={`${API_BASE_URL}${project.imageUrls[0]}`}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">{project.categoryName}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{new Date(project.createdAt).getFullYear()}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Client: {project.client || 'N/A'}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Duration: {project.duration || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-foreground">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies || []).map((tech: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2 text-foreground">Key Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {(project.features || []).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      {project.liveDemoUrl && (
                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button size="sm" className="w-full gradient-primary">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </Button>
                        </a>
                      )}
                      {project.sourceCodeUrl && (
                        <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button size="sm" variant="outline" className="w-full">
                            <Github className="w-4 h-4 mr-2" />
                            Source
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your requirements and create something amazing together
            </p>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Get Started Today
              </Button>
            </Link>
          </ScrollAnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;