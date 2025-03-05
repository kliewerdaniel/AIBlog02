'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedInput, AnimatedButton, AnimatedTextarea } from './MicroInteractions';
import { Spinner } from './LoadingStates';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setStatus('loading');
    setErrorMessage('');
    
    try {
      // Call the Netlify Function
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Success
      setStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.h2 
        className="text-2xl font-serif font-semibold mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get in Touch
      </motion.h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedInput
            id="name"
            name="name"
            label="Your Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'loading'}
            required
          />
          
          <AnimatedInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'loading'}
            required
          />
        </div>
        
        <AnimatedInput
          id="subject"
          name="subject"
          label="Subject"
          placeholder="What's this about?"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === 'loading'}
          required
        />
        
        <AnimatedTextarea
          id="message"
          name="message"
          label="Message"
          placeholder="Your message here..."
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'loading'}
          rows={5}
          required
        />
        
        <div className="flex justify-end">
          <AnimatedButton
            type="submit"
            disabled={status === 'loading'}
            variant="primary"
            icon={status === 'loading' ? <Spinner size="sm" color="white" /> : undefined}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </AnimatedButton>
        </div>
        
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md"
          >
            Thank you for your message! We'll get back to you as soon as possible.
          </motion.div>
        )}
        
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md"
          >
            {errorMessage || 'An error occurred. Please try again.'}
          </motion.div>
        )}
      </form>
    </div>
  );
}
