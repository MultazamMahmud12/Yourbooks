
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';


 
const Register = () => {
  
     const [formData, setFormData] = useState({
    name : '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your login logic here
    console.log('Login attempt:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleGoogleSignIn = () => {
    // Add Google sign-in logic here
    console.log('Google sign-in clicked');
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div 
          className="rounded-lg shadow-lg p-8"
          style={{ 
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 10px 25px var(--color-shadow-lg)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 
              className="text-2xl font-bold font-primary mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              Welcome 
            </h2>
            <p 
              className="text-sm font-secondary"
              style={{ color: 'var(--color-text-light)' }}
            >
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium font-secondary mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm"
                  style={{ color: 'var(--color-text-light)' }}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border font-secondary focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                    '--tw-ring-color': 'var(--color-secondary)'
                  }}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium font-secondary mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Password
              </label>
              <div className="relative">
                <FaLock 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm"
                  style={{ color: 'var(--color-text-light)' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border font-secondary focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                    '--tw-ring-color': 'var(--color-secondary)'
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity duration-200"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {/* Confirm Password Field */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium font-secondary mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <FaLock 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm"
                  style={{ color: 'var(--color-text-light)' }}
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border font-secondary focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                    '--tw-ring-color': 'var(--color-secondary)'
                  }}
                  placeholder="Enter your password again"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity duration-200"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>


            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold font-secondary transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: 'var(--color-secondary)',
                color: 'white'
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div 
                    className="animate-spin rounded-full h-5 w-5 border-b-2 mr-2"
                    style={{ borderColor: 'white' }}
                  ></div>
                  Registering ...
                </div>
              ) : (
                'Register'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div 
                className="absolute inset-0 flex items-center"
              >
                <div 
                  className="w-full border-t"
                  style={{ borderColor: 'var(--color-border)' }}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span 
                  className="px-4 font-secondary"
                  style={{ 
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-light)'
                  }}
                >
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 px-4 rounded-lg border font-semibold font-secondary flex items-center justify-center space-x-3 hover:opacity-70 transition-all duration-200"
            style={{
              backgroundColor: 'var(--color-bg)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)'
            }}
          >
            <FaGoogle className="text-red-500" />
            <span>Sign in with Google</span>
          </button>

         
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p 
            className="text-xs font-secondary"
            style={{ color: 'var(--color-text-light)' }}
          >
            By signing in, you agree to our{' '}
            <Link 
              to="/terms"
              className="hover:opacity-70 transition-opacity duration-200"
              style={{ color: 'var(--color-secondary)' }}
            >
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link 
              to="/privacy"
              className="hover:opacity-70 transition-opacity duration-200"
              style={{ color: 'var(--color-secondary)' }}
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
