import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";

type Faq = {
  id: number;
  questionEn?: string;
  answerEn?: string;
  questionAr?: string;
  answerAr?: string;
  isActive?: boolean;
  displayOrder?: number;
};

export default function FAQGridAr() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/FAQ")
      .then((res) => {
        const active: Faq[] = (res.data as Faq[])
          .filter(f => f.isActive)
          .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
          .slice(0, 6); // نفس روح التصميم: 3 يسار + 3 يمين
        setFaqs(active);
      })
      .finally(() => setLoading(false));
  }, []);

  const list = faqs.map(f => ({
    id: f.id,
    q: f.questionAr || f.questionEn || "",
    a: f.answerAr || f.answerEn || ""
  }));

  const mid = Math.ceil(list.length / 2);
  const left = list.slice(0, mid);
  const right = list.slice(mid);

  return (
    <section className="py-20 bg-accent" dir="rtl">
      <div className="container mx-auto px-4">
        <ScrollAnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">الأسئلة الشائعة</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              إجابات سريعة على الأسئلة الأكثر شيوعًا حول خدماتنا
            </p>
          </div>
        </ScrollAnimatedSection>

        {loading ? (
          <div className="text-center text-muted-foreground">جارِ التحميل...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* العمود الأيمن بصريًا (لأن RTL) */}
            <ScrollAnimatedSection animation="slide-in-left">
              <div className="space-y-6">
                {left.map(item => (
                  <div key={item.id}>
                    <h3 className="font-bold text-lg mb-2 text-foreground">{item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </ScrollAnimatedSection>

            {/* العمود الأيسر بصريًا */}
            <ScrollAnimatedSection animation="slide-in-right">
              <div className="space-y-6">
                {right.map(item => (
                  <div key={item.id}>
                    <h3 className="font-bold text-lg mb-2 text-foreground">{item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        )}
      </div>
    </section>
  );
}
