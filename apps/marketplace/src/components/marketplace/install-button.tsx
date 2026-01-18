'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface InstallButtonProps {
  packageName: string;
}

export function InstallButton({ packageName }: InstallButtonProps) {
  const [copied, setCopied] = useState(false);
  const command = `ostack add ${packageName}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 px-4 py-2 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm">
        {command}
      </div>
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        title="Copy to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}
