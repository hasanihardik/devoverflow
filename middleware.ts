import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(
  (auth, req) => {
    // Public routes that don't require authentication
    const publicPaths = [
      '/',
      '/api/webhook',
      /^\/questions\/[\w-]+$/,
      '/tags',
      /^\/tags\/[\w-]+$/,
      /^\/profile\/[\w-]+$/,
      '/community',
      '/jobs'
    ];
    
    const isPublic = publicPaths.some((path) => {
      if (typeof path === 'string') {
        return path === req.nextUrl.pathname;
      }
      return path.test(req.nextUrl.pathname);
    });

    // Allow requests to public routes
    if (isPublic) {
      return;
    }

    // Ignore specific routes 
    if (req.nextUrl.pathname.startsWith('/api/webhooks') || 
        req.nextUrl.pathname.startsWith('/api/chatgpt')) {
      return;
    }
    
    // For all other routes, authentication will be required by default
  }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};