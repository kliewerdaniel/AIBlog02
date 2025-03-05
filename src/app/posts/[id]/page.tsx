import Link from 'next/link';

export default function Post({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <Link href="/" className="inline-block mb-4 hover:underline">
        ← Back to Home
      </Link>
      
      <article>
        <header className="border-b border-primary pb-6 mb-8">
          <h1 className="text-5xl font-bold">Sample Blog Post {params.id}</h1>
          <p className="mt-2 text-sm text-gray-600">March {Number(params.id) + 4}, 2025</p>
        </header>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            This is a sample blog post with minimalist black and white styling. The clean design helps readers focus on the content without distractions.
          </p>
          
          <h2>Section Heading</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
          </p>
          
          <p>
            Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.
          </p>
          
          <h2>Another Section</h2>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet.
          </p>
          
          <blockquote>
            "Simplicity is the ultimate sophistication." — Leonardo da Vinci
          </blockquote>
          
          <p>
            Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.
          </p>
        </div>
      </article>
    </div>
  );
}
