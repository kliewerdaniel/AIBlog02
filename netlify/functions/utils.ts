import { HandlerEvent, HandlerResponse } from '@netlify/functions';

// Types
export interface RateLimitRecord {
  count: number;
  timestamp: number;
}

// Environment variables
export const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    console.warn(`Environment variable ${name} is not set`);
    return '';
  }
  return value;
};

// CORS headers
export const corsHeaders = (() => {
  const allowedOrigins = process.env.CORS_ALLOWED_ORIGIN?.split(',') || ['http://localhost:3000'];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigins[0], // Default to first origin
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin', // Important when using dynamic origins
  };
})();

// Dynamic CORS headers based on request origin
export const getCorsHeadersForOrigin = (requestOrigin?: string) => {
  if (!requestOrigin) return corsHeaders;
  
  const allowedOrigins = process.env.CORS_ALLOWED_ORIGIN?.split(',') || ['http://localhost:3000'];
  const isAllowed = allowedOrigins.includes(requestOrigin);
  
  return {
    ...corsHeaders,
    'Access-Control-Allow-Origin': isAllowed ? requestOrigin : corsHeaders['Access-Control-Allow-Origin'],
  };
};

// Response helpers
export const successResponse = (data: any, event?: HandlerEvent): HandlerResponse => {
  const headers = event 
    ? getCorsHeadersForOrigin(event.headers.origin || event.headers.Origin)
    : corsHeaders;
    
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  };
};

export const errorResponse = (statusCode: number, message: string, event?: HandlerEvent): HandlerResponse => {
  const headers = event 
    ? getCorsHeadersForOrigin(event.headers.origin || event.headers.Origin)
    : corsHeaders;
    
  return {
    statusCode,
    headers,
    body: JSON.stringify({ error: message }),
  };
};

// Handle OPTIONS requests for CORS preflight
export const handleOptions = (event?: HandlerEvent): HandlerResponse => {
  const headers = event 
    ? getCorsHeadersForOrigin(event.headers.origin || event.headers.Origin)
    : corsHeaders;
    
  return {
    statusCode: 204,
    headers,
    body: '',
  };
};

// Input validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: any, fieldName: string): string | null => {
  if (!value) {
    return `${fieldName} is required`;
  }
  return null;
};

// Simple in-memory rate limiting (note: this won't work across function invocations)
// For production, use a database or Redis to store rate limit data
const rateLimitStore: Record<string, RateLimitRecord> = {};

export const checkRateLimit = (
  ip: string,
  limit: number = 5,
  windowMs: number = 60000
): boolean => {
  const now = Date.now();
  const record = rateLimitStore[ip] || { count: 0, timestamp: now };
  
  // Reset if window has passed
  if (now - record.timestamp > windowMs) {
    record.count = 1;
    record.timestamp = now;
  } else {
    record.count += 1;
  }
  
  rateLimitStore[ip] = record;
  return record.count <= limit;
};

// Extract client IP from event
export const getClientIp = (event: HandlerEvent): string => {
  return event.headers['client-ip'] || 
         event.headers['x-forwarded-for'] || 
         'unknown-ip';
};

// Parse and validate request body
export const parseBody = <T>(event: HandlerEvent): T | null => {
  try {
    if (!event.body) return null;
    return JSON.parse(event.body) as T;
  } catch (error) {
    return null;
  }
};
