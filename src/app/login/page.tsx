"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent, useEffect } from 'react';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            const email = session?.user?.email;
            console.log(session);
                        router.push('/');
        }
    }, [status]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", { email, password, redirect: false });
        console.log(result);
        if (result.ok ) {
            // router.push('/');
        } else if (result?.error) {
            setError("Invalid Email/password");
        }
    };

    const signInwithGoogle = () => {
       const result = signIn('google');
       console.log(result);
       router.push('/');
    }

    return (
        <div>
            <section className="bg-primary">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </aside>

                    <main
                        className="flex items-center justify-center px-md py-md sm:px-lg lg:col-span-7 lg:px-lg lg:py-lg xl:col-span-6"
                    >
                        <div className="flex justify-center items-center">
                            <div className="w-full max-w-md p-md bg-primary shadow-md rounded-lg">
                                {error && <p className="text-red-500 text-center mb-md">{error}</p>}
                                <form onSubmit={handleSubmit} className="space-y-md">
                                    <div>
                                        <label htmlFor='email' className="block text-sm font-medium text-gray-700">Email</label>
                                        <Input
                                            type="email"
                                            id='email'
                                            placeholder='Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-xs block w-full px-md py-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='password' className="block text-sm font-medium text-gray-700">Password</label>
                                        <Input
                                            type="password"
                                            id='password'
                                            placeholder='Password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="mt-xs block w-full px-md py-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                        />
                                    </div>
                                    <Button className="w-full py-md px-lg bg-secondary border text-white 
                                        font-semibold rounded-md 
                                        shadow-sm hover:bg-hover focus:outline-none focus:ring-2 
                                        focus:ring-secondary focus:ring-offset-2">Login</Button>
                                    <p className="text-center text-sm text-gray-600">Don't have an account?
                                        <Link href={'/CreateAccount'} className="text-secondary hover:text-secondary font-medium ml-1">
                                            Sign up
                                        </Link>
                                    </p>
                                </form>
                                <div className="mt-lg text-center">
                                    <h3 className="text-gray-500">OR</h3>
                                </div>
                                <div className="mt-md">
                                    <Button onClick={signInwithGoogle} className="w-full py-md px-lg bg-white 
                                    border border-gray-300 rounded-md shadow-sm 
                                        hover:bg-gray-50 focus:outline-none focus:ring-2 
                                        focus:ring-secondary focus:ring-offset-2 flex items-center justify-center 
                                        text-black-400">
                                        <span className="mr-2">
                                            <svg viewBox="0 0 32 32" width="24" height="24">
                                                <defs>
                                                    <path
                                                        id="A"
                                                        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                                                    />
                                                </defs>
                                                <clipPath id="B">
                                                    <use xlinkHref="#A" />
                                                </clipPath>
                                                <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                                                    <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
                                                    <path
                                                        d="M0 11l17 13 7-6.1L48 14V0H0z"
                                                        clipPath="url(#B)"
                                                        fill="#ea4335"
                                                    />
                                                    <path
                                                        d="M0 37l30-23 7.9 1L48 0v48H0z"
                                                        clipPath="url(#B)"
                                                        fill="#34a853"
                                                    />
                                                    <path
                                                        d="M48 48L17 24l-4-3 35-10z"
                                                        clipPath="url(#B)"
                                                        fill="#4285f4"
                                                    />
                                                </g>
                                            </svg>
                                        </span>
                                        <span>Sign in with Google</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
}

export default Login;
