import React from 'react';
import { Copy, Check, Terminal, AlertCircle } from 'lucide-react';

interface ResultDisplayProps {
  result: string | null;
  error: string | null;
  isLoading: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error, isLoading }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!result && !error && !isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
        <Terminal className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-sm font-medium">Ready to parse content</p>
        <p className="text-xs mt-1 opacity-70">Output will appear here</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">Request Failed</h3>
          <p className="text-sm text-red-600 dark:text-red-300 mt-1 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group w-full ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-300 to-indigo-300 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Output</span>
          </div>
          {result && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
        <div className="p-6 bg-white dark:bg-slate-900">
          <pre className="whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-300 text-lg leading-relaxed break-words">
            {result || (isLoading ? "Thinking..." : "")}
          </pre>
        </div>
      </div>
    </div>
  );
};
