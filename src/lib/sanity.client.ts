import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

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
  // Token is only needed if you want to update content from the client
  token: process.env.SANITY_API_TOKEN,
});

// Create a preview client for draft content
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper function to determine which client to use
export const getClient = (preview = false) => (preview ? previewClient : client);

// Set up image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export const urlForImage = (source: SanityImageSource) => {
  return builder.image(source);
};

// GROQ query for a single post with related content
export async function getPost(slug: string, preview = false) {
  const currentClient = getClient(preview);
  
  const post = await currentClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      body,
      publishedAt,
      "author": author->{
        name,
        slug,
        image,
        bio,
        role
      },
      "categories": categories[]->{
        _id,
        title,
        slug,
        description,
        color
      },
      "relatedPosts": relatedPosts[]->{
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        "author": author->{name, slug}
      }
    }`,
    { slug }
  );

  return post;
}

// GROQ query for filtered post lists
export async function getPosts({
  limit = 10,
  offset = 0,
  categorySlug = '',
  authorSlug = '',
  featured = false,
  preview = false,
}) {
  const currentClient = getClient(preview);
  
  // Build the filter conditions
  let filterConditions = '_type == "post"';
  
  if (categorySlug) {
    filterConditions += ` && count(*[_type == "category" && slug.current == "${categorySlug}"]._id) > 0`;
  }
  
  if (authorSlug) {
    filterConditions += ` && author->slug.current == "${authorSlug}"`;
  }
  
  if (featured) {
    filterConditions += ' && featured == true';
  }
  
  // Execute the query
  const posts = await currentClient.fetch(
    `{
      "posts": *[${filterConditions}] | order(publishedAt desc) [${offset}...${offset + limit}] {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        "author": author->{
          name,
          slug,
          image
        },
        "categories": categories[]->{
          _id,
          title,
          slug,
          color
        }
      },
      "total": count(*[${filterConditions}])
    }`
  );
  
  return posts;
}

// GROQ query for author information
export async function getAuthor(slug: string, preview = false) {
  const currentClient = getClient(preview);
  
  const author = await currentClient.fetch(
    `*[_type == "author" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      image,
      bio,
      role,
      email,
      social,
      "posts": *[_type == "post" && author._ref == ^._id] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt
      }
    }`,
    { slug }
  );
  
  return author;
}

// GROQ query for site metadata
export async function getSiteSettings(preview = false) {
  const currentClient = getClient(preview);
  
  const settings = await currentClient.fetch(
    `*[_type == "siteSettings"][0]{
      title,
      description,
      logo,
      favicon,
      mainNavigation,
      footerNavigation,
      socialLinks,
      footerText,
      ogImage,
      seoKeywords,
      googleAnalyticsId,
      postsPerPage,
      enableNewsletter,
      enableSearch,
      enableDarkMode,
      accentColor
    }`
  );
  
  return settings;
}

// GROQ query for categories
export async function getCategories(preview = false) {
  const currentClient = getClient(preview);
  
  const categories = await currentClient.fetch(
    `*[_type == "category"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      color,
      icon,
      featured,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`
  );
  
  return categories;
}

// GROQ query for search
export async function searchContent(searchQuery: string, preview = false) {
  const currentClient = getClient(preview);
  
  // Format the query for GROQ
  const formattedQuery = `*${searchQuery}*`;
  
  const results = await currentClient.fetch(`{
    "posts": *[_type == "post" && (title match $formattedQuery || excerpt match $formattedQuery || pt::text(body) match $formattedQuery)] {
      _id,
      _type,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt
    },
    "authors": *[_type == "author" && (name match $formattedQuery || pt::text(bio) match $formattedQuery)] {
      _id,
      _type,
      name,
      slug,
      image
    },
    "categories": *[_type == "category" && (title match $formattedQuery || description match $formattedQuery)] {
      _id,
      _type,
      title,
      slug,
      color
    }
  }`, { formattedQuery });
  
  return results;
}
