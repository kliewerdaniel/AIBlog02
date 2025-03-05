# Black & White Blog with Sanity CMS

A minimalist black and white blog powered by Next.js and Sanity.io CMS.

## Features

- **Minimalist Black & White Design**: Clean, typography-focused design
- **Sanity CMS Integration**: Powerful content management with a custom studio
- **Rich Text Editor**: Advanced editing capabilities for blog posts
- **Custom Dashboard**: Content metrics and deployment controls
- **Preview Mode**: Preview content changes before publishing
- **Image Optimization**: Automatic image optimization with Sanity's image pipeline
- **Responsive Design**: Looks great on all devices

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- A Sanity.io account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/black-white-blog.git
cd black-white-blog
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Sanity credentials:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_API_TOKEN=your-sanity-api-token
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the blog
6. Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity Studio

## Sanity Studio

The Sanity Studio is accessible at `/studio` and includes:

### Content Types

- **Blog Posts**: Create and manage blog posts with rich text content
- **Authors**: Manage author profiles with bio and social links
- **Categories**: Organize content with customizable categories
- **Site Settings**: Configure global site settings

### Custom Features

- **Content Metrics Dashboard**: View content statistics at a glance
- **Custom Color Input**: Visual color picker for categories and theme settings
- **Preview Mode**: Preview content changes before publishing
- **Image Hotspot Control**: Control focal points for responsive images

## Content Structure

### Blog Posts
- Title
- Slug
- Author
- Main Image
- Categories
- Publication Date
- Excerpt
- Body Content (Rich Text)
- SEO Settings
- Related Posts

### Authors
- Name
- Slug
- Image
- Bio
- Role
- Email
- Social Media Links

### Categories
- Title
- Slug
- Description
- Color (with custom color picker)
- Icon
- Featured Status
- Display Order

### Site Settings
- Site Title & Description
- Logo & Favicon
- Navigation Menus
- Footer Content
- Social Media Links
- SEO Settings
- Feature Toggles
- Theme Settings

## Development

### Project Structure

- `/src/app`: Next.js app router pages
- `/src/components`: React components
- `/src/lib`: Utility functions and configuration
- `/src/lib/schemas`: Sanity schema definitions
- `/src/lib/components`: Custom Sanity input components
- `/src/lib/dashboard`: Custom Sanity dashboard widgets

### Key Files

- `src/lib/sanity.config.ts`: Sanity studio configuration
- `src/lib/sanity.client.ts`: Sanity client and GROQ queries
- `src/app/studio/[[...index]]/page.tsx`: Sanity studio entry point
- `src/app/api/preview/route.ts`: Preview mode API route

## Deployment

### Next.js Frontend

Deploy the Next.js frontend to Vercel or Netlify:

```bash
npm run build
```

### Sanity Studio

The Sanity Studio is deployed with the Next.js app at the `/studio` route.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
