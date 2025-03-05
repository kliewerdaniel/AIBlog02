import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-6 border-b border-primary mb-8">
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold no-underline hover:text-accent">
          Minimalist Blog
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-accent no-underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent no-underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent no-underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
