import { useState, useCallback } from 'react';
import { AuthModal } from './AuthModals';
import { Navbar } from './Navbar';
import { signIn, signUp } from '~/services/auth.server';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
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

  const handleSignIn = useCallback(() => {
    console.log('Opening sign in modal');
    setAuthMode('signin');
  }, []);

  const handleSignUp = useCallback(() => {
    console.log('Opening sign up modal');
    setAuthMode('signup');
  }, []);

  const handleClose = useCallback(() => {
    console.log('Closing modal');
    setAuthMode(null);
  }, []);

  return (
    <>
      <Navbar onSignIn={handleSignIn} onSignUp={handleSignUp} />
      {children}
      {authMode && (
        <AuthModal
          isOpen={true}
          mode={authMode}
          onClose={handleClose}
          onSubmit={handleAuth}
        />
      )}
    </>
  );
} 