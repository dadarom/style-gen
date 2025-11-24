'use client';
import React from 'react';
import AuthProvider from './auth/AuthProvider';
import AuthForm from './auth/AuthForm';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <AuthProvider>
      {children}
      <AuthForm />
    </AuthProvider>
  );
}