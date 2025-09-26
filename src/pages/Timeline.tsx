import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import { mockTimeline } from '../data/mockData';

const Timeline: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'admission' | 'exam' | 'scholarship' | 'counseling'>('all');
  const [showPast, setShowPast] = useState(false);

  const today = new Date();
  
  const filteredTimeline = mockTimeline
    .filter(event => {
      if (!showPast && event.date < today) return false;
      if (filter === 'all') return true;
      return event.type === filter;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <CheckCircle className="h-5 w-5" />;
      case 'admission':
        return <Calendar className="h-5 w-5" />;
      case 'scholarship':
        return <AlertCircle className="h-5 w-5" />;
      case 'counseling':
        return <Clock className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: string, important: boolean) => {
    const baseColors = {
      exam: important ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800',
      admission: important ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800',
      scholarship: important ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800',
      counseling: important ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-800'
    };
    return baseColors[type as keyof typeof baseColors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getDaysUntil = (date: Date) => {
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days away`;
  };

  const isEventSoon = (date: Date) => {
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  const isEventPast = (date: Date) => {
    return date < today;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Timeline</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Never miss important dates! Keep track of admission deadlines, exam schedules, and scholarship opportunities.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Events</h2>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Events' },
                { key: 'exam', label: 'Exams' },
                { key: 'admission', label: 'Admissions' },
                { key: 'scholarship', label: 'Scholarships' },
                { key: 'counseling', label: 'Counseling' }
              ].map(option => (
                <button
                  key={option.key}
                  onClick={() => setFilter(option.key as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === option.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showPast}
                onChange={(e) => setShowPast(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Show past events</span>
            </label>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {filteredTimeline.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                isEventPast(event.date) ? 'opacity-75' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                      getEventColor(event.type, event.important)
                    }`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-900">
                      {formatDate(event.date)}
                    </div>
                    <div className={`text-xs mt-1 ${
                      isEventPast(event.date) ? 'text-gray-400' :
                      isEventSoon(event.date) ? 'text-red-600 font-medium' : 'text-gray-500'
                    }`}>
                      {getDaysUntil(event.date)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      {event.important && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Important
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                        getEventColor(event.type, false)
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    
                    {isEventSoon(event.date) && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                          <span className="text-sm font-medium text-yellow-800">
                            Reminder: This event is coming up soon!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Events */}
        {filteredTimeline.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600 mb-4">
                {showPast 
                  ? "No events match your current filter criteria."
                  : "No upcoming events match your filter. Try including past events."
                }
              </p>
              <button
                onClick={() => {
                  setFilter('all');
                  setShowPast(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Show All Events
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {filteredTimeline.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {mockTimeline.filter(e => e.type === 'exam' && e.date >= today).length}
                </div>
                <div className="text-sm text-gray-600">Upcoming Exams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {mockTimeline.filter(e => e.type === 'admission' && e.date >= today).length}
                </div>
                <div className="text-sm text-gray-600">Admission Deadlines</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {mockTimeline.filter(e => e.type === 'scholarship' && e.date >= today).length}
                </div>
                <div className="text-sm text-gray-600">Scholarship Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {mockTimeline.filter(e => e.important && e.date >= today && getDaysUntil(e.date).includes('days away') && parseInt(getDaysUntil(e.date)) <= 7).length}
                </div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;