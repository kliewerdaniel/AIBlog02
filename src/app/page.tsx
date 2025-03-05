import Link from 'next/link';

// Data for the blog posts
const posts = [
  {
    id: 1,
    title: 'The Art of Monochromatic Design',
    date: 'March 5, 2025',
    excerpt: 'Exploring how limiting your color palette to black and white can create stunning, timeless designs that communicate with clarity and elegance.',
  },
  {
    id: 2,
    title: 'Typography in Black & White',
    date: 'March 7, 2025',
    excerpt: 'How serif and sans-serif fonts work together to create visual hierarchy and improve readability in monochromatic design systems.',
  },
  {
    id: 3,
    title: 'Minimalism: Less is More',
    date: 'March 10, 2025',
    excerpt: 'The philosophy behind minimalist design and why removing color can actually enhance the user experience by focusing attention on what matters.',
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <div className="border-b border-subtle pb-8">
        <h1 className="text-5xl font-serif font-bold tracking-tight">Monochrome</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          A sophisticated black and white blog with elegant typography and smooth animations
        </p>
      </div>

      <div className="space-y-16">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="border-b border-subtle pb-12"
          >
            <article>
              <Link href={`/posts/${post.id}`} className="group block">
                <div className="bg-gray-100 dark:bg-gray-800 aspect-video mb-6 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 text-lg">
                    Featured Image Placeholder
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-colors duration-200">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {post.excerpt}
              </p>
              <div className="mt-6">
                <Link 
                  href={`/posts/${post.id}`} 
                  className="inline-block px-6 py-2 border border-gray-800 dark:border-gray-200 hover:bg-gray-900 hover:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-900 transition-colors duration-200"
                >
                  Read More
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
        <h3 className="text-2xl font-serif font-semibold mb-4">Subscribe to the Newsletter</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Get the latest posts delivered right to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
          />
          <button className="px-6 py-2 bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
