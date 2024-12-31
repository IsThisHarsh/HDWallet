import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
import { cn } from '../lib/utils';

export function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useWalletStore();

  return (
    <button
      onClick={toggleDarkMode}
      className={cn(
        'p-2 rounded-lg transition-colors',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'focus:outline-none focus:ring-2 focus:ring-primary-500'
      )}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}