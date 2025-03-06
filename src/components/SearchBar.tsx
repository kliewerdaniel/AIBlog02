'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedInput } from './MicroInteractions';
import { Spinner } from './LoadingStates';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Close search results when clicking outside
  useEffect(() => {
    if (!isMounted) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMounted]);
  
  // Debounced search
  useEffect(() => {
    if (!isMounted) return;
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, isMounted]);
  
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/.netlify/functions/search?q=${encodeURIComponent(searchQuery)}&limit=5`
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }
      
      setResults(data.results || []);
      setIsOpen(true);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };
  
  if (!isMounted) {
    return (
      <div className="relative w-full max-w-md">
        <div className="relative">
          <input
            type="search"
            placeholder="Search articles..."
            className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none transition-colors duration-200"
            disabled
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <AnimatedInput
            id="search"
            type="search"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {isSearching ? (
              <Spinner size="sm" color="secondary" />
            ) : (
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>
        </div>
      </form>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {error ? (
              <div className="p-4 text-red-500 dark:text-red-400 text-sm">
                {error}
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                No results found
              </div>
            ) : (
              <div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((result) => (
                    <li key={result.id}>
                      <Link
                        href={result.url}
                        className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {result.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {result.excerpt}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {result.date}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="p-2 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => {
                      router.push(`/search?q=${encodeURIComponent(query)}`);
                      setIsOpen(false);
                    }}
                    className="w-full text-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-1"
                  >
                    View all results
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
