import { Handler } from '@netlify/functions';
import { 
  errorResponse, 
  successResponse, 
  handleOptions, 
  checkRateLimit, 
  getClientIp,
  parseBody,
  validateRequired,
  getEnvVar
} from './utils';

// Interface for the request body
interface ViewRequest {
  postId: string;
}

// Simple in-memory store for post views (for demo purposes)
// In production, use a database to store view counts
const postViewsStore: Record<string, number> = {};

export const handler: Handler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return handleOptions(event);
  }

  // Handle different HTTP methods
  switch (event.httpMethod) {
    case 'POST':
      return handlePostView(event);
    case 'GET':
      return handleGetViews(event);
    default:
      return errorResponse(405, 'Method Not Allowed', event);
  }
};

// Handle POST request to increment view count
const handlePostView = async (event: any) => {
  // Rate limiting - prevent abuse
  const clientIp = getClientIp(event);
  if (!checkRateLimit(clientIp, 10, 60000)) { // 10 requests per minute
    return errorResponse(429, 'Too Many Requests', event);
  }

  try {
    // Parse and validate the request body
    const data = parseBody<ViewRequest>(event);
    if (!data) {
      return errorResponse(400, 'Invalid request body', event);
    }

    const { postId } = data;

    // Validate postId
    const postIdError = validateRequired(postId, 'Post ID');
    if (postIdError) {
      return errorResponse(400, postIdError, event);
    }

    // Increment view count
    postViewsStore[postId] = (postViewsStore[postId] || 0) + 1;
    
    // In a real application, you would store this in a database
    // Example with a database (commented out)
    /*
    const { MongoClient } = require('mongodb');
    const uri = getEnvVar('MONGODB_URI');
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const database = client.db('blog');
      const posts = database.collection('posts');
      
      // Update view count using atomic operation
      const result = await posts.updateOne(
        { _id: postId },
        { $inc: { viewCount: 1 } },
        { upsert: true }
      );
      
      if (!result.acknowledged) {
        return errorResponse(500, 'Failed to update view count');
      }
    } finally {
      await client.close();
    }
    */
    
    console.log(`Post view recorded for post ${postId}`);
    
    return successResponse({
      message: 'View recorded',
      postId,
      views: postViewsStore[postId]
    }, event);
  } catch (error) {
    console.error('Post view error:', error);
    return errorResponse(500, 'Internal Server Error', event);
  }
};

// Handle GET request to retrieve view count
const handleGetViews = async (event: any) => {
  try {
    // Get postId from query parameters
    const queryParams = event.queryStringParameters || {};
    const postId = queryParams.postId || null;
    
    if (!postId) {
      return errorResponse(400, 'Post ID is required', event);
    }
    
    // Get view count
    const views = postViewsStore[postId] || 0;
    
    // In a real application, you would retrieve this from a database
    // Example with a database (commented out)
    /*
    const { MongoClient } = require('mongodb');
    const uri = getEnvVar('MONGODB_URI');
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const database = client.db('blog');
      const posts = database.collection('posts');
      
      const post = await posts.findOne({ _id: postId });
      const views = post?.viewCount || 0;
      
      return successResponse({ postId, views });
    } finally {
      await client.close();
    }
    */
    
    return successResponse({
      postId,
      views
    }, event);
  } catch (error) {
    console.error('Get views error:', error);
    return errorResponse(500, 'Internal Server Error', event);
  }
};
