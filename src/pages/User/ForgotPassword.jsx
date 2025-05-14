import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeftIcon } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false); 
    const [isEmailSent, setIsEmailSent] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        try {
            const response = await axios.post('https://medihints-backend.vercel.app/api/forgotpassword', { email });

            const successMessage =
                typeof response.data === 'string'
                    ? response.data
                    : response.data?.message || 'Password reset link sent successfully.';
            toast.success(successMessage);
            setIsEmailSent(true);
        } catch (error) {
            const errorMessage =
                typeof error.response?.data === 'string'
                    ? error.response.data
                    : error.response?.data?.message || 'Please check your email.';
            toast.error(errorMessage);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">

            <Toaster position="top-right" reverseOrder={false} />

            <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-600 mb-8"
            >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back
            </button>

            <h1 className="text-2xl font-bold mb-8">Forgot Password</h1>

            {isEmailSent ? (
                
                <p className="text-lg font-medium text-green-600">
                    Your Reset Password Email has been sent. Please check your mail.
                </p>
            ) : (
                
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
                            disabled={isSending} // Disable button while email is being sent
                            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center ${
                                isSending ? 'cursor-not-allowed' : ''
                            }`}
                        >
                            {isSending ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ForgotPassword;
