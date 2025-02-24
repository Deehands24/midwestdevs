import { useState } from 'react';
import { Form } from 'react-router-dom';

interface AuthModalsProps {
  isOpen: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
}

export function AuthModal({ isOpen, mode, onClose }: AuthModalsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />
        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <Form method="post" action={mode === 'signin' ? '/signin' : '/signup'}>
            {mode === 'signup' && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                disabled={isSubmitting}
              >
                {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
} 