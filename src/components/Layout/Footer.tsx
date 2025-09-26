import React from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">CareerGuide</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering students with personalized career guidance and helping them make informed decisions about their education and future.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@careerguide.gov.in</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>1800-XXX-XXXX</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/quiz" className="hover:text-white transition-colors">Aptitude Quiz</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Career Paths</a></li>
              <li><a href="/colleges" className="hover:text-white transition-colors">College Directory</a></li>
              <li><a href="/timeline" className="hover:text-white transition-colors">Important Dates</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Government Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="https://www.ugc.ac.in/" className="hover:text-white transition-colors">UGC Portal</a></li>
              <li><a href="https://www.scholarships.gov.in/" className="hover:text-white transition-colors">National Scholarships</a></li>
              <li><a href="https://www.nta.ac.in/" className="hover:text-white transition-colors">National Testing Agency</a></li>
              <li><a href="https://www.education.gov.in/" className="hover:text-white transition-colors">Ministry of Education</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 CareerGuide - A Government of India Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;