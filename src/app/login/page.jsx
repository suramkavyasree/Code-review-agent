'use client';

import EmailPasswordAuthsForm from "@/auth/EmailPasswordAuthForm";

export default function LoginPage() {
  return (
    <div className="min-sh-screen flex items-center justify-center bg-gray-200">
      <EmailPasswordAuthForm />
    </div>
  );
}
