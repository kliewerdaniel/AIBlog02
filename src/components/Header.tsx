import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="py-6 border-b border-subtle mb-8">
      <div className="container flex justify-between items-center">
        <div>
          <Link href="/" className="font-serif text-2xl font-bold no-underline hover:text-gray-900 dark:hover:text-gray-50">
            Monochrome
          </Link>
        </div>
        
        <div className="flex items-center space-x-8">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 no-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 no-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
