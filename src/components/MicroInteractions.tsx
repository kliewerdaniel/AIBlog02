'use client';

import { ReactNode, useState, InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Enhanced button with hover and press animations
interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: AnimatedButtonProps) {
  // Base styles
  let baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-md'
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 focus:ring-gray-500 dark:focus:ring-gray-400',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-400 dark:focus:ring-gray-500',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-400 dark:focus:ring-gray-500',
    text: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-400 dark:focus:ring-gray-500'
  };
  
  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;
  
  return (
    <motion.button
      className={buttonStyles}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...(props as any)}
    >
      {icon && iconPosition === 'left' && (
        <motion.span 
          className="mr-2"
          initial={{ x: 0 }}
          whileHover={{ x: -2 }}
        >
          {icon}
        </motion.span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <motion.span 
          className="ml-2"
          initial={{ x: 0 }}
          whileHover={{ x: 2 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  );
}

// Enhanced input with focus animations
interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

export function AnimatedInput({
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <motion.label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          animate={{
            y: isFocused ? -2 : 0,
            color: isFocused 
              ? 'var(--accent)' 
              : props.value 
                ? 'var(--foreground)' 
                : 'var(--muted)'
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <input
          className={`w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none transition-colors duration-200 ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gray-800 dark:bg-gray-200 rounded"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {error && (
        <motion.p
          className="mt-1 text-sm text-red-500 dark:text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Enhanced textarea with focus animations
interface AnimatedTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

export function AnimatedTextarea({
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <motion.label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          animate={{
            y: isFocused ? -2 : 0,
            color: isFocused 
              ? 'var(--accent)' 
              : props.value 
                ? 'var(--foreground)' 
                : 'var(--muted)'
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <textarea
          className={`w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none transition-colors duration-200 ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gray-800 dark:bg-gray-200 rounded"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {error && (
        <motion.p
          className="mt-1 text-sm text-red-500 dark:text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Enhanced navigation link with hover effects
interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  isActive?: boolean;
  underlineEffect?: 'slide' | 'grow' | 'fade' | 'none';
}

export function AnimatedLink({
  href,
  children,
  className = '',
  activeClassName = '',
  isActive,
  underlineEffect = 'slide'
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Underline animation variants
  const underlineVariants = {
    slide: {
      initial: { width: 0, left: 0, right: 'auto' },
      hover: { width: '100%', left: 0, right: 'auto' },
      active: { width: '100%', left: 0, right: 'auto' }
    },
    grow: {
      initial: { width: 0, left: '50%', right: '50%' },
      hover: { width: '100%', left: 0, right: 0 },
      active: { width: '100%', left: 0, right: 0 }
    },
    fade: {
      initial: { opacity: 0, width: '100%' },
      hover: { opacity: 1, width: '100%' },
      active: { opacity: 1, width: '100%' }
    },
    none: {
      initial: { opacity: 0 },
      hover: { opacity: 0 },
      active: { opacity: 0 }
    }
  };
  
  const selectedVariant = underlineVariants[underlineEffect];
  const state = isActive ? 'active' : isHovered ? 'hover' : 'initial';
  
  return (
    <Link 
      href={href} 
      className={`relative inline-block py-2 px-1 no-underline ${className} ${isActive ? activeClassName : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="relative z-10"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-gray-800 dark:bg-gray-200"
        initial={selectedVariant.initial}
        animate={selectedVariant[state]}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

// Enhanced card with hover effects
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'scale' | 'border' | 'shadow' | 'none';
  clickEffect?: boolean;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className = '',
  hoverEffect = 'lift',
  clickEffect = true,
  onClick
}: AnimatedCardProps) {
  // Hover animation variants
  const hoverVariants = {
    lift: { y: -8 },
    scale: { scale: 1.02 },
    border: { borderColor: 'var(--accent)' },
    shadow: { boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
    none: {}
  };
  
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-200 ${className}`}
      whileHover={hoverVariants[hoverEffect]}
      whileTap={clickEffect ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
