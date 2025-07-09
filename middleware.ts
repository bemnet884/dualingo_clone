import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const adminIds = [
  "user_2zdUUTaeLRFVhrUXxoNuRNCwvoy",
];

const isProtectedRoute = createRouteMatcher(
  [
    '/admin(.*)',
    '/api/courses(.*)'
  ]
);


export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth()
   
      if (!userId) {
      return ; 
    }
    await auth.protect();


  const isAdmin = adminIds.includes(userId);
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  };
  return NextResponse.next(); 
})

export const config = {
  matcher: [

    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};