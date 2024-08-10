"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {status !== "authenticated" ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Welcome to our website</h2>
            <hr className="mb-4" />
            <p className="text-gray-600 text-center mb-6">Please sign in or create an account to continue.</p>
            <button
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
              onClick={handleLogin}
            >
              Sign In / Sign Up
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {session?.user?.name}</h2>
            <hr className="mb-4" />
            <p className="text-gray-600 text-center mb-6">Email: {session?.user?.email}</p>
            <button
              className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
