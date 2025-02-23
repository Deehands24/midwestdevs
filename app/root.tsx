import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useState } from "react";
import { Navbar } from "~/components/Navbar";
import { AuthModal } from "~/components/AuthModals";
import { signIn, signUp } from "~/services/auth.server";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export default function App() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  const handleAuth = async (data: { email: string; password: string; fullName?: string }) => {
    try {
      if (authMode === 'signin') {
        await signIn(data.email, data.password);
      } else if (authMode === 'signup' && data.fullName) {
        await signUp(data.email, data.password, data.fullName);
      }
      setAuthMode(null);
    } catch (error) {
      console.error('Auth error:', error);
      throw error;
    }
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Navbar 
          onSignIn={() => setAuthMode('signin')} 
          onSignUp={() => setAuthMode('signup')} 
        />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        
        {authMode && (
          <AuthModal
            isOpen={true}
            mode={authMode}
            onClose={() => setAuthMode(null)}
            onSubmit={handleAuth}
          />
        )}
      </body>
    </html>
  );
}
