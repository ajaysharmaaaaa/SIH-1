import { College, Timeline } from '../types';
import { delhiColleges } from './delhiColleges';

// Use comprehensive Delhi colleges data
export const mockColleges: College[] = delhiColleges;

export const mockTimeline: Timeline[] = [
  {
    id: '1',
    title: 'JEE Main Registration',
    description: 'Registration opens for JEE Main 2024. Apply early to secure your preferred exam centers.',
    date: new Date('2024-02-15'),
    type: 'exam',
    important: true
  },
  {
    id: '2',
    title: 'CBSE Class 12 Results',
    description: 'CBSE announces Class 12 board examination results. Check your results online.',
    date: new Date('2024-05-20'),
    type: 'exam',
    important: true
  },
  {
    id: '3',
    title: 'DU Admission Process Begins',
    description: 'Delhi University starts the Common University Entrance Test (CUET) based admissions.',
    date: new Date('2024-06-01'),
    type: 'admission',
    important: true
  },
  {
    id: '4',
    title: 'National Scholarship Portal',
    description: 'Application deadline for Pre-Matric and Post-Matric scholarships for SC/ST/OBC students.',
    date: new Date('2024-07-30'),
    type: 'scholarship',
    important: false
  },
  {
    id: '5',
    title: 'Counseling for Engineering Colleges',
    description: 'Joint Seat Allocation Authority (JoSAA) counseling begins for IITs, NITs, and other centrally funded technical institutions.',
    date: new Date('2024-06-15'),
    type: 'counseling',
    important: true
  },
  {
    id: '6',
    title: 'NEET Result Declaration',
    description: 'National Testing Agency declares NEET-UG results for medical college admissions.',
    date: new Date('2024-06-10'),
    type: 'exam',
    important: true
  }
];