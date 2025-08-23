import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from "../components/Navbar";
import Footer from "../components/FooterAr";
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import {
  Calendar,
  Timer,
  User,
  Globe,
  Link as LinkIcon,
  Mail,
  Phone,
  MapPin,
  Images,
  ArrowLeft,
} from 'lucide-react';

type Advertisement = {
  id: number;
  title: string;
  titleAr?: string | null;
  content: string;
  contentAr?: string | null;
  clientName?: string | null;

  longDescription?: string | null;
  longDescriptionAr?: string | null;

  clientUrl?: string | null;
  clientContactEmail?: string | null;
  clientContactPhone?: string | null;
  clientWebsite?: string | null;
  clientAddress?: string | null;

  imageUrl?: string | null;
  mediaUrls: string[];

  isPublished: boolean;
  createdAt: string;
  expirationDate?: string | null;

  categoryId?: number | null;
  categoryName?: string | null;
};

// استخدام متغير البيئة الصحيح للرابط الأساسي
const ASSET_BASE = import.meta.env.VITE_API_BASE_URL as string;
const resolveUrl = (u?: string | null) =>
  !u ? "" : /^https?:\/\//i.test(u) ? u : `${ASSET_BASE}${u}`;

export default function PublicAdDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/advertisement/${id}`);
        const x = res.data;
        const mapped: Advertisement = {
          id: x.id,
          title: x.title,
          titleAr: x.titleAr,
          content: x.content,
          contentAr: x.contentAr,
          clientName: x.clientName,

          longDescription: x.longDescription,
          longDescriptionAr: x.longDescriptionAr,

          clientUrl: x.clientUrl,
          clientContactEmail: x.clientContactEmail,
          clientContactPhone: x.clientContactPhone,
          clientWebsite: x.clientWebsite,
          clientAddress: x.clientAddress,

          imageUrl: x.imageUrl,
          mediaUrls: Array.isArray(x.mediaUrls) ? x.mediaUrls : [],

          isPublished: x.isPublished,
          createdAt: x.createdAt,
          expirationDate: x.expirationDate,

          categoryId: x.categoryId,
          categoryName: x.categoryName,
        };
        setAd(mapped);
        const first = mapped.imageUrl || mapped.mediaUrls[0] || null;
        setActiveImage(first ? resolveUrl(first) : null);
      } catch (e) {
        console.error("Error loading advertisement", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const gallery: string[] = useMemo(() => {
    if (!ad) return [];
    const list = [
      ...(ad.imageUrl ? [ad.imageUrl] : []),
      ...(ad.mediaUrls || []),
    ];
    // إزالة التكرارات والحفاظ على الترتيب
    const seen = new Set<string>();
    return list
      .map((u) => resolveUrl(u))
      .filter((u) => {
        if (!u || seen.has(u)) return false;
        seen.add(u);
        return true;
      });
  }, [ad]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20" dir="rtl">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="grid md:grid-cols-3 gap-6">
              <div className="h-64 bg-muted rounded md:col-span-2" />
              <div className="h-64 bg-muted rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen pt-20" dir="rtl">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">لم يتم العثور على الإعلان.</p>
          <div className="mt-6">
            <Button onClick={() => navigate(-1)} variant="outline" >
              العودة
              <ArrowLeft className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" dir="rtl">
      <Navbar />

      {/* Hero */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-right">
              {ad.titleAr || ad.title}
            </h1>
            <div className="flex items-center gap-2">
              {ad.categoryName && <Badge className="bg-green-500">{ad.categoryName}</Badge>}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground justify-end">
            <div className="flex items-center">
              <span>تاريخ النشر: {new Date(ad.createdAt).toLocaleDateString()}</span>
              <Calendar className="w-4 h-4 ml-2" />
            </div>
            {ad.expirationDate && (
              <div className="flex items-center">
                <span>تاريخ الانتهاء: {new Date(ad.expirationDate).toLocaleDateString()}</span>
                <Timer className="w-4 h-4 ml-2" />
              </div>
            )}
            {ad.clientName && (
              <div className="flex items-center">
                <span>العميل: {ad.clientName}</span>
                <User className="w-4 h-4 ml-2" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content + Gallery + Client Info */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Client Info and Links */}
            <div className="md:col-span-1">
              <ScrollAnimatedSection animation="slide-in-left">
                <Card className="shadow-elegant sticky top-24">
                  <CardContent className="p-6 space-y-4 text-right">
                    <h3 className="text-lg font-semibold">معلومات العميل</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      {ad.clientName && (
                        <div className="flex items-center justify-end">
                          <span>{ad.clientName}</span>
                          <User className="w-4 h-4 ml-2" />
                        </div>
                      )}
                      {ad.clientUrl && (
                        <div className="flex items-center justify-end">
                          <a href={ad.clientUrl} target="_blank" rel="noreferrer" className="underline">
                            رابط العميل
                          </a>
                          <LinkIcon className="w-4 h-4 ml-2" />
                        </div>
                      )}
                      {ad.clientWebsite && (
                        <div className="flex items-center justify-end">
                          <a href={ad.clientWebsite} target="_blank" rel="noreferrer" className="underline">
                            الموقع الإلكتروني
                          </a>
                          <Globe className="w-4 h-4 ml-2" />
                        </div>
                      )}
                      {ad.clientContactEmail && (
                        <div className="flex items-center justify-end">
                          <a href={`mailto:${ad.clientContactEmail}`} className="underline">
                            {ad.clientContactEmail}
                          </a>
                          <Mail className="w-4 h-4 ml-2" />
                        </div>
                      )}
                      {ad.clientContactPhone && (
                        <div className="flex items-center justify-end">
                          <a href={`tel:${ad.clientContactPhone}`} className="underline">
                            {ad.clientContactPhone}
                          </a>
                          <Phone className="w-4 h-4 ml-2" />
                        </div>
                      )}
                      {ad.clientAddress && (
                        <div className="flex items-center justify-end">
                          <span>{ad.clientAddress}</span>
                          <MapPin className="w-4 h-4 ml-2" />
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <Link to="/advertisements">
                        <Button variant="outline" className="w-full gradient-hero">
                          العودة إلى الإعلانات
                          <ArrowLeft className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 order-first md:order-last">
              <ScrollAnimatedSection>
                <Card className="shadow-elegant">
                  <CardContent className="p-6 space-y-4 text-right">
                    {/* Short Description/Content */}
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-foreground">عن هذا الإعلان</h2>
                      <p className="text-muted-foreground leading-relaxed">{ad.contentAr || ad.content || "—"}</p>
                    </div>

                    {/* Long Description */}
                    {ad.longDescriptionAr || ad.longDescription ? (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">تفاصيل إضافية</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {ad.longDescriptionAr || ad.longDescription}
                        </p>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>

              {/* Image Gallery */}
              <ScrollAnimatedSection animation="slide-in-up" delay={100}>
                <Card className="shadow-elegant mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4 justify-end">
                      <h3 className="text-lg font-semibold">الصور</h3>
                      <Images className="w-5 h-5" />
                    </div>

                    {/* Main image */}
                    <div className="w-full rounded-lg overflow-hidden bg-muted">
                      {activeImage ? (
                        <img
                          src={activeImage}
                          alt={ad.title}
                          className="w-full h-[360px] object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-[260px] flex items-center justify-center text-muted-foreground">
                          لا توجد صور متاحة
                        </div>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {gallery.length > 1 && (
                      <div className="mt-3 flex flex-wrap gap-2 justify-end">
                        {gallery.map((u, i) => (
                          <button
                            key={i}
                            className={`border rounded-md overflow-hidden hover:opacity-90 focus:outline-none ${
                              activeImage === u ? "ring-2 ring-primary" : ""
                            }`}
                            onClick={() => setActiveImage(u)}
                            title={`صورة ${i + 1}`}
                          >
                            <img
                              src={u}
                              style={{ width: 90, height: 70, objectFit: "cover" }}
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
