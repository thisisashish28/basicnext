"use client";

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// Define the type for the props
interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
);
}

