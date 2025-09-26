import React, { useState } from 'react';
import { ArrowRight, BookOpen, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

interface CareerPath {
  id: string;
  stream: string;
  degree: string;
  duration: string;
  careers: string[];
  higherStudies: string[];
  exams: string[];
  entrepreneurship: string[];
  color: string;
}

const Careers: React.FC = () => {
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  const careerPaths: CareerPath[] = [
    {
      id: 'science',
      stream: 'Science',
      degree: 'B.Sc. / B.Tech / MBBS',
      duration: '3-5 years',
      careers: [
        'Software Engineer', 'Doctor', 'Research Scientist', 'Data Analyst',
        'Biotechnologist', 'Environmental Scientist', 'Pharmacist', 'Lab Technician'
      ],
      higherStudies: [
        'M.Sc.', 'M.Tech', 'MD/MS', 'Ph.D.', 'MBA in Healthcare',
        'Master in Data Science', 'M.Phil.', 'Post-Graduate Diploma'
      ],
      exams: [
        'JEE Main/Advanced', 'NEET', 'GATE', 'CSIR NET',
        'JAM', 'BITSAT', 'VITEEE', 'State Engineering Exams'
      ],
      entrepreneurship: [
        'Tech Startup', 'Biotech Company', 'Healthcare Services',
        'Environmental Consulting', 'Food Processing', 'EdTech Platform'
      ],
      color: 'blue'
    },
    {
      id: 'commerce',
      stream: 'Commerce',
      degree: 'B.Com / BBA / BCA',
      duration: '3 years',
      careers: [
        'Chartered Accountant', 'Financial Analyst', 'Business Manager', 'Investment Banker',
        'Marketing Executive', 'Tax Consultant', 'Auditor', 'Business Analyst'
      ],
      higherStudies: [
        'MBA', 'M.Com', 'CA', 'CS', 'CFA', 'FRM',
        'Master in Finance', 'Master in Economics'
      ],
      exams: [
        'CA Foundation', 'CS Foundation', 'CMA Foundation', 'CAT',
        'XAT', 'GMAT', 'Bank PO Exams', 'SSC CGL'
      ],
      entrepreneurship: [
        'Consulting Firm', 'E-commerce Business', 'Financial Services',
        'Import/Export Business', 'Digital Marketing Agency', 'Real Estate'
      ],
      color: 'green'
    },
    {
      id: 'arts',
      stream: 'Arts & Humanities',
      degree: 'B.A. / BFA / B.Ed',
      duration: '3 years',
      careers: [
        'Teacher', 'Journalist', 'Lawyer', 'Social Worker', 'Psychologist',
        'Content Writer', 'Civil Servant', 'Public Relations Officer'
      ],
      higherStudies: [
        'M.A.', 'LLB/LLM', 'M.Ed', 'MSW', 'M.Phil.', 'Ph.D.',
        'Mass Communication', 'Psychology Masters'
      ],
      exams: [
        'UPSC Civil Services', 'State PSC', 'NET/JRF', 'CTET/TET',
        'CLAT', 'Journalism Entrance', 'B.Ed Entrance', 'DUET'
      ],
      entrepreneurship: [
        'Media House', 'NGO/Social Enterprise', 'Content Agency',
        'Training Institute', 'Arts & Crafts Business', 'Publishing House'
      ],
      color: 'purple'
    },
    {
      id: 'vocational',
      stream: 'Vocational',
      degree: 'Diploma / ITI / Certificate',
      duration: '6 months - 3 years',
      careers: [
        'Graphic Designer', 'Web Developer', 'Chef', 'Fashion Designer',
        'Photographer', 'Interior Designer', 'Mechanic', 'Electrician'
      ],
      higherStudies: [
        'Advanced Diploma', 'B.Voc', 'Specialized Certification',
        'International Certifications', 'Skill Enhancement Courses'
      ],
      exams: [
        'Skill Development Assessments', 'Industry Certifications',
        'Adobe Certified Expert', 'Google Certifications', 'Microsoft Certifications'
      ],
      entrepreneurship: [
        'Design Studio', 'Restaurant/Catering', 'Photography Business',
        'Fashion Brand', 'Interior Design Firm', 'Auto Service Center'
      ],
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'border-blue-500 bg-blue-50',
    green: 'border-green-500 bg-green-50',
    purple: 'border-purple-500 bg-purple-50',
    orange: 'border-orange-500 bg-orange-50'
  };

  const iconClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Path Exploration</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the journey from your chosen stream to your dream career. 
            Click on any stream to explore detailed pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {careerPaths.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedStream(selectedStream === path.id ? null : path.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 text-left ${
                selectedStream === path.id 
                  ? colorClasses[path.color as keyof typeof colorClasses] + ' shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 shadow-md'
              }`}
            >
              <div className="text-center">
                <GraduationCap className={`h-12 w-12 mx-auto mb-4 ${
                  selectedStream === path.id 
                    ? iconClasses[path.color as keyof typeof iconClasses]
                    : 'text-gray-400'
                }`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.stream}</h3>
                <p className="text-sm text-gray-600 mb-1">{path.degree}</p>
                <p className="text-xs text-gray-500">{path.duration}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedStream && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {(() => {
              const path = careerPaths.find(p => p.id === selectedStream)!;
              return (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {path.stream} Career Journey
                    </h2>
                    <p className="text-lg text-gray-600">
                      Complete roadmap from degree to career success
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Degrees Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Degree Options</h3>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="font-medium text-blue-900">{path.degree}</p>
                        <p className="text-sm text-blue-700 mt-1">Duration: {path.duration}</p>
                      </div>
                    </div>

                    {/* Careers Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Briefcase className="h-6 w-6 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Career Options</h3>
                      </div>
                      <div className="space-y-2">
                        {path.careers.slice(0, 6).map((career, index) => (
                          <div key={index} className="bg-green-50 rounded p-2">
                            <p className="text-sm text-green-800">{career}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Higher Studies Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <GraduationCap className="h-6 w-6 text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Higher Studies</h3>
                      </div>
                      <div className="space-y-2">
                        {path.higherStudies.slice(0, 6).map((study, index) => (
                          <div key={index} className="bg-purple-50 rounded p-2">
                            <p className="text-sm text-purple-800">{study}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Entrepreneurship Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="h-6 w-6 text-orange-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Business Ideas</h3>
                      </div>
                      <div className="space-y-2">
                        {path.entrepreneurship.map((business, index) => (
                          <div key={index} className="bg-orange-50 rounded p-2">
                            <p className="text-sm text-orange-800">{business}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Important Exams Section */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Entrance Exams</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {path.exams.map((exam, index) => (
                        <div key={index} className="bg-white rounded p-3 text-center shadow-sm">
                          <p className="text-sm font-medium text-gray-800">{exam}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                        <span>Find Colleges for {path.stream}</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                      <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                        Download Career Guide
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {!selectedStream && (
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Start Your Career Exploration
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Click on any stream above to see detailed career pathways, including degree options, 
                job opportunities, higher studies, and entrepreneurship possibilities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Information</h4>
                  <p className="text-sm text-gray-600">Get detailed insights into each career path with real-world examples</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Future-Ready Guidance</h4>
                  <p className="text-sm text-gray-600">Explore emerging careers and entrepreneurship opportunities</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers;