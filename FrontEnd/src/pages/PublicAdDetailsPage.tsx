import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
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
} from "lucide-react";

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

// Use the correct environment variable for the base URL
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
    // Remove duplicates and maintain order
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
      <div className="min-h-screen pt-20">
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
      <div className="min-h-screen pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Advertisement not found.</p>
          <div className="mt-6">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <Navbar />

      {/* Hero */}
      <section className="py-12 md:py-16 bg-background ">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {ad.title}
            </h1>
            <div className="flex items-center gap-2">
            
              {ad.categoryName && <Badge   className="bg-green-500">{ad.categoryName}</Badge>}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Published: {new Date(ad.createdAt).toLocaleDateString()}</span>
            </div>
            {ad.expirationDate && (
              <div className="flex items-center">
                <Timer className="w-4 h-4 mr-2" />
                <span>Expires: {new Date(ad.expirationDate).toLocaleDateString()}</span>
              </div>
            )}
            {ad.clientName && (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Client: {ad.clientName}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content + Gallery + Client Info */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <ScrollAnimatedSection>
                <Card className="shadow-elegant">
                  <CardContent className="p-6 space-y-4">
                    {/* Short Description/Content */}
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-foreground">About this advertisement</h2>
                      <p className="text-muted-foreground leading-relaxed">{ad.content || "—"}</p>
                    </div>

                    {/* Long Description */}
                    {ad.longDescription && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">More details</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {ad.longDescription}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>

              {/* Image Gallery */}
              <ScrollAnimatedSection animation="slide-in-up" delay={100}>
                <Card className="shadow-elegant mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Images className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">Gallery</h3>
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
                          No images available
                        </div>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {gallery.length > 1 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {gallery.map((u, i) => (
                          <button
                            key={i}
                            className={`border rounded-md overflow-hidden hover:opacity-90 focus:outline-none ${
                              activeImage === u ? "ring-2 ring-primary" : ""
                            }`}
                            onClick={() => setActiveImage(u)}
                            title={`Image ${i + 1}`}
                          >
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
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

            {/* Client Info and Links */}
            <div className="md:col-span-1">
              <ScrollAnimatedSection animation="slide-in-right">
                <Card className="shadow-elegant sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Client Information</h3>

                    <div className="space-y-3 text-sm text-muted-foreground">
                      {ad.clientName && (
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          <span>{ad.clientName}</span>
                        </div>
                      )}

                      {ad.clientUrl && (
                        <div className="flex items-center">
                          <LinkIcon className="w-4 h-4 mr-2" />
                          <a href={ad.clientUrl} target="_blank" rel="noreferrer" className="underline">
                            Client Link
                          </a>
                        </div>
                      )}

                      {ad.clientWebsite && (
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2" />
                          <a href={ad.clientWebsite} target="_blank" rel="noreferrer" className="underline">
                            Website
                          </a>
                        </div>
                      )}

                      {ad.clientContactEmail && (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          <a href={`mailto:${ad.clientContactEmail}`} className="underline">
                            {ad.clientContactEmail}
                          </a>
                        </div>
                      )}

                      {ad.clientContactPhone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <a href={`tel:${ad.clientContactPhone}`} className="underline">
                            {ad.clientContactPhone}
                          </a>
                        </div>
                      )}

                      {ad.clientAddress && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{ad.clientAddress}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <Link to="/advertisements">
                        <Button variant="outline" className="w-full gradient-hero">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Advertisements
                        </Button>
                      </Link>
                    </div>
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