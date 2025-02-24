import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import router from './router/router'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <QueryClientProvider client={queryClient}>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/auth">
    <RouterProvider router={router} />
  </ClerkProvider>
  // </QueryClientProvider>
)
