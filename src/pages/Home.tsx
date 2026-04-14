import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Calendar, BrainCircuit, ArrowRight, CheckCircle2 } from 'lucide-react';
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
            <Link to="/quiz" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full text-lg h-12 px-8">
                Play GK Quiz
                <BrainCircuit className="ml-2 h-5 w-5" />
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
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Calendar className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold">Date-Based GK Explorer</h2>
            <p className="text-lg text-muted-foreground">
              Select any date and instantly get a structured overview of important events categorized into Political, Legal, International, Economic, Science, and more.
            </p>
            <ul className="space-y-3">
              {['Concise factual bullet points', 'Clearly separated categories', 'AI-powered historical accuracy'].map((feature, i) => (
                <li key={i} className="flex items-center text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border rounded-2xl p-8 shadow-sm"
          >
            <div className="space-y-4">
              <div className="h-8 w-1/3 bg-muted rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-muted rounded animate-pulse"></div>
              </div>
              <div className="pt-4 space-y-2">
                <div className="h-8 w-1/4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
