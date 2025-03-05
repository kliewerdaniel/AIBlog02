import { DefaultDocumentNodeResolver } from 'sanity/desk';
import { SanityDocument } from 'sanity';

// Define interfaces for document types with slug
interface SlugDocument extends SanityDocument {
  slug?: {
    current?: string;
  };
}

// Customizes the preview URL for different document types
function getPreviewUrl(doc: SlugDocument) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

  switch (doc._type) {
    case 'post':
      return `${baseUrl}/api/preview?slug=${doc.slug?.current || ''}&type=post`;
    case 'author':
      return `${baseUrl}/api/preview?slug=${doc.slug?.current || ''}&type=author`;
    case 'category':
      return `${baseUrl}/api/preview?slug=${doc.slug?.current || ''}&type=category`;
    case 'siteSettings':
      return `${baseUrl}/api/preview`;
    default:
      return `${baseUrl}/api/preview`;
  }
}

// Set up the default document node with preview functionality
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // For now, we'll just return the default form view
  // Preview functionality will be implemented when we set up the API routes
  return S.document().views([S.view.form()]);
};
