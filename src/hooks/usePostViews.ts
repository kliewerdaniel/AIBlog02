'use client';

import { useState, useEffect } from 'react';

interface UsePostViewsOptions {
  postId: string;
  incrementOnMount?: boolean;
}

export function usePostViews({ postId, incrementOnMount = true }: UsePostViewsOptions) {
  const [views, setViews] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock function for fetching views
  const fetchViews = async () => {
    // Return a random number between 10 and 100 for views
    setViews(Math.floor(Math.random() * 90) + 10);
    setLoading(false);
  };

  // Mock function for incrementing views
  const incrementViews = async () => {
    // Return a random number between 10 and 100 for views
    setViews(Math.floor(Math.random() * 90) + 10);
    setLoading(false);
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
