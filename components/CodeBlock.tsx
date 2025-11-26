import React from 'react';
import { CodeSnippet } from '../types';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  snippet: CodeSnippet;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ snippet }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-white/10 bg-[#0d0d14] shadow-2xl">
      {snippet.caption && (
        <div className="bg-[#1a1a24] px-4 py-2 text-xs font-mono text-gray-400 border-b border-white/5 flex justify-between items-center">
          <span>{snippet.caption}</span>
          <span className="uppercase text-neon-cyan/50">{snippet.language}</span>
        </div>
      )}
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 p-2 rounded-md bg-white/5 hover:bg-white/10 transition-opacity opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
        </button>
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
          <code className="text-gray-300">
            {snippet.code.split('\n').map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell select-none text-gray-700 text-right pr-4 w-8">{i + 1}</span>
                <span className="table-cell whitespace-pre">
                  {/* Simple manual highlighting simulation for specific keywords */}
                  {line.split(' ').map((word, wIdx) => {
                    const keywords = ['public', 'private', 'interface', 'class', 'extends', 'implements', 'return', 'if', 'else', 'for', 'while', 'import', 'package', 'void', 'new'];
                    const annotations = ['@Query', '@Param', '@Test', '@Override'];
                    const types = ['String', 'Integer', 'Long', 'List', 'Map', 'Optional', 'BigDecimal', 'LocalDate', 'Page', 'User', 'JpaRepository'];
                    
                    let className = "text-gray-300";
                    if (keywords.includes(word)) className = "text-neon-purple";
                    else if (annotations.some(a => word.startsWith(a))) className = "text-yellow-400";
                    else if (types.includes(word) || /^[A-Z]/.test(word)) className = "text-neon-cyan";
                    else if (word.includes('"') || word.includes("'")) className = "text-green-400";
                    else if (word.startsWith("//")) return <span key={wIdx} className="text-gray-500 italic">{word} </span>;

                    return <span key={wIdx} className={className}>{word} </span>;
                  })}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};