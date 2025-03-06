// This file ensures that the search page is treated as a dynamic route
// and not pre-rendered during build time

export const dynamic = 'force-dynamic';

// This is a Next.js App Router route handler
// It doesn't need to export any handlers since we're just using it
// to configure the route behavior
