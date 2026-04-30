import { useState, useEffect } from 'react';
import { Button, buttonVariants } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { generateCategoryNews, hasApiKey } from '../lib/gemini';
import { format } from 'date-fns';
import { Newspaper, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface NewsItem {
  headline: string;
  summary: string;
  url: string;
}

const CATEGORIES = [
  'National News (India)',
  'International Affairs',
  'Economy & Business',
  'Science & Technology',
  'Environment & Ecology',
  'Sports & Awards',
  'Defense & Security',
  'Polity & Governance',
  'Dark Web Crimes',
  'Horror',
  'Movies',
  'Gaming'
];

export default function CategoryNews() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const today = new Date();
  const dateString = format(today, 'EEEE, MMMM do, yyyy');

  const fetchNews = async (category: string) => {
    if (!hasApiKey()) {
      alert("Please add your Gemini API Key in Settings to explore news.");
      return;
    }

    setSelectedCategory(category);
    setLoading(true);
    setNews(null);
    setError(null);

    try {
      const result = await generateCategoryNews(category, dateString);
      setNews(result);
    } catch (err: any) {
      console.error("Category News Error:", err);
      setError(err.message || "Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Live Category Explorer</h1>
        <p className="text-xl text-muted-foreground">Get instant updates for <span className="font-semibold text-primary">{dateString}</span> based on your interests.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            className="h-20 text-center flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            onClick={() => fetchNews(cat)}
            disabled={loading}
          >
            <span className="font-bold text-sm tracking-tight">{cat}</span>
            {selectedCategory === cat && !loading && <motion.div layoutId="active" className="h-1 w-8 bg-white/50 rounded-full mt-1" />}
          </Button>
        ))}
      </div>

      {error && !loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="bg-destructive/10 border-2 border-destructive/20 text-destructive p-8 rounded-3xl text-center mb-10"
        >
          <p className="text-xl font-bold mb-2">Oops! Something went wrong</p>
          <p className="text-lg opacity-80">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => selectedCategory && fetchNews(selectedCategory)}>
            Try Again
          </Button>
        </motion.div>
      )}

      {loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
              </div>
              <p className="text-muted-foreground font-medium text-lg">Scanning latest updates for {selectedCategory}...</p>
            </div>
          </div>
          <div className="grid gap-6">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </div>
      )}

      {selectedCategory && !loading && news && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-4 border-b pb-4">
             <h2 className="text-2xl font-bold flex items-center gap-2">
                <Newspaper className="h-6 w-6 text-primary" />
                {selectedCategory} Highlights
             </h2>
             <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                {news.length} Items Found
             </span>
          </div>

          {news.length > 0 ? (
            <div className="grid gap-6">
              {news.map((item, index) => (
                <Card key={index} className="overflow-hidden border-2 hover:border-primary/30 transition-colors">
                  <CardHeader className="bg-muted/30 pb-3">
                    <CardTitle className="text-xl font-bold leading-tight">{item.headline}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground leading-relaxed text-lg">{item.summary}</p>
                    <div className="mt-4 flex justify-end">
                       <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 group font-medium")}
                       >
                          View details <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                       </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
              <p className="text-muted-foreground italic text-lg">No significant news developments found for this category yet today.</p>
              <Button variant="link" onClick={() => setSelectedCategory(null)} className="mt-4">Try another category</Button>
            </div>
          )}
        </motion.div>
      )}

      {!selectedCategory && !loading && (
         <div className="text-center py-24 opacity-50">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-medium italic">Select a category above to see what's happening today</p>
         </div>
      )}
    </div>
  );
}
