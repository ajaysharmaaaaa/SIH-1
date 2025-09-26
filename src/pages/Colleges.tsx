import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Bookmark, BookmarkCheck, ExternalLink, ListFilter as Filter } from 'lucide-react';
import { mockColleges } from '../data/mockData';
import { useUser } from '../context/UserContext';
import { College } from '../types';
import TranslatedText from '../components/TranslatedText';
import { useTranslatedData } from '../hooks/useTranslatedData';

const Colleges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { user, toggleSavedCollege } = useUser();
  const { translatedData: colleges, isLoading: isTranslatingColleges } = useTranslatedData(mockColleges);

  const streams = ['Science', 'Commerce', 'Arts'];
  const states = Array.from(new Set(mockColleges.map(college => college.location.state)));

  const filteredColleges = useMemo(() => {
    const collegeData = Array.isArray(colleges) ? colleges : [colleges];
    let filtered = collegeData.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStream = !selectedStream || 
                           college.courses.some(course => course.stream === selectedStream);
      
      const matchesState = !selectedState || college.location.state === selectedState;

      return matchesSearch && matchesStream && matchesState;
    });

    // Sort colleges
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'established':
          return b.established - a.established;
        case 'location':
          return a.location.city.localeCompare(b.location.city);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedStream, selectedState, sortBy, colleges]);

  const isCollegeSaved = (collegeId: string) => {
    return user?.savedColleges.includes(collegeId) || false;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <TranslatedText
            as="h1"
            text="Government College Directory"
            className="text-4xl font-bold text-gray-900 mb-4"
          />
          <TranslatedText
            as="p"
            text="Discover the best government colleges near you with detailed information about courses, facilities, and admission requirements."
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <TranslatedText
              as="h2"
              text="Filter & Search"
              className="text-lg font-semibold text-gray-900"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search colleges or cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Stream Filter */}
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value=""><TranslatedText text="All Streams" /></option>
              {streams.map(stream => (
                <option key={stream} value={stream}>
                  <TranslatedText text={stream} />
                </option>
              ))}
            </select>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value=""><TranslatedText text="All States" /></option>
              {states.map(state => (
                <option key={state} value={state}>
                  <TranslatedText text={state} />
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name"><TranslatedText text="Sort by Name" /></option>
              <option value="established"><TranslatedText text="Sort by Year" /></option>
              <option value="location"><TranslatedText text="Sort by Location" /></option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <TranslatedText
            as="p"
            text={`Showing ${filteredColleges.length} college${filteredColleges.length !== 1 ? 's' : ''}${(searchTerm || selectedStream || selectedState) ? ' matching your criteria' : ''}`}
            className="text-gray-600"
          />
        </div>

        {/* College Grid */}
        {isTranslatingColleges && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <TranslatedText text="Translating college information..." className="text-gray-600" />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredColleges.map((college) => (
            <div key={college.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              {/* College Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <TranslatedText
                    as="h3"
                    text={college.name}
                    className="text-xl font-semibold text-gray-900 flex-1 mr-3"
                  />
                  {user && (
                    <button
                      onClick={() => toggleSavedCollege(college.id)}
                      className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      {isCollegeSaved(college.id) ? (
                        <BookmarkCheck className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Bookmark className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <TranslatedText text={`${college.location.city}, ${college.location.state}`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Est. {college.established}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <TranslatedText
                    as="span"
                    text={college.type}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  />
                  <a
                    href={`https://${college.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <TranslatedText text="Visit Website" />
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Courses */}
              <div className="p-6">
                <TranslatedText
                  as="h4"
                  text="Available Courses"
                  className="text-lg font-semibold text-gray-900 mb-3"
                />
                <div className="space-y-3">
                  {college.courses.map((course) => (
                    <div key={course.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <TranslatedText
                          as="h5"
                          text={course.name}
                          className="font-medium text-gray-900"
                        />
                        <span className="text-sm font-semibold text-green-600">₹{course.fees.toLocaleString()}/year</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                          <TranslatedText text="Duration" />: <TranslatedText text={course.duration} />
                        </div>
                        <div>
                          <TranslatedText text="Stream" />: <TranslatedText text={course.stream} />
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <TranslatedText text="Eligibility" />: <TranslatedText text={course.eligibility} />
                      </div>
                      {college.cutoffs[course.name] && (
                        <div className="text-sm text-red-600 font-medium mt-1">
                          <TranslatedText text="Last Year Cut-off" />: {college.cutoffs[course.name]}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="px-6 pb-6">
                <TranslatedText
                  as="h4"
                  text="Facilities"
                  className="text-lg font-semibold text-gray-900 mb-3"
                />
                <div className="flex flex-wrap gap-2">
                  {college.facilities.map((facility, index) => (
                    <TranslatedText
                      key={index}
                      as="span"
                      text={facility}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <TranslatedText
                as="h3"
                text="No Colleges Found"
                className="text-xl font-semibold text-gray-900 mb-2"
              />
              <TranslatedText
                as="p"
                text="Try adjusting your search criteria or filters to find more colleges."
                className="text-gray-600 mb-4"
              />
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStream('');
                  setSelectedState('');
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <TranslatedText text="Clear Filters" />
              </button>
            </div>
          </div>
        )}

        {/* Map Integration Placeholder */}
        {filteredColleges.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <TranslatedText
              as="h3"
              text="College Locations"
              className="text-xl font-semibold text-gray-900 mb-4"
            />
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <TranslatedText
                  as="p"
                  text="Interactive map integration coming soon"
                  className="text-gray-600"
                />
                <TranslatedText
                  as="p"
                  text="View all colleges on an interactive map"
                  className="text-sm text-gray-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;