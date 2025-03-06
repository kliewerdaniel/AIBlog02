'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedLink, AnimatedCard } from '@/components/MicroInteractions';
import { Spinner } from '@/components/LoadingStates';
import SearchBar from '@/components/SearchBar';

// Add dynamic export configuration
export const dynamic = 'force-dynamic';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const tag = searchParams?.get('tag') || '';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    if (!query && !tag) return;
    
    const performSearch = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Use relative URL to avoid window.location issues during SSR
        const searchUrl = `/.netlify/functions/search${query ? `?q=${encodeURIComponent(query)}` : ''}${tag ? `${query ? '&' : '?'}tag=${encodeURIComponent(tag)}` : ''}`;
        
        const response = await fetch(searchUrl);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Search failed');
        }
        
        setResults(data.results || []);
      } catch (err) {
        console.error('Search error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [query, tag, isMounted]);
  
  // Show a loading state until client-side code is ready
  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <AnimatedLink href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </AnimatedLink>
        
        <motion.h1 
          className="text-3xl font-serif font-bold mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tag ? `Posts tagged with "${tag}"` : `Search results for "${query}"`}
        </motion.h1>
        
        <div className="mb-8">
          <SearchBar />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <motion.div
          className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      ) : results.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            No results found for {tag ? `tag "${tag}"` : `"${query}"`}
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Try a different search term or browse our <Link href="/tags" className="text-gray-900 dark:text-gray-100 underline">tags</Link>.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedCard hoverEffect="lift">
                <Link href={result.url} className="block p-6">
                  <h2 className="text-xl font-serif font-semibold mb-2">
                    {result.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {result.date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {result.excerpt}
                  </p>
                </Link>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
