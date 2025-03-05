import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const type = searchParams.get('type') || 'post';
  
  // Enable draft mode
  draftMode().enable();
  
  // Redirect to the appropriate page based on content type
  switch (type) {
    case 'post':
      redirect(slug ? `/posts/${slug}` : '/');
    case 'author':
      redirect(slug ? `/authors/${slug}` : '/');
    case 'category':
      redirect(slug ? `/categories/${slug}` : '/');
    default:
      redirect('/');
  }
}
