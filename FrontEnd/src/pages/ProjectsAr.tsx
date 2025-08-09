import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { ExternalLink, Github, Calendar, Users } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/FooterAr";
import api from '@/lib/axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectsAr = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['الكل']);
  const [selectedCategory, setSelectedCategory] = useState('الكل');

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
      const categoryNames = res.data.map((cat: any) => cat.nameAr);
      setCategories(['الكل', ...categoryNames]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const filteredProjects = selectedCategory === 'الكل'
    ? projects
    : projects.filter(project => project.categoryNameAr === selectedCategory);

  return (
    <div className="min-h-screen pt-20" dir="rtl">
      <Navbar />

      {/* قسم المقدمة (Hero Section) */}
      <section className="py-20 gradient-hero text-white text-right">
        <div className="container mx-auto   text-center px-4">
          <ScrollAnimatedSection>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">مشاريعنا</h1>
              <p className="text-2xl mb-8 max-w-3xl m-auto opacity-90">
                اكتشف محفظة أعمالنا من المشاريع الناجحة واعرف كيف ساعدنا الشركات على النمو والازدهار.
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* قسم الفلترة (Filter Section) */}
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

      {/* شبكة المشاريع (Projects Grid) */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollAnimatedSection
                key={project.id}
                animation={index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'}
                delay={index * 100}
              >
                <Card className="h-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group text-right">
                  <div className="relative overflow-hidden rounded-t-lg">
               
                    {project.imageUrls && project.imageUrls.length > 0 && (
                      <img
                        src={`${API_BASE_URL}${project.imageUrls[0]}`}
                        alt={project.titleAr || project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-4 right-4">
                 <Badge className="bg-primary1 text-white">
  {project.categoryNameAr || project.categoryName}
</Badge>
   </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">{new Date(project.createdAt).getFullYear()}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{project.titleAr}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.descriptionAr}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground justify-end">
                        <span className="ml-2">العميل: {project.client || 'غير متوفر'}</span>
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground justify-end">
                        <span className="ml-2">المدة: {project.duration || 'غير متوفر'}</span>
                        <Calendar className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="mb-4 text-right">
                      <h4 className="font-semibold mb-2 text-foreground">التقنيات المستخدمة:</h4>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {(project.technologies || []).map((tech: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 text-right">
                      <h4 className="font-semibold mb-2 text-foreground">الميزات الرئيسية:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-none p-0 m-0">
                        {(project.features || []).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center justify-end">
                            {feature}
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      {project.liveDemoUrl && (
                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button size="sm" className="w-full gradient-primary">
                            <ExternalLink className="w-4 h-4 ml-2" />
                            مشاهدة مباشرة
                          </Button>
                        </a>
                      )}
                      {project.sourceCodeUrl && (
                        <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button size="sm" variant="outline" className="w-full">
                            <Github className="w-4 h-4 ml-2" />
                            الكود المصدري
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

      {/* قسم الحث على اتخاذ إجراء (CTA Section) */}
      <section className="py-20 gradient-primary text-white text-right">
        <div className="container mx-auto text-center px-4">
          <ScrollAnimatedSection>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">هل أنت مستعد لبدء مشروعك؟</h2>
              <p className="text-xl mb-8 max-w-2xl m-auto   opacity-90">
                دعنا نناقش متطلباتك وننشئ شيئًا رائعًا معًا.
              </p>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 mt-4 border-white text-white   text-lg px-8  day">
                  ابدأ اليوم
                </Button>
              </Link>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsAr;