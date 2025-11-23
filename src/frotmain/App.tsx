import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { InputArea } from './components/InputArea';
import { ResultDisplay } from './components/ResultDisplay';
import { sendParseRequest } from './services/apiService';
import { ThemeProvider } from './components/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

const AppContent: React.FC = () => {
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendText = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setOutput(null);

    try {
      const result = await sendParseRequest(text);
      setOutput(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="w-full max-w-2xl space-y-8">

        {/* Header */}
        <div className="text-center space-y-2 relative">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 mb-4">
            <Sparkles className="w-6 h-6 text-brand-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Text Parser
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-lg">
            Enter your text below to process it through the local API.
          </p>
        </div>

        {/* Main Interface */}
        <div className="space-y-6">
          <InputArea onSend={handleSendText} isLoading={isLoading} />

          <div className="relative">
            {/* Connecting Line Visual */}
            <div className="absolute left-1/2 -top-6 bottom-full w-px bg-gradient-to-b from-slate-200 dark:from-slate-800 to-transparent -translate-x-1/2 h-6" />

            <ResultDisplay
              result={output}
              error={error}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Connected to <code className="bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 font-mono">localhost:3000</code>
          </p>
        </div>

      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
