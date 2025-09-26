import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface TranslatedTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  fallback?: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  text, 
  className = '', 
  as: Component = 'span',
  fallback = text
}) => {
  const { language, translateText } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translate = async () => {
      if (language === 'en') {
        setTranslatedText(text);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await translateText(text);
        setTranslatedText(translated);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedText(fallback);
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [text, language, translateText, fallback]);

  // Don't show loading state for better UX - just show the text immediately
  return (
    <Component className={className}>
      {translatedText}
    </Component>
  );
};

export default TranslatedText;