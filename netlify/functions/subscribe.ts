import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the request body
    const { email } = JSON.parse(event.body || '{}');

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Valid email is required' }),
      };
    }

    // In a real application, you would add the email to a database or newsletter service
    // For this example, we'll just return a success message
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Subscription successful',
        email,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
