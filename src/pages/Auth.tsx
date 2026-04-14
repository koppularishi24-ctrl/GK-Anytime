import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const humorousMessages = [
  "Login? Where we're going, we don't need logins. 🚀",
  "Plot twist: You're already VIP here. No account required! 🎩",
  "We thought about making you remember another password, but decided to spare you. You're welcome. 😌",
  "Congratulations! You've unlocked the 'No Login Needed' achievement. 🏆",
  "Why login when you can just start learning? The knowledge is free and open! 🧠",
  "Our bouncer is on vacation. Come right in, no ID required! 🏖️",
  "Error 404: Login wall not found. Please proceed directly to the fun stuff. 🚧",
  "We trust you. No need to prove you're not a robot today. 🤖",
];

export default function Auth() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * humorousMessages.length);
    setMessage(humorousMessages[randomIndex]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Hold up!</CardTitle>
            <CardDescription className="text-lg text-foreground font-medium px-4">
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-6 pb-8 text-center">
            <p className="text-muted-foreground mb-4">
              You can explore dates and generate quizzes completely anonymously.
            </p>
            <Button 
              size="lg" 
              className="w-full h-12 text-lg" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back to Exploring
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
