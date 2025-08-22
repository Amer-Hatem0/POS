import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Calendar, MapPin, Search } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "@/lib/axios";
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const ASSET_BASE = import.meta.env.VITE_API_BASE_URL1 as string;
const resolveUrl = (u?: string | null) => (!u ? "" : /^https?:\/\//i.test(u) ? u : `${ASSET_BASE}${u}`);

type Advertisement = {
  id: number;
  title: string;
  content: string;
  clientName?: string | null;
  imageUrl?: string | null;
  mediaUrls: string[];
  isPublished: boolean;
  createdAt: string;
  categoryName?: string | null;
};

const INITIAL_ADS_COUNT = 6;

const Advertisements = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [visibleAdsCount, setVisibleAdsCount] = useState(INITIAL_ADS_COUNT);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/advertisement");
        const mapped: Advertisement[] = (res.data || []).map((x: any) => ({
          id: x.id,
          title: x.title,
          content: x.content,
          clientName: x.clientName,
          imageUrl: x.imageUrl,
          mediaUrls: Array.isArray(x.mediaUrls) ? x.mediaUrls : [],
          isPublished: x.isPublished,
          createdAt: x.createdAt,
          categoryName: x.categoryName
        }));
        setAds(mapped);
        const uniqueCategories = Array.from(new Set(mapped.map(ad => ad.categoryName).filter(Boolean))) as string[];
        setCategories(uniqueCategories);
      } catch (e) {
        console.error("Error fetching advertisements", e);
      }
    })();
  }, []);

  const handleOpen = (id: number) => {
    navigate(`/ads/${id}`);
  };

  const handleShowMore = () => {
    setVisibleAdsCount(prevCount => prevCount + 6);
  };

  const filteredAndSortedAds = useMemo(() => {
    let result = [...ads];

    if (searchTerm) {
      result = result.filter(ad =>
        ad.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(ad => ad.categoryName === selectedCategory);
    }

    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return result;
  }, [ads, searchTerm, selectedCategory, sortBy]);

  const adsToShow = filteredAndSortedAds.slice(0, visibleAdsCount);

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      <section className="py-20 bg-gradient-t from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Advertisement Campaigns</h1>
              <p className="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Expert social media management, targeted ad campaigns, and strong brand identity design that sets you apart.
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Featured Campaigns</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real campaigns with real results that showcase our expertise
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="flex flex-col md:flex-row gap-4 mb-12 items-center">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="     Search by name..."
                className="pl-10 pr-4 w-full"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleAdsCount(INITIAL_ADS_COUNT);
                }}
              />
            </div>
            
            <div className="flex gap-4 w-full md:w-2/3 justify-end">
              <Select onValueChange={(value) => {
                setSortBy(value);
                setVisibleAdsCount(INITIAL_ADS_COUNT);
              }} value={sortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => {
                setSelectedCategory(value);
                setVisibleAdsCount(INITIAL_ADS_COUNT);
              }} value={selectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="mb-8" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adsToShow.length > 0 ? (
              adsToShow.map((ad, index) => {
                const cover = ad.imageUrl || ad.mediaUrls?.[0] || null;
                return (
                  <ScrollAnimatedSection
                    key={ad.id}
                    animation={index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}
                    delay={index * 100}
                  >
                    <Card
                      className="h-full flex flex-col shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-t-lg">
                        {cover ? (
                          <img
                            src={resolveUrl(cover)}
                            alt={ad.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary">
                            {new Date(ad.createdAt).getFullYear()}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-2 text-foreground">{ad.title}</h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                            {ad.content}
                          </p>
                          <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                            {ad.clientName && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>Client: {ad.clientName}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>Published: {new Date(ad.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          className="w-full mt-4 gradient-primary"
                          onClick={(e) => { e.stopPropagation(); handleOpen(ad.id); }}
                        >
                          View Case Study
                        </Button>
                      </CardContent>
                    </Card>
                  </ScrollAnimatedSection>
                );
              })
            ) : (
              <div className="col-span-full text-center text-muted-foreground text-xl">
                No matching advertisements found.
              </div>
            )}
          </div>

          {filteredAndSortedAds.length > adsToShow.length && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-primary"
                onClick={handleShowMore}
              >
                Show More Advertisements
              </Button>
            </div>
          )}
        </div>
      </section>
 
      <section className="py-20 bg-gradient-t from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's create a custom marketing strategy that delivers real results for your business
            </p>
            <Button size="lg" variant="outline" className="border-2 gradient-hero border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              Start Your Campaign Today
            </Button>
          </ScrollAnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Advertisements;
