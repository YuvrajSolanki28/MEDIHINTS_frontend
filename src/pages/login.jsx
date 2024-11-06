import { LockIcon, UserIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();






  return <main className="min-h-screen w-full flex flex-col md:flex-row" >
      <div className="w-full md:w-1/2 min-h-[300px] md:min-h-screen relative" >
        <img src="/login.png" className="w-full h-full object-cover absolute inset-0" alt="Hospital"  />
        <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center" >
          <div className="text-center text-white p-8" >
            <h1 className="text-4xl font-bold mb-4" >MediHints</h1>
            <p className="text-xl" >Your Trusted Healthcare Partner</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50" >
        <div className="max-w-md w-full" >
          <div className="text-center mb-8" >
            <h2 className="text-2xl font-bold text-gray-900" >Welcome Back</h2>
            <p className="text-gray-600 mt-2" >Please sign in to your account</p>
          </div>

          <form className="space-y-6" >
            <div className="relative" >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" >
                <UserIcon className="h-5 w-5 text-gray-400"/>
              </div>
              <input type="email" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Email address" />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" >
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type={showPassword ? "text" : "password"} className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Password" />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)} >
                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400"/>}
              </button>
            </div>

            <div className="flex items-center justify-between" >
              <div className="flex items-center" >
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"  />
                <label className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <li className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer">
                Forgot password?
              </li>
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign in
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600" >
                Don't have an account?{" "}
                <li className="text-blue-600 hover:text-blue-500 cursor-pointer" onClick={()=>navigate("/signup")}>
                  Register here
                </li>
              </span>
            </div>
          </form>
        </div>
      </div>
    </main>;
}