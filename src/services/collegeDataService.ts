import { GoogleGenerativeAI } from '@google/generative-ai';
import { College } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export class CollegeDataService {
  private model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  async generateDelhiCollegesData(): Promise<College[]> {
    const prompt = `
Generate comprehensive data for ALL government colleges in Delhi, India. Include:
- Delhi University colleges (all 77+ colleges)
- Jawaharlal Nehru University
- Jamia Millia Islamia
- Indraprastha University colleges
- Technical colleges (DTU, NSUT, IIIT Delhi)
- Medical colleges (AIIMS, MAMC, LHMC, etc.)
- All other government institutions

For each college provide:
- Exact name
- Type (Central University/State University/Deemed University)
- Location (area, coordinates)
- Courses offered with fees
- Facilities
- Establishment year
- Website
- Cut-off percentages

Return as JSON array with this structure:
[
  {
    "id": "unique_id",
    "name": "College Name",
    "type": "Government",
    "location": {
      "city": "Delhi",
      "state": "Delhi",
      "area": "Specific area",
      "coordinates": [lat, lng]
    },
    "courses": [
      {
        "id": "course_id",
        "name": "Course Name",
        "stream": "Science/Commerce/Arts",
        "duration": "3 years",
        "eligibility": "Requirements",
        "fees": 15000
      }
    ],
    "facilities": ["Library", "Labs", "Hostel"],
    "cutoffs": {"Course Name": 85},
    "established": 1922,
    "website": "www.college.edu"
  }
]

Generate data for at least 50+ colleges with accurate information.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error generating college data:', error);
      return this.getFallbackCollegeData();
    }
  }

  private getFallbackCollegeData(): College[] {
    return [
      {
        id: 'du-stephens',
        name: "St. Stephen's College, Delhi University",
        type: 'Government',
        location: {
          city: 'Delhi',
          state: 'Delhi',
          coordinates: [28.6139, 77.2090]
        },
        courses: [
          { id: '1', name: 'B.A. Economics', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 12000 },
          { id: '2', name: 'B.Sc. Physics', stream: 'Science', duration: '3 years', eligibility: '12th with PCM', fees: 15000 }
        ],
        facilities: ['Library', 'Laboratories', 'Sports Complex', 'Hostel'],
        cutoffs: { 'B.A. Economics': 98, 'B.Sc. Physics': 96 },
        established: 1881,
        website: 'www.ststephens.edu'
      }
      // Add more fallback colleges...
    ];
  }
}

export const collegeDataService = new CollegeDataService();