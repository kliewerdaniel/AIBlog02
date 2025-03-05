import { PortableText as SanityPortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/lib/sanity.client';

// Define custom components for the Portable Text renderer
const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      
      return (
        <div className="relative my-8 w-full overflow-hidden rounded-lg">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || 'Blog image'}
            width={800}
            height={500}
            className="w-full object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {value.caption && (
            <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <code className="text-sm font-mono">
            {value.code}
          </code>
          {value.filename && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {value.filename}
            </div>
          )}
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = value.href.startsWith('/') ? undefined : 'noreferrer noopener';
      const target = value.blank ? '_blank' : undefined;
      
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          target={target}
          className="text-black underline decoration-gray-300 decoration-1 underline-offset-2 transition-colors hover:decoration-black dark:text-white dark:decoration-gray-700 dark:hover:decoration-white"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="mb-4 mt-8 text-3xl font-bold tracking-tight md:text-4xl">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight md:text-3xl">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-4 mt-6 text-xl font-bold tracking-tight md:text-2xl">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-4 mt-6 text-lg font-bold tracking-tight md:text-xl">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-gray-200 pl-4 italic dark:border-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
};

// Main PortableText component
export default function PortableText({ content }: { content: any }) {
  return (
    <div className="prose prose-black max-w-none dark:prose-invert">
      <SanityPortableText value={content} components={components} />
    </div>
  );
}
