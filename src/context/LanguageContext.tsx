import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translationService, SupportedLanguage, supportedLanguages } from '../services/translationService';

type Language = SupportedLanguage;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateText: (text: string) => Promise<string>;
  isTranslating: boolean;
  supportedLanguages: typeof supportedLanguages;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.quiz': 'Aptitude Quiz',
    'nav.careers': 'Career Paths',
    'nav.colleges': 'Colleges',
    'nav.timeline': 'Timeline',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Home Page
    'home.title': 'Your Future Starts with the Right Choice',
    'home.subtitle': 'Personalized career guidance for Class 10 & 12 students. Discover your path through government colleges and build your dream career.',
    'home.takeQuiz': 'Take Aptitude Quiz',
    'home.exploreColleges': 'Explore Colleges',
    'home.features.title': 'Everything You Need for Career Success',
    'home.features.subtitle': 'Our comprehensive platform provides all the tools and guidance you need to make informed decisions about your future.',
    
    // Quiz
    'quiz.title': 'Career Aptitude Quiz',
    'quiz.subtitle': 'Answer these questions honestly to discover the best academic stream for you',
    'quiz.complete': 'Quiz Complete!',
    'quiz.results': 'Here are your personalized results',
    'quiz.retake': 'Retake Quiz',
    'quiz.explorecareers': 'Explore Career Paths',
    'quiz.findcolleges': 'Find Colleges',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.viewall': 'View All',
    'common.getstarted': 'Get Started Today'
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.quiz': 'योग्यता परीक्षा',
    'nav.careers': 'करियर पथ',
    'nav.colleges': 'कॉलेज',
    'nav.timeline': 'समयसीमा',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.login': 'लॉगिन',
    'nav.logout': 'लॉगआउट',
    
    // Home Page
    'home.title': 'आपका भविष्य सही चुनाव से शुरू होता है',
    'home.subtitle': 'कक्षा 10 और 12 के छात्रों के लिए व्यक्तिगत करियर मार्गदर्शन। सरकारी कॉलेजों के माध्यम से अपना रास्ता खोजें और अपना सपनों का करियर बनाएं।',
    'home.takeQuiz': 'योग्यता परीक्षा लें',
    'home.exploreColleges': 'कॉलेज देखें',
    'home.features.title': 'करियर सफलता के लिए आपको जो कुछ चाहिए',
    'home.features.subtitle': 'हमारा व्यापक प्लेटफॉर्म आपके भविष्य के बारे में सूचित निर्णय लेने के लिए आवश्यक सभी उपकरण और मार्गदर्शन प्रदान करता है।',
    
    // Quiz
    'quiz.title': 'करियर योग्यता परीक्षा',
    'quiz.subtitle': 'आपके लिए सबसे अच्छी शैक्षणिक धारा खोजने के लिए इन प्रश्नों का ईमानदारी से उत्तर दें',
    'quiz.complete': 'परीक्षा पूर्ण!',
    'quiz.results': 'यहाँ आपके व्यक्तिगत परिणाम हैं',
    'quiz.retake': 'परीक्षा फिर से लें',
    'quiz.explorecareers': 'करियर पथ देखें',
    'quiz.findcolleges': 'कॉलेज खोजें',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.search': 'खोजें...',
    'common.filter': 'फिल्टर',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.submit': 'जमा करें',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.viewall': 'सभी देखें',
    'common.getstarted': 'आज ही शुरू करें'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const translateText = async (text: string): Promise<string> => {
    if (language === 'en') return text;
    
    setIsTranslating(true);
    try {
      const translated = await translationService.translateText(text, language);
      return translated;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };
  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      translateText, 
      isTranslating,
      supportedLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};