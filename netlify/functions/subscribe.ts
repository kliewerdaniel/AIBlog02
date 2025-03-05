import { Handler } from '@netlify/functions';
import { 
  corsHeaders, 
  errorResponse, 
  successResponse, 
  handleOptions, 
  validateEmail, 
  checkRateLimit, 
  getClientIp,
  parseBody,
  getEnvVar
} from './utils';

// Interface for the request body
interface SubscribeRequest {
  email: string;
  name?: string;
}

export const handler: Handler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return handleOptions(event);
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return errorResponse(405, 'Method Not Allowed', event);
  }

  // Rate limiting
  const clientIp = getClientIp(event);
  if (!checkRateLimit(clientIp, 5, 60000)) { // 5 requests per minute
    return errorResponse(429, 'Too Many Requests', event);
  }

  try {
    // Parse and validate the request body
    const data = parseBody<SubscribeRequest>(event);
    if (!data) {
      return errorResponse(400, 'Invalid request body', event);
    }

    const { email, name } = data;

    // Validate email
    if (!email || !validateEmail(email)) {
      return errorResponse(400, 'Valid email is required', event);
    }

    // In a real application, you would add the email to a newsletter service
    // For example, using Mailchimp, ConvertKit, etc.
    
    // Example with a newsletter service API (commented out)
    /*
    const apiKey = getEnvVar('NEWSLETTER_API_KEY');
    const listId = getEnvVar('NEWSLETTER_LIST_ID');
    
    const response = await fetch(`https://api.newsletter-service.com/lists/${listId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          NAME: name || ''
        }
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Newsletter API error:', error);
      
      // Check if the email is already subscribed
      if (error.title === 'Member Exists') {
        return errorResponse(400, 'This email is already subscribed');
      }
      
      return errorResponse(500, 'Failed to subscribe to the newsletter');
    }
    */
    
    // For this example, we'll just return a success message
    console.log(`Newsletter subscription: ${email}`);
    
    return successResponse({
      message: 'Subscription successful',
      email,
    }, event);
  } catch (error) {
    console.error('Subscription error:', error);
    return errorResponse(500, 'Internal Server Error', event);
  }
};
