'use client';

import { useState, useEffect } from 'react';

interface UsePostViewsOptions {
  postId: string;
  incrementOnMount?: boolean;
}

export function usePostViews({ postId, incrementOnMount = true }: UsePostViewsOptions) {
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the current view count
  const fetchViews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/.netlify/functions/postViews?postId=${encodeURIComponent(postId)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch view count');
      }
      
      setViews(data.views);
      setError(null);
    } catch (err) {
      console.error('Error fetching post views:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Increment the view count
  const incrementViews = async () => {
    try {
      const response = await fetch('/.netlify/functions/postViews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to increment view count');
      }
      
      setViews(data.views);
      setError(null);
    } catch (err) {
      console.error('Error incrementing post views:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // On mount, increment the view count if specified
  useEffect(() => {
    if (incrementOnMount) {
      incrementViews();
    } else {
      fetchViews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, incrementOnMount]);

  return {
    views,
    loading,
    error,
    incrementViews,
    fetchViews,
  };
}
