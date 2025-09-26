import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translationService } from '../services/translationService';

export function useTranslatedData<T extends Record<string, any>>(
  data: T | T[],
  excludeKeys: string[] = ['id', 'coordinates', 'established', 'website', 'fees']
) {
  const { language } = useLanguage();
  const [translatedData, setTranslatedData] = useState<T | T[]>(data);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translateData = async () => {
      if (language === 'en') {
        setTranslatedData(data);
        return;
      }

      setIsLoading(true);
      try {
        if (Array.isArray(data)) {
          const translated = await Promise.all(
            data.map(item => translationService.translateObject(item, language, excludeKeys))
          );
          setTranslatedData(translated);
        } else {
          const translated = await translationService.translateObject(data, language, excludeKeys);
          setTranslatedData(translated);
        }
      } catch (error) {
        console.error('Data translation failed:', error);
        setTranslatedData(data);
      } finally {
        setIsLoading(false);
      }
    };

    translateData();
  }, [data, language, excludeKeys]);

  return { translatedData, isLoading };
}