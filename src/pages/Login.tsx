import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LogIn } from 'lucide-react';
import { useUser } from '../context/UserContext';
import TranslatedText from '../components/TranslatedText';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '12' as '10' | '12',
    interests: [] as string[]
  });
  const { login } = useUser();
  const navigate = useNavigate();

  const interestOptions = [
    'Science & Technology', 'Mathematics', 'Literature', 'Arts & Design',
    'Business & Commerce', 'Social Sciences', 'Sports', 'Music',
    'Engineering', 'Medicine', 'Teaching', 'Research'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      login(formData);
      navigate('/dashboard');
    } else {
      // For demo purposes, use demo data for login
      login({
        name: 'Demo Student',
        email: 'demo@student.com',
        class: '12',
        interests: ['Science & Technology', 'Mathematics', 'Engineering']
      });
      navigate('/dashboard');
    }
  };

  const handleInterestChange = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: newInterests });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <TranslatedText
            as="h2"
            text={isSignUp ? 'Create Your Account' : 'Welcome Back'}
            className="text-3xl font-bold text-gray-900 mb-2"
          />
          <TranslatedText
            as="p"
            text={isSignUp ? 'Start your career journey today' : 'Continue your career exploration'}
            className="text-gray-600"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <>
                <div>
                  <TranslatedText
                    as="label"
                    text="Full Name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  />
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <TranslatedText
                    as="label"
                    text="Current Class"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  />
                  <select
                    id="class"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value as '10' | '12' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="10"><TranslatedText text="Class 10" /></option>
                    <option value="12"><TranslatedText text="Class 12" /></option>
                  </select>
                </div>
              </>
            )}

            <div>
              <TranslatedText
                as="label"
                text="Email Address"
                className="block text-sm font-medium text-gray-700 mb-1"
              />
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {isSignUp && (
              <div>
                <TranslatedText
                  as="label"
                  text="Areas of Interest (Select multiple)"
                  className="block text-sm font-medium text-gray-700 mb-3"
                />
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <TranslatedText text={interest} className="ml-2 text-sm text-gray-700" />
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              {isSignUp ? (
                <>
                  <UserPlus className="h-5 w-5" />
                  <TranslatedText text="Create Account" />
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <TranslatedText text="Sign In" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              <TranslatedText text={isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;