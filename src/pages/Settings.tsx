import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Key, Save, Trash2, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('user_gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('user_gemini_api_key', apiKey.trim());
      setIsSaved(true);
      alert('API Key saved locally. Your browser will now use this key for AI features.');
    }
  };

  const handleClear = () => {
    localStorage.removeItem('user_gemini_api_key');
    setApiKey('');
    setIsSaved(false);
    alert('API Key removed.');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">App Settings</h1>
          <p className="text-muted-foreground">Configure your personal preferences and API connections.</p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Gemini AI Configuration</CardTitle>
            </div>
            <CardDescription>
              To keep this app free and functional, you can use your own Gemini API key.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Your Gemini API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Paste your API key here (AIza...)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono"
                />
                {isSaved ? (
                  <Button variant="outline" onClick={handleClear} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-2">
                <ShieldCheck className="h-3 w-3 mr-1 text-green-500" />
                This key is stored strictly on your local device and never sent to our servers.
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border text-sm space-y-3">
              <h4 className="font-bold">How to get a free key?</h4>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">Google AI Studio <ExternalLink className="h-3 w-3 ml-1" /></a></li>
                <li>Sign in with your Google account.</li>
                <li>Click on "Create API key".</li>
                <li>Copy the key and paste it above!</li>
              </ol>
            </div>

            {isSaved && (
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleSave}>
                  Update Key
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
