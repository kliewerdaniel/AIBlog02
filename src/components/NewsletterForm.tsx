'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedInput, AnimatedButton } from './MicroInteractions';
import { Spinner } from './LoadingStates';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }
    
    setStatus('loading');
    
    try {
      // In a real application, this would call an API endpoint
      // For demo purposes, we'll simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <motion.h3 
        className="text-xl font-serif font-semibold mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Newsletter
      </motion.h3>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <AnimatedInput
          id="email"
          type="email"
          label="Email address"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          error={status === 'error' ? message : ''}
        />
        
        <AnimatedButton
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          variant="primary"
          fullWidth
          icon={status === 'loading' ? <Spinner size="sm" color="white" /> : undefined}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </AnimatedButton>
        
        {status === 'success' && message && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-green-600 dark:text-green-400"
          >
            {message}
          </motion.p>
        )}
      </form>
    </div>
  );
}
