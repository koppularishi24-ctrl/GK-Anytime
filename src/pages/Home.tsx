import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Calendar, BrainCircuit, ArrowRight, CheckCircle2, AlertCircle, Video, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted/50 text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
            Learn History of Any Day in Seconds
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Master General Knowledge <br className="hidden md:block" />
            <span className="text-primary">One Day at a Time</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore significant political, legal, international, and scientific events for any date in history. Test your knowledge with AI-generated quizzes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/explorer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-lg h-12 px-8">
                Explore Any Date Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/category-news" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full text-lg h-12 px-8">
                Category News
                <Newspaper className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="pt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground font-medium">
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
              Trusted by students
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
              Daily GK Practice
            </div>
          </div>

          {/* API Key Instructions for self-hosters */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 rounded-xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900/30 text-left max-w-2xl mx-auto"
          >
            <h3 className="text-sm font-bold text-yellow-800 dark:text-yellow-400 uppercase tracking-wider mb-2 flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              Developer Note: API Key Required
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              To make this app work, you must provide your own <strong>Gemini API Key</strong>. 
              Add it as an environment variable named <code className="bg-yellow-200/50 dark:bg-yellow-800/30 px-1 rounded">GEMINI_API_KEY</code> in your Vercel or local <code className="bg-yellow-200/50 dark:bg-yellow-800/30 px-1 rounded">.env</code> file.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Calendar className="h-6 w-6" />}
            title="Date Explorer"
            description="Discover historical events for any specific day in history."
            link="/explorer"
          />
          <FeatureCard 
            icon={<BrainCircuit className="h-6 w-6" />}
            title="GK Quiz"
            description="Test your knowledge with AI-generated month-specific quizzes."
            link="/quiz"
          />
          <FeatureCard 
            icon={<Newspaper className="h-6 w-6" />}
            title="Category News"
            description="Real-time news highlights for today categorized by your interests."
            link="/category-news"
          />
          <FeatureCard 
            icon={<Video className="h-6 w-6" />}
            title="Video Library"
            description="Curated high-quality video content for GK and Current Affairs."
            link="/videos"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: any, title: string, description: string, link: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all flex flex-col h-full"
    >
      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 flex-1">{description}</p>
      <Link to={link}>
        <Button variant="ghost" className="p-0 h-auto font-bold text-primary hover:text-primary hover:bg-transparent">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
}
