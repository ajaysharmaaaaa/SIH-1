export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'mr' | 'te' | 'ta';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const supportedLanguages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
];

// Static translations for common phrases
const staticTranslations: Record<SupportedLanguage, Record<string, string>> = {
  en: {},
  hi: {
    // Home page content
    'Your Future Starts with the Right Choice': 'आपका भविष्य सही चुनाव से शुरू होता है',
    'Personalized career guidance for Class 10 & 12 students. Discover your path through government colleges and build your dream career.': 'कक्षा 10 और 12 के छात्रों के लिए व्यक्तिगत करियर मार्गदर्शन। सरकारी कॉलेजों के माध्यम से अपना रास्ता खोजें और अपना सपनों का करियर बनाएं।',
    'Take Aptitude Quiz': 'योग्यता परीक्षा लें',
    'Explore Colleges': 'कॉलेज देखें',
    'Everything You Need for Career Success': 'करियर सफलता के लिए आपको जो कुछ चाहिए',
    'Our comprehensive platform provides all the tools and guidance you need to make informed decisions about your future.': 'हमारा व्यापक प्लेटफॉर्म आपके भविष्य के बारे में सूचित निर्णय लेने के लिए आवश्यक सभी उपकरण और मार्गदर्शन प्रदान करता है।',
    'Ready to Discover Your Path?': 'अपना रास्ता खोजने के लिए तैयार हैं?',
    'Join thousands of students who have found their perfect career match through our platform.': 'हजारों छात्रों से जुड़ें जिन्होंने हमारे प्लेटफॉर्म के माध्यम से अपना सही करियर मैच पाया है।',
    'Get Started Today': 'आज ही शुरू करें',
    
    // Features
    'Aptitude Assessment': 'योग्यता मूल्यांकन',
    'Discover your strengths and interests through scientifically designed quizzes': 'वैज्ञानिक रूप से डिज़ाइन की गई प्रश्नोत्तरी के माध्यम से अपनी शक्तियों और रुचियों की खोज करें',
    'Career Mapping': 'करियर मैपिंग',
    'Visualize your career journey from degree to dream job': 'डिग्री से लेकर सपनों की नौकरी तक अपनी करियर यात्रा को देखें',
    'College Directory': 'कॉलेज निर्देशिका',
    'Find government colleges near you with detailed information': 'विस्तृत जानकारी के साथ अपने पास के सरकारी कॉलेज खोजें',
    'Timeline Tracker': 'समयसीमा ट्रैकर',
    'Never miss important admission deadlines and exam dates': 'महत्वपूर्ण प्रवेश की अंतिम तिथि और परीक्षा की तारीखें कभी न चूकें',
    'Expert Guidance': 'विशेषज्ञ मार्गदर्शन',
    'Get personalized recommendations based on your profile': 'अपनी प्रोफ़ाइल के आधार पर व्यक्तिगत सिफारिशें प्राप्त करें',
    'Scholarship Info': 'छात्रवृत्ति जानकारी',
    'Access information about scholarships and financial aid': 'छात्रवृत्ति और वित्तीय सहायता के बारे में जानकारी प्राप्त करें',
    
    // Stats
    'Students Guided': 'छात्रों का मार्गदर्शन',
    'Government Colleges': 'सरकारी कॉलेज',
    'Career Paths': 'करियर पथ',
    'Success Rate': 'सफलता दर'
  },
  bn: {},
  mr: {},
  te: {},
  ta: {}
};

class TranslationService {
  private cache: Map<string, Map<SupportedLanguage, string>> = new Map();

  private getCacheKey(text: string): string {
    return text.toLowerCase().trim();
  }

  async translateText(text: string, targetLanguage: SupportedLanguage): Promise<string> {
    // Return original text if target is English
    if (targetLanguage === 'en') {
      return text;
    }

    // Check static translations first
    const staticTranslation = staticTranslations[targetLanguage]?.[text];
    if (staticTranslation) {
      return staticTranslation;
    }

    // Check cache
    const cacheKey = this.getCacheKey(text);
    const languageCache = this.cache.get(cacheKey);
    if (languageCache?.has(targetLanguage)) {
      return languageCache.get(targetLanguage)!;
    }

    try {
      // For now, return the original text as a fallback
      // In a real implementation, this would make an API call to your backend
      const translation = text; // Placeholder - would be actual translation from backend API
      
      // Store in cache
      if (!this.cache.has(cacheKey)) {
        this.cache.set(cacheKey, new Map());
      }
      this.cache.get(cacheKey)!.set(targetLanguage, translation);

      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  }

  async translateMultiple(texts: string[], targetLanguage: SupportedLanguage): Promise<string[]> {
    if (targetLanguage === 'en') {
      return texts;
    }

    try {
      // Translate each text individually to use static translations
      const translations = await Promise.all(
        texts.map(text => this.translateText(text, targetLanguage))
      );

      return translations;
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts; // Return original texts on error
    }
  }

  async translateObject<T extends Record<string, any>>(
    obj: T, 
    targetLanguage: SupportedLanguage,
    excludeKeys: string[] = []
  ): Promise<T> {
    if (targetLanguage === 'en') {
      return obj;
    }

    const result = { ...obj };
    const textsToTranslate: string[] = [];
    const keyMap: Array<{ key: string; path: string[] }> = [];

    const extractTexts = (current: any, path: string[] = []) => {
      for (const [key, value] of Object.entries(current)) {
        if (excludeKeys.includes(key)) continue;
        
        const currentPath = [...path, key];
        if (typeof value === 'string' && value.trim()) {
          textsToTranslate.push(value);
          keyMap.push({ key: value, path: currentPath });
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          extractTexts(value, currentPath);
        }
      }
    };

    extractTexts(result);

    if (textsToTranslate.length === 0) {
      return result;
    }

    try {
      const translations = await this.translateMultiple(textsToTranslate, targetLanguage);
      
      keyMap.forEach(({ key, path }, index) => {
        let current = result;
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]];
        }
        current[path[path.length - 1]] = translations[index];
      });
    } catch (error) {
      console.error('Object translation error:', error);
    }

    return result;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const translationService = new TranslationService();