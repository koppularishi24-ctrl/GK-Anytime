import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { buttonVariants } from '../components/ui/button';
import { ExternalLink, Youtube, Play, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const CHANNELS = [
  {
    name: 'TLDR News Global',
    handle: '@TLDRnewsGLOBAL',
    url: 'https://www.youtube.com/@TLDRnewsGLOBAL',
    id: 'UC_gUM8rL-Lrg6O3adPW9K1g', // Just a fallback id, handles preferred
    description: 'Concise, independent news explaining the big stories from around the world without the fluff.',
    color: 'bg-blue-600',
    tags: ['Global Politics', 'Explained', 'Unbiased']
  },
  {
    name: 'WION',
    handle: 'World is One News',
    url: 'https://www.youtube.com/channel/UC_gUM8rL-Lrg6O3adPW9K1g',
    description: 'International news from an Indian perspective, covering geopolitics and global shifts in real-time.',
    color: 'bg-red-600',
    tags: ['Indian Perspective', 'Geopolitics', 'Live News']
  },
  {
    name: 'Firstpost',
    handle: '@Firstpost',
    url: 'https://www.youtube.com/@Firstpost',
    description: 'Sharp, in-depth analysis on global politics and world events, featuring popular segments like Vantage with Palki Sharma.',
    color: 'bg-orange-600',
    tags: ['Global South', 'Geopolitics', 'Vantage']
  },
  {
    name: 'BBC News',
    handle: 'Global Leader',
    url: 'https://www.youtube.com/channel/UC16niRr50-MSBwiO3YDb3RA',
    description: 'Trusted world news, documentaries, and investigative reports from the global broadcaster.',
    color: 'bg-gray-800',
    tags: ['Verified', 'Documentaries', 'World News']
  }
];

export default function Videos() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-100 text-red-600 mb-4 animate-pulse">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Recommended Channels</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Elite GK & Current Affairs Videos</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We've curated the best sources for competitive exam aspirants. Stay updated with high-quality visual content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CHANNELS.map((channel, index) => (
          <motion.div
            key={channel.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full group hover:shadow-xl transition-all duration-300 border-2 overflow-hidden flex flex-col">
              <div className={`h-3 ${channel.color}`} />
              <CardHeader className="relative pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{channel.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1 font-medium">
                       <Youtube className="h-3 w-3 text-red-600" />
                       {channel.handle}
                    </CardDescription>
                  </div>
                  <div className="p-3 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors">
                     <Play className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pt-0">
                <div>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    {channel.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {channel.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold px-3 py-1 bg-muted rounded-full border border-border/50 uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href={channel.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "default", size: "default" }),
                      "flex-1 h-12 gap-2 font-bold shadow-md hover:shadow-lg transition-all"
                    )}
                  >
                    Visit Channel <ExternalLink className="h-4 w-4" />
                  </a>
                  <a 
                    href={`https://www.youtube.com/results?search_query=${channel.name}+latest+news`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "h-12 w-12"
                    )}
                  >
                    <span className="sr-only">Search latest news for {channel.name}</span>
                    <Info className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-3xl bg-primary/5 border-2 border-primary/10">
         <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-primary text-white p-6 rounded-3xl shrink-0 shadow-lg shadow-primary/20">
               <Youtube className="h-12 w-12" />
            </div>
            <div>
               <h3 className="text-2xl font-bold mb-2">Visual Learning for UPSC/SSC</h3>
               <p className="text-lg text-muted-foreground leading-relaxed">
                  Watching daily analysis from these channels helps in better retention of geopolitical concepts and International Relations (IR), which are crucial for Tier 2 and Interview stages.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
