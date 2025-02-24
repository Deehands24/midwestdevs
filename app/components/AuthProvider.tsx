import { useState, useCallback } from 'react';
import { AuthModal } from './AuthModals';
import { Navbar } from './Navbar';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  const handleSignIn = useCallback(() => {
    setAuthMode('signin');
  }, []);

  const handleSignUp = useCallback(() => {
    setAuthMode('signup');
  }, []);

  const handleClose = useCallback(() => {
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
        />
      )}
    </>
  );
} 