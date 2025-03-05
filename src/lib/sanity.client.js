import { createClient } from 'next-sanity';

// Define the project configuration
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Create a client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Helper function to generate image URLs
export const urlFor = (source) => {
  return source;
};

// GROQ query for a single post
export async function getPost(slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );
}

// GROQ query for all posts
export async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc)`
  );
}

// GROQ query for all authors
export async function getAuthors() {
  return client.fetch(
    `*[_type == "author"]`
  );
}
