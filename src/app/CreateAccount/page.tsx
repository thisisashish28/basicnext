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
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </aside>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="flex justify-center items-center">
                            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                                <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
                                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                                <div className='items-center mt-5'>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Label htmlFor='name' className="block text-sm font-medium text-gray-700">Name</Label>
                                            <Input
                                                type="text"
                                                id='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <Button variant="outline" className='w-full py-2 px-4 bg-blue-500 border 
                                                                  text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none 
                                                                  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'> Submit</Button>

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
