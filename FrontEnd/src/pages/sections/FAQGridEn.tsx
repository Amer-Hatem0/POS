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

export default function FAQGridEn() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/FAQ")
      .then((res) => {
        const active: Faq[] = (res.data as Faq[])
          .filter(f => f.isActive)
          .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
          .slice(0, 6);
        setFaqs(active);
      })
      .finally(() => setLoading(false));
  }, []);

  const list = faqs.map(f => ({
    id: f.id,
    q: f.questionEn || "",
    a: f.answerEn || ""
  }));

  const mid = Math.ceil(list.length / 2);
  const left = list.slice(0, mid);
  const right = list.slice(mid);

  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <ScrollAnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </div>
        </ScrollAnimatedSection>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
