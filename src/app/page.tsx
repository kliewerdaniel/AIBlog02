import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      <header className="border-b border-primary pb-6">
        <h1 className="text-5xl font-bold">Minimalist Blog</h1>
        <p className="mt-2 text-lg">A clean, black and white aesthetic for focused reading</p>
      </header>

      <section className="space-y-8">
        {[1, 2, 3].map((id) => (
          <article key={id} className="border-b border-gray-200 pb-8">
            <h2 className="text-3xl font-bold hover:text-accent">
              <Link href={`/posts/${id}`}>Sample Blog Post {id}</Link>
            </h2>
            <p className="mt-2 text-sm text-gray-600">March {id + 4}, 2025</p>
            <p className="mt-4">
              This is a sample blog post introduction. The minimalist design helps readers focus on
              the content without distractions. Click to read more about this topic.
            </p>
            <div className="mt-4">
              <Link href={`/posts/${id}`} className="btn inline-block">
                Read More
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
