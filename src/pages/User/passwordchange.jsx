import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon, CheckIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

export default function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
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
    const [passwordChanged, setPasswordChanged] = useState(false);  // New state for password change status

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
        setError("");
        if (!isPasswordValid) {
            setError("Password must meet at least 3 requirements.");
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`https://medihints-backend.vercel.app/api/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                // Successfully updated password
                setPasswordChanged(true);  // Set password changed status
                toast.success("Your password has been changed. Go back!");  // Show success toast
            } else {
                // Error from API
                setError(result.message || "Failed to update password.");
                toast.error(result.message || "Failed to update password.");  // Show error toast
            }
        } catch (err) {
            setError("An error occurred while updating password.");
            toast.error("An error occurred while updating password.");  // Show error toast
        } finally {
            setIsLoading(false);
        }
    };

    const ValidationItem = ({ satisfied, text }) => (
        <div className="flex items-center space-x-2">
            {satisfied ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
                <XIcon className="h-4 w-4 text-red-500" />
            )}
            <span
                className={`text-sm ${satisfied ? "text-green-500" : "text-red-500"}`}
            >
                {text}
            </span>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-600 mb-8"
            >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back
            </button>

            <h1 className="text-2xl font-bold mb-8">Change Password</h1>

            {passwordChanged ? (
                // If the password is changed, display this success message
                <div className="text-center">
                    <h2 className="text-xl text-green-600">Your password has been changed successfully Go Back!</h2>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Current Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.currentPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.newPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            <div className="mt-2 space-y-1">
                                <ValidationItem
                                    satisfied={validations.minLength}
                                    text="At least 8 characters"
                                />
                                <ValidationItem
                                    satisfied={validations.hasUpper}
                                    text="At least 1 uppercase letter"
                                />
                                <ValidationItem
                                    satisfied={validations.hasLower}
                                    text="At least 1 lowercase letter"
                                />
                                <ValidationItem
                                    satisfied={validations.hasNumber}
                                    text="At least 1 number"
                                />
                                <ValidationItem
                                    satisfied={validations.hasSpecial}
                                    text="At least 1 special character"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2Icon className="animate-spin h-5 w-5 mr-2" />
                                Updating...
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
