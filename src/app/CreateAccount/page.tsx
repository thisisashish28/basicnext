"use client";

import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreateAccount: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users', {
                name,
                email,
                password
            });
            router.push('/');
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setError("Email already exists");
            } else {
                setError("An error occurred");
            }
        }
    };

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
                                <h2 className="text-2xl font-bold mb-md text-center">Create Account</h2>
                                {error && <p className="text-red-500 text-center mb-md">{error}</p>}
                                <div className='items-center mt-md'>
                                    <form onSubmit={handleSubmit} className="space-y-md">
                                        <div>
                                            <Label htmlFor='name' className="block text-sm font-medium text-gray-700">Name</Label>
                                            <Input
                                                type="text"
                                                id='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="mt-xs block w-full px-md py-sm border 
                                                border-gray-300 rounded-md shadow-sm focus:outline-none 
                                                focus:ring-secondary focus:border-secondary sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor='email' className="block text-sm font-medium text-gray-700">Email</Label>
                                            <Input
                                                type="email"
                                                id='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="mt-xs block w-full px-md py-sm border border-gray-300 
                                                rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor='password' className="block text-sm font-medium text-gray-700">Password</Label>
                                            <Input
                                                type="password"
                                                id='password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="mt-xs block w-full px-md py-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                            />
                                        </div>

                                        <Button className='w-full py-md px-lg bg-secondary border text-white 
                                        font-semibold rounded-md
                                        shadow-sm hover:bg-hover focus:outline-none focus:ring-2 
                                        focus:ring-secondary focus:ring-offset-2'> Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
};

export default CreateAccount;
