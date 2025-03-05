import { Handler } from '@netlify/functions';
import { 
  errorResponse, 
  successResponse, 
  handleOptions, 
  checkRateLimit, 
  getClientIp,
  getEnvVar
} from './utils';

// Interface for search results
interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  relevance: number;
}

// Mock data for demo purposes
// In a real application, you would fetch this from a database or search service
const mockPosts = [
  {
    id: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    content: 'Next.js is a React framework that enables server-side rendering and static site generation. It provides an excellent developer experience with features like fast refresh and file-system based routing.',
    excerpt: 'Learn how to build modern web applications with Next.js',
    date: '2025-02-15',
    tags: ['nextjs', 'react', 'javascript']
  },
  {
    id: 'mastering-typescript',
    title: 'Mastering TypeScript for Modern Web Development',
    content: 'TypeScript adds static typing to JavaScript, helping you catch errors early and making your code more maintainable. This guide covers advanced TypeScript features and best practices.',
    excerpt: 'Take your JavaScript skills to the next level with TypeScript',
    date: '2025-02-20',
    tags: ['typescript', 'javascript', 'webdev']
  },
  {
    id: 'tailwind-css-tips',
    title: 'Tailwind CSS Tips and Tricks',
    content: 'Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. Learn advanced techniques and optimization strategies.',
    excerpt: 'Optimize your workflow with these Tailwind CSS techniques',
    date: '2025-02-25',
    tags: ['css', 'tailwind', 'frontend']
  },
  {
    id: 'serverless-functions',
    title: 'Building APIs with Serverless Functions',
    content: 'Serverless functions allow you to build backend functionality without managing servers. This guide shows how to create robust APIs using Netlify Functions and similar services.',
    excerpt: 'Create scalable APIs without the infrastructure headaches',
    date: '2025-03-01',
    tags: ['serverless', 'api', 'netlify']
  }
];

export const handler: Handler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return handleOptions(event);
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return errorResponse(405, 'Method Not Allowed', event);
  }

  // Rate limiting
  const clientIp = getClientIp(event);
  if (!checkRateLimit(clientIp, 20, 60000)) { // 20 requests per minute
    return errorResponse(429, 'Too Many Requests', event);
  }

  try {
    // Get search query from query parameters
    const queryParams = event.queryStringParameters || {};
    const query = queryParams.q || null;
    const tag = queryParams.tag || null;
    const limit = parseInt(queryParams.limit || '10', 10);
    
    if (!query && !tag) {
      return errorResponse(400, 'Search query or tag is required', event);
    }
    
    // In a real application, you would use a search service like Algolia, Elasticsearch, or a database query
    // Example with a search service (commented out)
    /*
    const apiKey = getEnvVar('SEARCH_API_KEY');
    const appId = getEnvVar('SEARCH_APP_ID');
    const indexName = getEnvVar('SEARCH_INDEX_NAME');
    
    const searchClient = algoliasearch(appId, apiKey);
    const index = searchClient.initIndex(indexName);
    
    const searchParams = {};
    if (tag) {
      searchParams.filters = `tags:${tag}`;
    }
    
    const { hits } = await index.search(query || '', searchParams);
    
    const results = hits.map(hit => ({
      id: hit.objectID,
      title: hit.title,
      excerpt: hit.excerpt,
      date: hit.date,
      url: `/posts/${hit.objectID}`,
      relevance: hit._score
    }));
    */
    
    // For this example, we'll perform a simple search on our mock data
    let results: SearchResult[] = [];
    
    if (query) {
      const queryLower = query.toLowerCase();
      results = mockPosts
        .filter(post => 
          post.title.toLowerCase().includes(queryLower) || 
          post.content.toLowerCase().includes(queryLower) ||
          post.excerpt.toLowerCase().includes(queryLower)
        )
        .map(post => {
          // Calculate a simple relevance score
          const titleMatch = post.title.toLowerCase().includes(queryLower) ? 3 : 0;
          const contentMatch = post.content.toLowerCase().includes(queryLower) ? 1 : 0;
          const excerptMatch = post.excerpt.toLowerCase().includes(queryLower) ? 2 : 0;
          
          return {
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            url: `/posts/${post.id}`,
            relevance: titleMatch + contentMatch + excerptMatch
          };
        });
    }
    
    if (tag) {
      const tagLower = tag.toLowerCase();
      const tagResults = mockPosts
        .filter(post => post.tags.some(t => t.toLowerCase() === tagLower))
        .map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          url: `/posts/${post.id}`,
          relevance: 1
        }));
      
      // Merge results if we have both query and tag
      if (query) {
        // Add tag results that aren't already in the query results
        tagResults.forEach(tagResult => {
          if (!results.some(r => r.id === tagResult.id)) {
            results.push(tagResult);
          }
        });
      } else {
        results = tagResults;
      }
    }
    
    // Sort by relevance and limit results
    results.sort((a, b) => b.relevance - a.relevance);
    results = results.slice(0, limit);
    
    return successResponse({
      query,
      tag,
      count: results.length,
      results
    }, event);
  } catch (error) {
    console.error('Search error:', error);
    return errorResponse(500, 'Internal Server Error', event);
  }
};
