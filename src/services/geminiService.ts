import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  async generateNextQuestion(
    previousAnswers: Array<{ question: string; answer: string }>,
    currentQuestionIndex: number,
    language: 'en' | 'hi' = 'en'
  ) {
    const context = `
You are an expert career counselor for Indian students. Generate the next question for a comprehensive career aptitude assessment.

Previous answers: ${JSON.stringify(previousAnswers)}
Current question number: ${currentQuestionIndex + 1}

Guidelines:
- Ask questions that cover: interests, strengths, work preferences, location preferences, financial considerations, career goals
- Include questions about distance from home (0-50km radius preference)
- Ask about course preferences vs college reputation
- Make questions relevant to Indian education system
- Language: ${language === 'hi' ? 'Hindi' : 'English'}
- Provide 4 options for each question
- Questions should be progressive and build on previous answers

Return response in this exact JSON format:
{
  "question": "Your question here",
  "options": [
    {"text": "Option 1", "weight": {"science": 3, "commerce": 1, "arts": 0, "vocational": 2}},
    {"text": "Option 2", "weight": {"science": 1, "commerce": 3, "arts": 2, "vocational": 0}},
    {"text": "Option 3", "weight": {"science": 0, "commerce": 2, "arts": 3, "vocational": 1}},
    {"text": "Option 4", "weight": {"science": 2, "commerce": 0, "arts": 1, "vocational": 3}}
  ],
  "category": "interests|strengths|preferences|location|financial|goals"
}
`;

    try {
      const result = await this.model.generateContent(context);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error generating question:', error);
      return this.getFallbackQuestion(currentQuestionIndex, language);
    }
  }

  async generateCareerRecommendations(
    answers: Array<{ question: string; answer: string; weights: any }>,
    language: 'en' | 'hi' = 'en'
  ) {
    const context = `
Based on the following quiz responses, provide comprehensive career recommendations for an Indian student:

Answers: ${JSON.stringify(answers)}

Provide detailed analysis in ${language === 'hi' ? 'Hindi' : 'English'} including:
1. Recommended stream (Science/Commerce/Arts/Vocational)
2. Specific career paths
3. Suitable degree programs
4. Top colleges/universities
5. Skills to develop
6. Industry outlook
7. Salary expectations
8. Alternative paths

Return response in this JSON format:
{
  "primaryStream": "Science|Commerce|Arts|Vocational",
  "confidence": 85,
  "careerPaths": ["Career 1", "Career 2", "Career 3"],
  "degreePrograms": ["Degree 1", "Degree 2"],
  "topColleges": ["College 1", "College 2"],
  "skillsTodevelop": ["Skill 1", "Skill 2"],
  "industryOutlook": "Detailed outlook",
  "salaryRange": "Expected salary range",
  "alternativePaths": ["Alt path 1", "Alt path 2"],
  "detailedAnalysis": "Comprehensive analysis paragraph"
}
`;

    try {
      const result = await this.model.generateContent(context);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return this.getFallbackRecommendations(language);
    }
  }

  private getFallbackQuestion(index: number, language: 'en' | 'hi') {
    const fallbackQuestions = {
      en: [
        {
          question: "What type of activities do you enjoy most?",
          options: [
            {"text": "Solving mathematical problems and puzzles", "weight": {"science": 3, "commerce": 2, "arts": 0, "vocational": 1}},
            {"text": "Reading and writing stories or articles", "weight": {"science": 0, "commerce": 1, "arts": 3, "vocational": 2}},
            {"text": "Working with numbers and business concepts", "weight": {"science": 1, "commerce": 3, "arts": 1, "vocational": 1}},
            {"text": "Creating things with your hands", "weight": {"science": 1, "commerce": 0, "arts": 2, "vocational": 3}}
          ],
          category: "interests"
        }
      ],
      hi: [
        {
          question: "आप किस प्रकार की गतिविधियों में सबसे अधिक आनंद लेते हैं?",
          options: [
            {"text": "गणितीय समस्याओं और पहेलियों को हल करना", "weight": {"science": 3, "commerce": 2, "arts": 0, "vocational": 1}},
            {"text": "कहानियां या लेख पढ़ना और लिखना", "weight": {"science": 0, "commerce": 1, "arts": 3, "vocational": 2}},
            {"text": "संख्याओं और व्यावसायिक अवधारणाओं के साथ काम करना", "weight": {"science": 1, "commerce": 3, "arts": 1, "vocational": 1}},
            {"text": "अपने हाथों से चीजें बनाना", "weight": {"science": 1, "commerce": 0, "arts": 2, "vocational": 3}}
          ],
          category: "interests"
        }
      ]
    };

    return fallbackQuestions[language][0];
  }

  private getFallbackRecommendations(language: 'en' | 'hi') {
    return {
      primaryStream: "Science",
      confidence: 75,
      careerPaths: language === 'hi' ? ["इंजीनियर", "डॉक्टर", "वैज्ञानिक"] : ["Engineer", "Doctor", "Scientist"],
      degreePrograms: language === 'hi' ? ["बी.टेक", "एमबीबीएस", "बी.एससी"] : ["B.Tech", "MBBS", "B.Sc"],
      topColleges: ["IIT Delhi", "AIIMS", "Delhi University"],
      skillsTodevelop: language === 'hi' ? ["गणित", "विज्ञान", "समस्या समाधान"] : ["Mathematics", "Science", "Problem Solving"],
      industryOutlook: language === 'hi' ? "विज्ञान क्षेत्र में उज्ज्वल भविष्य" : "Bright future in science field",
      salaryRange: "₹3-15 LPA",
      alternativePaths: language === 'hi' ? ["अनुसंधान", "शिक्षण"] : ["Research", "Teaching"],
      detailedAnalysis: language === 'hi' ? "आपकी रुचियों के आधार पर विज्ञान क्षेत्र सबसे उपयुक्त है।" : "Based on your interests, science field is most suitable."
    };
  }
}

export const geminiService = new GeminiService();