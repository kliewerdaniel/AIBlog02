'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { AnimatedLink } from './MicroInteractions';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <AnimatedLink 
      href={href}
      isActive={isActive}
      className={isActive 
        ? 'text-gray-900 dark:text-gray-50 font-medium' 
        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50'
      }
      activeClassName="font-medium"
      underlineEffect="grow"
    >
      {children}
    </AnimatedLink>
  );
}
