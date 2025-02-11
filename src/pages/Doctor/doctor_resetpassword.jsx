import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {  EyeIcon, EyeOffIcon, Loader2Icon, CheckIcon, XIcon } from 'lucide-react';

export default function DoctorResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [validations, setValidations] = useState({
        minLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const password = formData.newPassword;
        const newValidations = {
            minLength: password.length >= 8,
            hasUpper: /[A-Z]/.test(password),
            hasLower: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
    
        setValidations(newValidations);
    }, [formData.newPassword]);

    const isPasswordValid = Object.values(validations).filter(Boolean).length >= 3;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!isPasswordValid) {
            setError('Please 3 validations password requirements');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:8000/api/resetpassword/doctor/${token}`, {
                newPassword: formData.newPassword,
            });
            setMessage(response.data);
        } catch (err) {
            setError('Failed to update password');
        } finally {
            setIsLoading(false);
            navigate("/doctor-login");
        }
    };

    const ValidationItem = ({ satisfied, text }) => (
        <div className="flex items-center space-x-2">
            {satisfied ? (
                <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
                <XIcon className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm ${satisfied ? "text-green-500" : "text-red-500"}`}>
                {text}
            </span>
        </div>
    );

    return (
        <div className="w-full max-w-4xl px-4 py-8 mx-auto">
            
            <h1 className="mb-8 text-2xl font-bold">Reset Password</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2.5"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? (
                                    <EyeOffIcon className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        <div className="mt-2 space-y-1">
                            <ValidationItem satisfied={validations.minLength} text="At least 8 characters" />
                            <ValidationItem satisfied={validations.hasUpper} text="At least 1 uppercase letter" />
                            <ValidationItem satisfied={validations.hasLower} text="At least 1 lowercase letter" />
                            <ValidationItem satisfied={validations.hasNumber} text="At least 1 number" />
                            <ValidationItem satisfied={validations.hasSpecial} text="At least 1 special character" />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2.5"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOffIcon className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && <div className="text-sm text-red-500">{error}</div>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        'Update Password'
                    )}
                </button>
            </form>

            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
}