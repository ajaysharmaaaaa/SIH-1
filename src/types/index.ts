export interface User {
  id: string;
  name: string;
  email: string;
  class: '10' | '12';
  interests: string[];
  quizResults?: QuizResult;
  savedColleges: string[];
}

export interface QuizResult {
  stream: 'Science' | 'Commerce' | 'Arts' | 'Vocational';
  score: number;
  strengths: string[];
  recommendations: string[];
  completedAt: Date;
}

export interface College {
  id: string;
  name: string;
  type: 'Government' | 'Private';
  location: {
    city: string;
    state: string;
    coordinates: [number, number];
  };
  courses: Course[];
  facilities: string[];
  cutoffs: Record<string, number>;
  established: number;
  website: string;
}

export interface Course {
  id: string;
  name: string;
  stream: string;
  duration: string;
  eligibility: string;
  fees: number;
}

export interface Timeline {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'admission' | 'exam' | 'scholarship' | 'counseling';
  important: boolean;
}