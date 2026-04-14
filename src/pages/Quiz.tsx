import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { generateQuiz } from '../lib/gemini';
import { RefreshCw, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Quiz() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 50}, (_, i) => (currentYear - i).toString());

  const handleStartQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!month || !year) return;
    
    setLoading(true);
    try {
      const result = await generateQuiz(month, year);
      setQuestions(result);
      setShowAnswers(false);
    } catch (error) {
      console.error(error);
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setShowAnswers(false);
    setMonth('');
    setYear('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Notebook GK Quiz</h1>
        <p className="text-muted-foreground">Generate 20 questions, write answers in your notebook, then reveal the correct answers.</p>
      </div>

      {questions.length === 0 ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Generate a Custom Quiz</CardTitle>
            <CardDescription>Select a timeframe to generate 20 AI-powered GK questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStartQuiz} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <Select value={month} onValueChange={setMonth} required>
                    <SelectTrigger id="month">
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={year} onValueChange={setYear} required>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" disabled={loading || !month || !year} className="w-full h-12 text-lg">
                {loading ? 'Generating 20 Questions...' : 'Generate Questions'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg border">
            <div>
              <h2 className="text-xl font-bold">Quiz: {month} {year}</h2>
              <p className="text-sm text-muted-foreground">Write your answers in a notebook, then click "Show Answers" to check.</p>
            </div>
            <Button variant="outline" onClick={resetQuiz}>
              <RefreshCw className="mr-2 h-4 w-4" />
              New Quiz
            </Button>
          </div>

          <div className="space-y-6">
            {questions.map((q, index) => (
              <Card key={index} className="border-2">
                <CardHeader className={showAnswers ? "pb-3" : ""}>
                  <CardTitle className="text-lg leading-relaxed flex gap-4">
                    <span className="text-primary min-w-[28px]">{index + 1}.</span>
                    <span>{q.question}</span>
                  </CardTitle>
                </CardHeader>
                {showAnswers && (
                  <CardContent>
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-green-500/10 border border-green-500/20 rounded-md p-4 text-green-800 dark:text-green-300"
                    >
                      <span className="font-semibold mr-2">Answer:</span>
                      {q.answer}
                    </motion.div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="sticky bottom-6 flex justify-center mt-8">
            {!showAnswers ? (
              <Button size="lg" className="h-14 px-8 text-lg shadow-xl" onClick={() => setShowAnswers(true)}>
                <Eye className="mr-2 h-5 w-5" />
                Show Answers
              </Button>
            ) : (
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg shadow-xl" onClick={resetQuiz}>
                <RefreshCw className="mr-2 h-5 w-5" />
                Generate New Quiz
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
