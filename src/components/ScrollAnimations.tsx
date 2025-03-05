'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';

// Fade in on scroll component
export function FadeInOnScroll({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  once = true,
  direction = 'up'
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Set initial and animate values based on direction
  let initial: any = { opacity: 0 };
  if (direction === 'up') initial = { ...initial, y: 50 };
  if (direction === 'down') initial = { ...initial, y: -50 };
  if (direction === 'left') initial = { ...initial, x: 50 };
  if (direction === 'right') initial = { ...initial, x: -50 };
  
  let animate: any = { opacity: 1 };
  if (direction === 'up' || direction === 'down') animate = { ...animate, y: 0 };
  if (direction === 'left' || direction === 'right') animate = { ...animate, x: 0 };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
}

// Parallax effect for images
export function ParallaxImage({ 
  src, 
  alt, 
  className = '',
  strength = 100,
  direction = 'up'
}: { 
  src: string; 
  alt: string;
  className?: string;
  strength?: number;
  direction?: 'up' | 'down';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate parallax effect based on direction
  const factor = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, strength * factor]);
  
  // Add spring physics for smoother motion
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ position: 'relative' }}>
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: springY }}
      >
        <div className="relative w-full h-full">
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

// Sticky element with proper behavior
export function StickyElement({ 
  children, 
  className = '',
  topOffset = '5rem',
  bottomOffset = '5rem',
  zIndex = 10
}: { 
  children: ReactNode; 
  className?: string;
  topOffset?: string;
  bottomOffset?: string;
  zIndex?: number;
}) {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="sticky"
        style={{ 
          top: topOffset, 
          marginBottom: bottomOffset,
          zIndex
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Reveal content on scroll
export function RevealOnScroll({ 
  children, 
  className = '',
  threshold = 0.1,
  once = true
}: { 
  children: ReactNode; 
  className?: string;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Scroll-triggered counter
export function CounterOnScroll({ 
  end, 
  start = 0,
  duration = 1.5,
  prefix = '',
  suffix = '',
  className = '',
  threshold = 0.5,
  once = true
}: { 
  end: number; 
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const count = useTransform(
    useSpring(useTransform(
      useMotionValue(isInView ? 1 : 0),
      [0, 1],
      [start, end]
    ), { stiffness: 100, damping: 30 }),
    value => Math.floor(value)
  );
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0.5 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0.5 }}
    >
      <span>{prefix}</span>
      <motion.span>{count}</motion.span>
      <span>{suffix}</span>
    </motion.div>
  );
}
