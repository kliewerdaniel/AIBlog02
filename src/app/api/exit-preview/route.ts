import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  // Disable draft mode
  draftMode().disable();
  
  // Get the path from the query string
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  
  // Redirect to the path
  redirect(path);
}
