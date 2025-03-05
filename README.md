# Blog Backend with Netlify Functions

This project implements backend functionality for a blog using Netlify Functions. It provides serverless API endpoints for newsletter subscriptions, contact form submissions, post view tracking, and search functionality.

## API Endpoints

### Newsletter Subscription

**Endpoint:** `/.netlify/functions/subscribe`

**Method:** POST

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe" // optional
}
```

**Response:**
```json
{
  "message": "Subscription successful",
  "email": "user@example.com"
}
```

**Frontend Integration:**
```typescript
// Example using the NewsletterForm component
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Contact Form

**Endpoint:** `/.netlify/functions/contact`

**Method:** POST

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "subject": "Inquiry",
  "message": "Hello, I have a question about..."
}
```

**Response:**
```json
{
  "message": "Your message has been sent successfully. We will get back to you soon."
}
```

**Frontend Integration:**
```typescript
// Example using the ContactForm component
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Post Views

**Endpoint:** `/.netlify/functions/postViews`

**Methods:** 
- POST (increment view count)
- GET (retrieve view count)

**POST Request Body:**
```json
{
  "postId": "post-slug-or-id"
}
```

**GET Request Parameters:**
- `postId`: The ID or slug of the post

**Response:**
```json
{
  "postId": "post-slug-or-id",
  "views": 42
}
```

**Frontend Integration:**
```typescript
// Example using the usePostViews hook
import { usePostViews } from '@/hooks/usePostViews';

function PostComponent({ postId }) {
  const { views, loading, error } = usePostViews({
    postId,
    incrementOnMount: true // Automatically increment view count when component mounts
  });
  
  return (
    <div>
      <p>{loading ? 'Loading...' : `${views} views`}</p>
    </div>
  );
}
```

### Search

**Endpoint:** `/.netlify/functions/search`

**Method:** GET

**Request Parameters:**
- `q`: Search query
- `tag`: Filter by tag (optional)
- `limit`: Maximum number of results to return (default: 10)

**Response:**
```json
{
  "query": "nextjs",
  "tag": "javascript",
  "count": 2,
  "results": [
    {
      "id": "getting-started-with-nextjs",
      "title": "Getting Started with Next.js",
      "excerpt": "Learn how to build modern web applications with Next.js",
      "date": "2025-02-15",
      "url": "/posts/getting-started-with-nextjs",
      "relevance": 5
    },
    {
      "id": "nextjs-vs-gatsby",
      "title": "Next.js vs Gatsby: Which One to Choose?",
      "excerpt": "A comparison of two popular React frameworks",
      "date": "2025-01-20",
      "url": "/posts/nextjs-vs-gatsby",
      "relevance": 3
    }
  ]
}
```

**Frontend Integration:**
```typescript
// Example using the SearchBar component
const performSearch = async (query: string) => {
  try {
    const response = await fetch(
      `/.netlify/functions/search?q=${encodeURIComponent(query)}&limit=5`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Search failed');
    }
    
    // Process search results
    setResults(data.results);
  } catch (error) {
    // Handle error
  }
};
```

## Security Features

### Rate Limiting

The API endpoints implement rate limiting to prevent abuse:

- Newsletter subscription: 5 requests per minute per IP
- Contact form: 3 requests per 5 minutes per IP
- Post views: 10 requests per minute per IP
- Search: 20 requests per minute per IP

### CORS Configuration

CORS is configured to allow requests only from specified origins. The allowed origins are defined in the `.env.local` file:

```
CORS_ALLOWED_ORIGIN=http://localhost:3000,https://yourblog.com
```

### Input Validation

All API endpoints implement input validation to ensure that the data received is in the expected format:

- Email validation using regex
- Required field validation
- Request body parsing and validation

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# Newsletter Service API Keys
NEWSLETTER_API_KEY=your_newsletter_api_key_here
NEWSLETTER_LIST_ID=your_newsletter_list_id_here

# Email Service API Keys (for contact form)
EMAIL_API_KEY=your_email_api_key_here
CONTACT_EMAIL=your_contact_email@example.com

# Database Connection (for post views)
MONGODB_URI=your_mongodb_connection_string_here

# Search Service API Keys
SEARCH_API_KEY=your_search_api_key_here
SEARCH_APP_ID=your_search_app_id_here
SEARCH_INDEX_NAME=your_search_index_name_here

# Security
CORS_ALLOWED_ORIGIN=http://localhost:3000,https://yourblog.com
```

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. The Netlify Functions will be available at `http://localhost:3000/.netlify/functions/[function-name]`

## Deployment

1. Push your code to a Git repository.

2. Connect your repository to Netlify.

3. Configure the environment variables in the Netlify dashboard.

4. Deploy your site.

## Production Considerations

For a production environment, consider the following:

1. **Database Integration**: Replace the in-memory storage with a proper database like MongoDB, Fauna, or Supabase.

2. **Email Service Integration**: Integrate with an email service like SendGrid, Mailgun, or AWS SES for the contact form and newsletter subscription.

3. **Search Service Integration**: For more advanced search capabilities, integrate with a search service like Algolia, Elasticsearch, or MeiliSearch.

4. **Monitoring and Logging**: Add proper monitoring and logging to track API usage and errors.

5. **Authentication**: Add authentication for admin-only endpoints.
