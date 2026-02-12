'use client';

import EmailPasswordAuthForm from "@/auth/EmailPasswordAuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-1090">
      <EmailPasswordAuthForm />
    </div>
  );
}
