import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Target, Eye, Trophy, Users, Lightbulb, Zap, Heart } from 'lucide-react';
import teamImage from '@/assets/team.jpg';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const About = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Client Focus',
      description: 'Your success is our priority. We build lasting partnerships with our clients'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for perfection in every project, big or small'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Agility',
      description: 'Fast delivery without compromising on quality'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'We work closely with you throughout the entire process'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Results',
      description: 'We focus on delivering measurable results that drive your business forward'
    }
  ];

  const timeline = [
    {
      year: '2021',
      title: 'Company Founded',
      description: 'Started with a vision to transform businesses through technology'
    },
    {
      year: '2022',
      title: 'Team Expansion',
      description: 'Grew our team to include expert developers and designers'
    },
    {
      year: '2023',
      title: '100+ Projects',
      description: 'Reached the milestone of 100 successfully completed projects'
    },
    {
      year: '2024',
      title: 'Global Reach',
      description: 'Expanded our services to serve clients worldwide'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      {/* Hero Section */}
      <section className="py-20   gradient-hero text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About BRIXEL</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Transforming ideas into digital success through smart, integrated solutions
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <ScrollAnimatedSection animation="slide-in-left">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-foreground">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
       BRIXEL is a Palestinian company that delivers comprehensive technological
and marketing solutions. It is dedicated to supporting small and medium-sized
enterprises, from ideas to professional digital presence. We offer services
including website and mobile app development, social media management,
visual identity design, and domain and hosting services, as well as the
development of reservation and point-of-sale (POS) systems for restaurants,
clinics, and retail stores, all through a unified, smart, and user-friendly
platform.
                </p>
              </div>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection animation="slide-in-right">
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
      <ScrollAnimatedSection animation="slide-in-left">
        <Card className="h-full shadow-elegant">
          <CardContent className="p-8 text-center">
            <div className="text-primary mb-6 flex justify-center">
              <Target className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h3>
            <div className="text-lg text-muted-foreground leading-relaxed text-left space-y-4">
              <p>
                At BRIXEL, we believe technology should empower your success, not complicate it.
                We strive to simplify the digital journey for entrepreneurs through flexible solutions that include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Integrated systems for reservation and POS management</li>
                <li>Custom website and application development</li>
                <li>Professional social media platform management</li>
                <li>Continuous technical and customer support</li>
              </ul>
              <p>
                We aim to help every client launch their project efficiently, intelligently, and with measurable, scalable results.
              </p>
            </div>
          </CardContent>
        </Card>
      </ScrollAnimatedSection>

      {/* Vision */}
      <ScrollAnimatedSection animation="slide-in-right" delay={200}>
        <Card className="h-full shadow-elegant">
          <CardContent className="p-8 text-center">
            <div className="text-primary mb-6 flex justify-center">
              <Eye className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-foreground">Our Vision</h3>
            <div className="text-lg text-muted-foreground leading-relaxed text-left space-y-4">
              <p>
                To become the leading digital solutions platform in Palestine and the Arab world,
                the go-to destination for anyone seeking:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A strong digital identity</li>
                <li>Comprehensive and smart technological tools</li>
                <li>Reliable support and tangible results</li>
              </ul>
              <p>
                We aim to be true partners in success, delivering technology in a simplified language and creativity
                that translates into real impact and measurable growth.
              </p>
            </div>
          </CardContent>
        </Card>
      </ScrollAnimatedSection>

    </div>
  </div>
</section>


 
 

      {/* Future Goals */}
 <section className="py-20   text-center gradient-hero text-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold mb-6 text-foreground text-white">Looking Forward</h2>
    <p className="text-lg text-white-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
      We aim to be true partners in success, delivering technology in a simplified language and creativity
      that translates into real impact and measurable growth.
    </p>
    <p className="text-lg text-white-foreground max-w-2xl mx-auto leading-relaxed">
      Let’s launch your project today! The BRIXEL team is ready to answer your questions and provide
      a free consultation to help you choose the service that best suits your needs.
    </p>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default About;