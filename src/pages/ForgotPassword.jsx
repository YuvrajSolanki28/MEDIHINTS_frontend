import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeftIcon } from 'lucide-react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); // Ensure this always holds a string

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/forgotpassword', { email });

            // Safely handle the response to extract a string message
            const successMessage = typeof response.data === 'string'
                ? response.data
                : response.data?.message || 'Password reset link sent successfully.';
            setMessage(successMessage);
        } catch (error) {
            // Safely handle the error response to extract a string message
            const errorMessage = typeof error.response?.data === 'string'
                ? error.response.data
                : error.response?.data?.message || 'An error occurred. Please try again.';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-600 mb-8"
            >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back
            </button>

            <h1 className="text-2xl font-bold mb-8">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
                    >
                        Send Reset Link
                    </button>
                </div>
            </form>
            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>
    );
}

export default ForgotPassword;
