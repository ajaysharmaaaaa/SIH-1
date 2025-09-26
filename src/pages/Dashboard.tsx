import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, BookOpen, TrendingUp, Calendar, MapPin, 
  Award, Clock, CheckCircle, ArrowRight, Target 
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { mockColleges, mockTimeline } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please log in to access your dashboard</h2>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const savedColleges = mockColleges.filter(college => user.savedColleges.includes(college.id));
  const upcomingEvents = mockTimeline
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  const getRecommendedColleges = () => {
    if (!user.quizResults) return [];
    
    const streamMap: Record<string, string> = {
      'Science': 'Science',
      'Commerce': 'Commerce', 
      'Arts': 'Arts',
      'Vocational': 'Science' // Default to Science for demo
    };

    const targetStream = streamMap[user.quizResults.stream];
    return mockColleges.filter(college => 
      college.courses.some(course => course.stream === targetStream)
    ).slice(0, 3);
  };

  const recommendedColleges = getRecommendedColleges();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Continue your journey towards the perfect career path
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Profile Completion</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {user.quizResults ? '85%' : '60%'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Saved Colleges</p>
                <p className="text-2xl font-semibold text-gray-900">{savedColleges.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Quiz Status</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {user.quizResults ? 'Complete' : 'Pending'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-semibold text-gray-900">{upcomingEvents.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quiz Results */}
            {user.quizResults ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Your Career Assessment</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Completed
                  </span>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Recommended Stream: {user.quizResults.stream}
                      </h3>
                      <p className="text-gray-600">Score: {user.quizResults.score}%</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Your Strengths:</h4>
                      <ul className="space-y-1">
                        {user.quizResults.strengths.slice(0, 3).map((strength, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Top Recommendations:</h4>
                      <ul className="space-y-1">
                        {user.quizResults.recommendations.slice(0, 2).map((rec, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-700">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <Link
                    to="/careers"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Explore Career Paths
                  </Link>
                  <Link
                    to="/quiz"
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Retake Quiz
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Complete Your Career Assessment
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Take our comprehensive quiz to discover your ideal academic stream and career path.
                  </p>
                  <Link
                    to="/quiz"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Start Quiz
                  </Link>
                </div>
              </div>
            )}

            {/* Recommended Colleges */}
            {recommendedColleges.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Recommended Colleges</h2>
                  <Link
                    to="/colleges"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {recommendedColleges.map((college) => (
                    <div key={college.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{college.name}</h3>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {college.type}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {college.location.city}, {college.location.state}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {college.courses.length} courses available
                        </span>
                        <Link
                          to="/colleges"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                <Link
                  to="/timeline"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-medium text-gray-900 text-sm">{event.title}</h3>
                    <p className="text-xs text-gray-600 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.date.toLocaleDateString('en-IN', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                ))}
                {upcomingEvents.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No upcoming events
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/quiz"
                  className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <Target className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-blue-900">
                    {user.quizResults ? 'Retake Quiz' : 'Take Career Quiz'}
                  </span>
                </Link>
                <Link
                  to="/colleges"
                  className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                >
                  <MapPin className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-green-900">Find Colleges</span>
                </Link>
                <Link
                  to="/careers"
                  className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                >
                  <TrendingUp className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-purple-900">Explore Careers</span>
                </Link>
              </div>
            </div>

            {/* Saved Colleges */}
            {savedColleges.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Colleges</h2>
                <div className="space-y-2">
                  {savedColleges.slice(0, 3).map((college) => (
                    <div key={college.id} className="text-sm">
                      <div className="font-medium text-gray-900 truncate">{college.name}</div>
                      <div className="text-gray-600">{college.location.city}</div>
                    </div>
                  ))}
                  {savedColleges.length > 3 && (
                    <div className="text-sm text-gray-500 pt-2">
                      And {savedColleges.length - 3} more...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;