import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Skeleton } from '../components/ui/skeleton';
import { generateDateGK, hasApiKey } from '../lib/gemini';
import { format, isValid, parseISO } from 'date-fns';
import { Copy, Check, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventData {
  category: string;
  description: string;
}

export default function DateExplorer() {
  const [date, setDate] = useState('');
  const [exploredDate, setExploredDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EventData[] | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    setError(null);

    if (!hasApiKey()) {
      alert("Please add your Gemini API Key in Settings to explore events.");
      return;
    }
    
    // Parse date properly to avoid timezone shifts
    const parts = date.split('-');
    let parsedDate = new Date(date);
    if (parts.length === 3) {
      parsedDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    
    if (!isValid(parsedDate)) {
      setError('Please enter a valid date.');
      return;
    }
    
    setLoading(true);
    try {
      const formattedDate = format(parsedDate, 'EEEE, MMMM do, yyyy');
      const result = await generateDateGK(formattedDate);
      
      if (result.length === 0) {
        setData([]);
        setExploredDate(parsedDate);
      } else {
        setData(result);
        setExploredDate(parsedDate);
      }
    } catch (err: any) {
      console.error("Exploration Error:", err);
      const errorMessage = err?.message || String(err);
      
      if (errorMessage.includes("API key") || errorMessage.includes("401") || errorMessage.includes("invalid")) {
        setError("Your Gemini API Key is missing, invalid, or expired. Please check your Settings page.");
      } else if (errorMessage.includes("quota") || errorMessage.includes("429")) {
        setError(errorMessage);
      } else {
        setError(`Failed to generate content: ${errorMessage.substring(0, 50)}...`);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!data) return;
    const text = data.map(event => `${event.category}: ${event.description}`).join('\n\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Date-Based GK Explorer</h1>
        <p className="text-muted-foreground">Select any date to discover significant historical events.</p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleExplore} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="date">Select Date</Label>
              <Input 
                type="date" 
                id="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                required
                className="h-12"
              />
            </div>
            <Button type="submit" disabled={loading || !date} className="h-12 px-8 w-full sm:w-auto">
              {loading ? 'Generating...' : 'Explore Events'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && !loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="bg-destructive/10 border-2 border-destructive/20 text-destructive p-6 rounded-2xl text-center mb-8"
        >
          <p className="font-bold mb-1">Error</p>
          <p className="text-sm opacity-80">{error}</p>
        </motion.div>
      )}

      {loading && (
        <div className="space-y-6">
          <div className="flex justify-center mb-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
              <p className="text-muted-foreground font-medium">Unearthing history...</p>
            </div>
          </div>
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      )}

      {data && !loading && exploredDate && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-primary" />
                Key Events from {format(exploredDate, 'MMMM do, yyyy')}:
              </CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              {data.length > 0 ? (
                <div className="space-y-8">
                  <ul className="space-y-6">
                    {data.map((event, index) => (
                      <li key={index} className="flex items-start text-lg">
                        <span className="mr-3 text-primary mt-1.5 text-xl">•</span>
                        <span className="leading-relaxed">
                          <strong className="font-bold text-foreground">{event.category}:</strong>{' '}
                          <span className="text-muted-foreground">{event.description}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground italic text-center py-8">No major events found for this specific date.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
