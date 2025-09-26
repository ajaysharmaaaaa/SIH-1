import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleCheck as CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { geminiService } from '../services/geminiService';
import { QuizResult } from '../types';
import TranslatedText from '../components/TranslatedText';

interface AIQuestion {
  id: number;
  question: string;
  options: { text: string; weight: { science: number; commerce: number; arts: number; vocational: number } }[];
  category: string;
}

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<AIQuestion[]>([]);
  const [answers, setAnswers] = useState<Array<{ question: string; answer: string; weights: any }>>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const { user, updateQuizResult } = useUser();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Enhanced question categories
  const questionCategories = [
    'interests', 'strengths', 'work_preferences', 'location_preferences', 
    'financial_considerations', 'career_goals', 'learning_style', 'personality'
  ];

  const standardQuestions: AIQuestion[] = [
    {
      id: 1,
      question: language === 'hi' ? "आप किस प्रकार की गतिविधियों में सबसे अधिक रुचि रखते हैं?" : "Which activities do you find most engaging?",
      options: [
        { 
          text: language === 'hi' ? "प्रयोग करना और डेटा का विश्लेषण करना" : "Conducting experiments and analyzing data", 
          weight: { science: 3, commerce: 1, arts: 0, vocational: 1 }
        },
        { 
          text: language === 'hi' ? "पैसे का प्रबंधन और व्यापार को समझना" : "Managing money and understanding business", 
          weight: { science: 1, commerce: 3, arts: 1, vocational: 1 }
        },
        { 
          text: language === 'hi' ? "पढ़ना, लिखना और विचारों पर चर्चा करना" : "Reading, writing, and discussing ideas", 
          weight: { science: 0, commerce: 1, arts: 3, vocational: 1 }
        },
        { 
          text: language === 'hi' ? "व्यावहारिक कौशल और शिल्प सीखना" : "Learning practical skills and crafts", 
          weight: { science: 1, commerce: 0, arts: 1, vocational: 3 }
        }
      ],
      category: 'interests'
    },
    {
      id: 2,
      question: language === 'hi' ? "क्या आप घर से दूर कॉलेज जाना पसंद करेंगे?" : "Would you prefer to go to college away from home?",
      options: [
        { 
          text: language === 'hi' ? "हाँ, मैं नए अनुभवों के लिए दूर जाना चाहूंगा" : "Yes, I want to go away for new experiences", 
          weight: { science: 2, commerce: 2, arts: 2, vocational: 1 }
        },
        { 
          text: language === 'hi' ? "घर के 0-50 किमी के दायरे में रहना पसंद करूंगा" : "I prefer to stay within 0-50km radius from home", 
          weight: { science: 1, commerce: 1, arts: 1, vocational: 2 }
        },
        { 
          text: language === 'hi' ? "यह कॉलेज की गुणवत्ता पर निर्भर करता है" : "It depends on the quality of the college", 
          weight: { science: 2, commerce: 2, arts: 2, vocational: 2 }
        },
        { 
          text: language === 'hi' ? "मैं निश्चित नहीं हूं" : "I'm not sure", 
          weight: { science: 1, commerce: 1, arts: 1, vocational: 1 }
        }
      ],
      category: 'location_preferences'
    },
    {
      id: 3,
      question: language === 'hi' ? "यदि आपका पसंदीदा कोर्स किसी कॉलेज में उपलब्ध नहीं है, तो आप क्या करेंगे?" : "If your preferred course is not available in a college, what would you do?",
      options: [
        { 
          text: language === 'hi' ? "दूसरे कॉलेज में जाऊंगा जहाँ यह कोर्स उपलब्ध है" : "I would go to another college where this course is available", 
          weight: { science: 3, commerce: 3, arts: 3, vocational: 3 }
        },
        { 
          text: language === 'hi' ? "उसी कॉलेज में समान कोर्स चुनूंगा" : "I would choose a similar course in the same college", 
          weight: { science: 2, commerce: 2, arts: 2, vocational: 2 }
        },
        { 
          text: language === 'hi' ? "कॉलेज की प्रतिष्ठा को प्राथमिकता दूंगा" : "I would prioritize the college's reputation", 
          weight: { science: 2, commerce: 3, arts: 2, vocational: 1 }
        },
        { 
          text: language === 'hi' ? "अपने माता-पिता से सलाह लूंगा" : "I would consult with my parents", 
          weight: { science: 1, commerce: 1, arts: 1, vocational: 1 }
        }
      ],
      category: 'preferences'
    }
  ];

  const startQuiz = async () => {
    setLoading(true);
    setQuizStarted(true);
    setQuestions(standardQuestions);
    setLoading(false);
  };

  const generateNextQuestion = async () => {
    if (currentQuestion >= 14) { // Limit to 15 questions total
      await calculateResult();
      return;
    }

    setLoading(true);
    try {
      const previousAnswers = answers.map(a => ({ question: a.question, answer: a.answer }));
      const nextQuestion = await geminiService.generateNextQuestion(previousAnswers, currentQuestion, language);
      
      const aiQuestion: AIQuestion = {
        id: currentQuestion + 1,
        question: nextQuestion.question,
        options: nextQuestion.options,
        category: nextQuestion.category
      };
      
      setQuestions(prev => [...prev, aiQuestion]);
    } catch (error) {
      console.error('Error generating next question:', error);
      // Use fallback question
      const fallbackQuestion: AIQuestion = {
        id: currentQuestion + 1,
        question: language === 'hi' ? "आप किस प्रकार के काम के माहौल को पसंद करते हैं?" : "What type of work environment do you prefer?",
        options: [
          { text: language === 'hi' ? "शांत और केंद्रित" : "Quiet and focused", weight: { science: 3, commerce: 2, arts: 2, vocational: 1 } },
          { text: language === 'hi' ? "सहयोगी और टीम-आधारित" : "Collaborative and team-based", weight: { science: 1, commerce: 3, arts: 3, vocational: 2 } },
          { text: language === 'hi' ? "रचनात्मक और लचीला" : "Creative and flexible", weight: { science: 1, commerce: 1, arts: 3, vocational: 3 } },
          { text: language === 'hi' ? "संरचित और व्यवस्थित" : "Structured and organized", weight: { science: 2, commerce: 3, arts: 1, vocational: 2 } }
        ],
        category: 'work_preferences'
      };
      setQuestions(prev => [...prev, fallbackQuestion]);
    }
    setLoading(false);
  };

  const calculateResult = async (): Promise<QuizResult> => {
    setLoading(true);
    try {
      const aiResult = await geminiService.generateCareerRecommendations(answers, language);
      
      const result: QuizResult = {
        stream: aiResult.primaryStream as 'Science' | 'Commerce' | 'Arts' | 'Vocational',
        score: aiResult.confidence,
        strengths: aiResult.skillsTodevelop,
        recommendations: aiResult.careerPaths,
        completedAt: new Date()
      };
      
      setResult(result);
      setShowResult(true);
      if (user) {
        updateQuizResult(result);
      }
      return result;
    } catch (error) {
      console.error('Error calculating result:', error);
      // Fallback calculation
      const streamScores = { Science: 0, Commerce: 0, Arts: 0, Vocational: 0 };
      
      answers.forEach(answer => {
        if (answer.weights) {
          streamScores.Science += answer.weights.science || 0;
          streamScores.Commerce += answer.weights.commerce || 0;
          streamScores.Arts += answer.weights.arts || 0;
          streamScores.Vocational += answer.weights.vocational || 0;
        }
      });
      
      const topStream = Object.entries(streamScores).reduce((a, b) => 
        streamScores[a[0] as keyof typeof streamScores] > streamScores[b[0] as keyof typeof streamScores] ? a : b
      )[0] as 'Science' | 'Commerce' | 'Arts' | 'Vocational';
      
      const result: QuizResult = {
        stream: topStream,
        score: 75,
        strengths: ['Analytical thinking', 'Problem solving', 'Communication'],
        recommendations: ['Engineering', 'Research', 'Teaching'],
        completedAt: new Date()
      };
      
      setResult(result);
      setShowResult(true);
      if (user) {
        updateQuizResult(result);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    const question = questions[currentQuestion];
    const selectedOption = question.options[answerIndex];
    
    const newAnswer = {
      question: question.question,
      answer: selectedOption.text,
      weights: selectedOption.weight
    };
    
    setAnswers(prev => [...prev, newAnswer]);

    if (currentQuestion < questions.length - 1 && currentQuestion < 14) {
      setCurrentQuestion(currentQuestion + 1);
      if (currentQuestion >= standardQuestions.length - 1) {
        await generateNextQuestion();
      }
    } else {
      await calculateResult();
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuestions([]);
    setShowResult(false);
    setResult(null);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <TranslatedText
            as="h1"
            text="Career Aptitude Quiz"
            className="text-4xl font-bold text-gray-900 mb-4"
          />
          <TranslatedText
            as="p"
            text="Our AI-powered career assessment will help you discover the most suitable academic stream and career path for you."
            className="text-xl text-gray-600 mb-8"
          />
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <TranslatedText
              as="h2"
              text="Quiz Features:"
              className="text-2xl font-semibold text-gray-900 mb-4"
            />
            <ul className="text-left space-y-3 text-gray-700">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <TranslatedText text="AI-powered personalized questions" />
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <TranslatedText text="Location preference assessment" />
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <TranslatedText text="Course vs college preference analysis" />
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <TranslatedText text="Detailed career recommendations" />
              </li>
            </ul>
          </div>
          <button
            onClick={startQuiz}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? <TranslatedText text="Loading..." /> : <TranslatedText text="Start Quiz" />}
          </button>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
           <TranslatedText
             as="h1"
             text="Quiz Complete!"
             className="text-4xl font-bold text-gray-900 mb-2"
           />
           <TranslatedText
             as="p"
             text="Here are your personalized results"
             className="text-xl text-gray-600"
           />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
                <span className="text-4xl font-bold text-white">{result.score}%</span>
              </div>
             <TranslatedText
               as="h2"
               text={`Recommended Stream: ${result.stream}`}
               className="text-3xl font-bold text-gray-900 mb-2"
             />
             <TranslatedText
               as="p"
               text="Based on your responses, this stream aligns best with your interests and strengths."
               className="text-lg text-gray-600"
             />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
               <TranslatedText
                 as="h3"
                 text="Your Strengths"
                 className="text-xl font-semibold text-gray-900 mb-4"
               />
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                     <TranslatedText text={strength} className="text-gray-700" />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
               <TranslatedText
                 as="h3"
                 text="Recommendations"
                 className="text-xl font-semibold text-gray-900 mb-4"
               />
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                     <TranslatedText text={rec} className="text-gray-700" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/careers')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <TranslatedText text="Explore Career Paths" />
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/colleges')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              <TranslatedText text="Find Colleges" />
            </button>
            <button
              onClick={resetQuiz}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-5 w-5" />
              <TranslatedText text="Retake Quiz" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <TranslatedText text="Loading..." className="text-lg text-gray-600" />
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / Math.min(questions.length + 5, 15)) * 100;
  const question = questions[currentQuestion];

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <TranslatedText
            as="h1"
            text="Career Aptitude Quiz"
            className="text-4xl font-bold text-gray-900 mb-4"
          />
          <TranslatedText
            as="p"
            text="Answer these questions honestly to discover the best academic stream for you"
            className="text-lg text-gray-600 mb-6"
          />
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            <TranslatedText text="Question" /> {currentQuestion + 1} <TranslatedText text="of" /> {Math.min(15, questions.length + 5)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <TranslatedText
            as="h2"
            text={question.question}
            className="text-2xl font-semibold text-gray-900 mb-8 text-center"
          />

          <div className="grid gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={loading}
                className="text-left p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 transform hover:scale-102"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
                  </div>
                  <TranslatedText text={option.text} className="text-gray-800 font-medium" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;