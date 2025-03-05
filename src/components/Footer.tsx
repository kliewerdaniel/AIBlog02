import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-subtle mt-12 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">About</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A monochromatic black and white blog focused on clean design and readability.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://twitter.com" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-subtle text-sm text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {currentYear} Monochrome Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
