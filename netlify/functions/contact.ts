import { Handler } from '@netlify/functions';
import { 
  errorResponse, 
  successResponse, 
  handleOptions, 
  validateEmail, 
  checkRateLimit, 
  getClientIp,
  parseBody,
  validateRequired,
  getEnvVar
} from './utils';

// Interface for the request body
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
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

  // Rate limiting - stricter for contact form to prevent spam
  const clientIp = getClientIp(event);
  if (!checkRateLimit(clientIp, 3, 300000)) { // 3 requests per 5 minutes
    return errorResponse(429, 'Too Many Requests', event);
  }

  try {
    // Parse and validate the request body
    const data = parseBody<ContactRequest>(event);
    if (!data) {
      return errorResponse(400, 'Invalid request body', event);
    }

    const { name, email, subject, message } = data;

    // Validate required fields
    const errors = [];
    const nameError = validateRequired(name, 'Name');
    const subjectError = validateRequired(subject, 'Subject');
    const messageError = validateRequired(message, 'Message');
    
    if (nameError) errors.push(nameError);
    if (subjectError) errors.push(subjectError);
    if (messageError) errors.push(messageError);
    
    // Validate email
    if (!email || !validateEmail(email)) {
      errors.push('Valid email is required');
    }

    if (errors.length > 0) {
      return errorResponse(400, errors.join(', '), event);
    }

    // In a real application, you would send the contact form data to an email service
    // For example, using SendGrid, Mailgun, etc.
    
    // Example with an email service API (commented out)
    /*
    const apiKey = getEnvVar('EMAIL_API_KEY');
    const toEmail = getEnvVar('CONTACT_EMAIL');
    
    const response = await fetch('https://api.email-service.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: toEmail }],
            subject: `Contact Form: ${subject}`
          }
        ],
        from: { email: 'noreply@yourblog.com', name: 'Blog Contact Form' },
        reply_to: { email, name },
        content: [
          {
            type: 'text/plain',
            value: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
          }
        ]
      })
    });
    
    if (!response.ok) {
      console.error('Email API error:', await response.json());
      return errorResponse(500, 'Failed to send contact message');
    }
    */
    
    // For this example, we'll just log the message and return a success response
    console.log(`Contact form submission from ${name} (${email}): ${subject}`);
    
    return successResponse({
      message: 'Your message has been sent successfully. We will get back to you soon.',
    }, event);
  } catch (error) {
    console.error('Contact form error:', error);
    return errorResponse(500, 'Internal Server Error', event);
  }
};
