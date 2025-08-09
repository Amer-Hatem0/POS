import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Target, Eye, Trophy, Users, Lightbulb, Zap, Heart } from 'lucide-react';
import teamImage from '@/assets/team.jpg';
import Navbar from "../components/Navbar";
import Footer from "../components/FooterAr";

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'الابتكار',
      description: 'نستبق اتجاهات التكنولوجيا لتقديم حلول مبتكرة'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'التركيز على العميل',
      description: 'نجاحك هو أولويتنا. نبني شراكات طويلة الأمد مع عملائنا'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'التميز',
      description: 'نسعى للكمال في كل مشروع، كبيراً كان أم صغيراً'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'المرونة',
      description: 'سرعة في التنفيذ دون المساومة على الجودة'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'التعاون',
      description: 'نعمل معك عن كثب طوال العملية بأكملها'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'النتائج',
      description: 'نركز على تحقيق نتائج ملموسة تدفع عملك نحو الأمام'
    }
  ];

  const timeline = [
    {
      year: '2021',
      title: 'تأسيس الشركة',
      description: 'بدأنا برؤية لتحويل الأعمال من خلال التكنولوجيا'
    },
    {
      year: '2022',
      title: 'توسع الفريق',
      description: 'قمنا بتوسيع فريقنا ليشمل مطورين ومصممين خبراء'
    },
    {
      year: '2023',
      title: 'أكثر من 100 مشروع',
      description: 'وصلنا إلى إنجاز أكثر من 100 مشروع بنجاح'
    },
    {
      year: '2024',
      title: 'وصول عالمي',
      description: 'وسعنا خدماتنا لخدمة العملاء حول العالم'
    }
  ];

  return (
    <div className="min-h-screen pt-20" dir="rtl">
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">من نحن</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                تحويل الأفكار إلى نجاح رقمي من خلال حلول ذكية ومتكاملة
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <ScrollAnimatedSection animation="slide-in-right">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-foreground">قصتنا</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  BRIXEL هي شركة فلسطينية تقدم حلولاً تكنولوجية وتسويقية شاملة. وهي مكرسة لدعم الشركات الصغيرة والمتوسطة، بدءاً من الأفكار وصولاً إلى الحضور الرقمي الاحترافي. نقدم خدمات تشمل تطوير مواقع الويب وتطبيقات الهاتف المحمول، وإدارة وسائل التواصل الاجتماعي، وتصميم الهوية البصرية، وخدمات النطاق والاستضافة، بالإضافة إلى تطوير أنظمة الحجوزات ونقاط البيع للمطاعم والعيادات ومحلات البيع بالتجزئة، كل ذلك من خلال منصة موحدة، ذكية، وسهلة الاستخدام.
                </p>
              </div>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animation="slide-in-left">
              <div className="relative">
                <img
                  src={teamImage}
                  alt="Our Team at Work"
                  className="rounded-2xl shadow-elegant w-full"
                />
                <div className="absolute inset-0 gradient-primary opacity-10 rounded-2xl"></div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <ScrollAnimatedSection animation="slide-in-right">
              <Card className="h-full shadow-elegant">
                <CardContent className="p-8 text-center">
                  <div className="text-primary mb-6 flex justify-center">
                    <Target className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-foreground">مهمتنا</h3>
                  <div className="text-lg text-muted-foreground leading-relaxed text-right space-y-4">
                    <p>
                      في BRIXEL، نؤمن بأن التكنولوجيا يجب أن تمكّن نجاحك، لا أن تعقّده.
                      نسعى لتبسيط الرحلة الرقمية لرواد الأعمال من خلال حلول مرنة تشمل:
                    </p>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>أنظمة متكاملة لإدارة الحجوزات ونقاط البيع</li>
                      <li>تطوير مواقع وتطبيقات مخصصة</li>
                      <li>إدارة احترافية لمنصات التواصل الاجتماعي</li>
                      <li>دعم فني ومستمر للعملاء</li>
                    </ul>
                    <p>
                      نهدف إلى مساعدة كل عميل على إطلاق مشروعه بكفاءة وذكاء، وبنتائج قابلة للقياس والتوسع.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
            {/* Vision */}
            <ScrollAnimatedSection animation="slide-in-left" delay={200}>
              <Card className="h-full shadow-elegant">
                <CardContent className="p-8 text-center">
                  <div className="text-primary mb-6 flex justify-center">
                    <Eye className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-foreground">رؤيتنا</h3>
                  <div className="text-lg text-muted-foreground leading-relaxed text-right space-y-4">
                    <p>
                      أن نصبح منصة الحلول الرقمية الرائدة في فلسطين والعالم العربي،
                      والوجهة الأولى لكل من يبحث عن:
                    </p>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>هوية رقمية قوية</li>
                      <li>أدوات تكنولوجية شاملة وذكية</li>
                      <li>دعم موثوق ونتائج ملموسة</li>
                    </ul>
                    <p>
                      نسعى لنكون شركاء حقيقيين في النجاح، نقدم التكنولوجيا بلغة مبسطة وإبداع
                      يتحول إلى تأثير حقيقي ونمو ملموس.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-20 text-center gradient-hero text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-foreground text-white">تطلعاتنا المستقبلية</h2>
          <p className="text-lg text-white-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
            نهدف إلى أن نكون شركاء حقيقيين في النجاح، نقدم التكنولوجيا بلغة مبسطة وإبداع
            يتحول إلى تأثير حقيقي ونمو ملموس.
          </p>
          <p className="text-lg text-white-foreground max-w-2xl mx-auto leading-relaxed">
            دعنا نطلق مشروعك اليوم! فريق BRIXEL جاهز للإجابة على أسئلتك وتقديم
            استشارة مجانية لمساعدتك في اختيار الخدمة الأنسب لاحتياجاتك.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
