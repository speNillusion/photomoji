import React, { useState, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface InputAreaProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
      <div className="p-4">
        <label htmlFor="parser-input" className="sr-only">Input text</label>
        <textarea
          id="parser-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter text to parse..."
          className="w-full min-h-[120px] resize-none outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-lg leading-relaxed bg-transparent"
          disabled={isLoading}
        />
      </div>
      <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          Press Enter to send
        </span>
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className={`
            flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all
            ${!input.trim() || isLoading
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-lg active:scale-95'}
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Send</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
