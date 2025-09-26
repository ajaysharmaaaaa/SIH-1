import { College } from '../types';

// Comprehensive Delhi colleges data - this would be populated from Supabase
export const delhiColleges: College[] = [
  // Delhi University Colleges
  {
    id: 'du-stephens',
    name: "St. Stephen's College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6139, 77.2090]
    },
    courses: [
      { id: '1', name: 'B.A. Economics', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 12000 },
      { id: '2', name: 'B.Sc. Physics', stream: 'Science', duration: '3 years', eligibility: '12th with PCM', fees: 15000 },
      { id: '3', name: 'B.Sc. Chemistry', stream: 'Science', duration: '3 years', eligibility: '12th with PCM', fees: 15000 }
    ],
    facilities: ['Library', 'Laboratories', 'Sports Complex', 'Hostel', 'Chapel'],
    cutoffs: { 'B.A. Economics': 98.75, 'B.Sc. Physics': 97.5, 'B.Sc. Chemistry': 96.25 },
    established: 1881,
    website: 'www.ststephens.edu'
  },
  {
    id: 'du-hindu',
    name: "Hindu College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6952, 77.2136]
    },
    courses: [
      { id: '4', name: 'B.A. History', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 10000 },
      { id: '5', name: 'B.Sc. Mathematics', stream: 'Science', duration: '3 years', eligibility: '12th with PCM', fees: 12000 },
      { id: '6', name: 'B.Com', stream: 'Commerce', duration: '3 years', eligibility: '12th with Commerce/Maths', fees: 11000 }
    ],
    facilities: ['Central Library', 'Computer Labs', 'Auditorium', 'Sports Ground', 'Canteen'],
    cutoffs: { 'B.A. History': 96.5, 'B.Sc. Mathematics': 98.0, 'B.Com': 97.75 },
    established: 1899,
    website: 'www.hinducollege.ac.in'
  },
  {
    id: 'du-lsr',
    name: "Lady Shri Ram College for Women",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6313, 77.2294]
    },
    courses: [
      { id: '7', name: 'B.Com Honours', stream: 'Commerce', duration: '3 years', eligibility: '12th with Commerce/Maths', fees: 14000 },
      { id: '8', name: 'B.A. Psychology', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 13000 },
      { id: '9', name: 'B.A. English', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 12000 }
    ],
    facilities: ['Modern Library', 'Computer Labs', 'Auditorium', 'Sports Facilities', 'Career Counseling'],
    cutoffs: { 'B.Com Honours': 98.5, 'B.A. Psychology': 97.25, 'B.A. English': 96.75 },
    established: 1956,
    website: 'www.lsr.edu.in'
  },
  {
    id: 'du-hansraj',
    name: "Hansraj College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6862, 77.2090]
    },
    courses: [
      { id: '10', name: 'B.Sc. Computer Science', stream: 'Science', duration: '3 years', eligibility: '12th with PCM', fees: 16000 },
      { id: '11', name: 'B.A. Political Science', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 10000 },
      { id: '12', name: 'B.Com', stream: 'Commerce', duration: '3 years', eligibility: '12th with Commerce/Maths', fees: 11000 }
    ],
    facilities: ['Library', 'IT Labs', 'Science Labs', 'Gymnasium', 'Cafeteria'],
    cutoffs: { 'B.Sc. Computer Science': 98.25, 'B.A. Political Science': 95.5, 'B.Com': 97.0 },
    established: 1948,
    website: 'www.hansrajcollege.ac.in'
  },
  {
    id: 'du-ramjas',
    name: "Ramjas College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6862, 77.2090]
    },
    courses: [
      { id: '13', name: 'B.A. Sociology', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 9000 },
      { id: '14', name: 'B.Sc. Botany', stream: 'Science', duration: '3 years', eligibility: '12th with PCB', fees: 12000 },
      { id: '15', name: 'B.A. Hindi', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 8000 }
    ],
    facilities: ['Library', 'Botanical Garden', 'Language Lab', 'Sports Complex'],
    cutoffs: { 'B.A. Sociology': 94.0, 'B.Sc. Botany': 93.5, 'B.A. Hindi': 88.0 },
    established: 1917,
    website: 'www.ramjas.du.ac.in'
  },
  {
    id: 'du-kirori',
    name: "Kirori Mal College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6862, 77.2090]
    },
    courses: [
      { id: '16', name: 'B.Sc. Electronics', stream: 'Science', duration: '3 years', eligibility: '12th with PCM', fees: 14000 },
      { id: '17', name: 'B.A. Geography', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 9500 },
      { id: '18', name: 'B.A. Philosophy', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 9000 }
    ],
    facilities: ['Library', 'Electronics Lab', 'Geography Lab', 'Computer Center'],
    cutoffs: { 'B.Sc. Electronics': 95.0, 'B.A. Geography': 92.0, 'B.A. Philosophy': 90.0 },
    established: 1954,
    website: 'www.kmc.du.ac.in'
  },
  {
    id: 'du-miranda',
    name: "Miranda House",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6862, 77.2090]
    },
    courses: [
      { id: '19', name: 'B.Sc. Life Sciences', stream: 'Science', duration: '3 years', eligibility: '12th with PCB', fees: 13000 },
      { id: '20', name: 'B.A. Music', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 11000 },
      { id: '21', name: 'B.A. Sanskrit', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 8500 }
    ],
    facilities: ['Library', 'Music Room', 'Science Labs', 'Hostel', 'Cultural Center'],
    cutoffs: { 'B.Sc. Life Sciences': 96.5, 'B.A. Music': 85.0, 'B.A. Sanskrit': 75.0 },
    established: 1948,
    website: 'www.mirandahouse.ac.in'
  },
  // Technical Colleges
  {
    id: 'dtu',
    name: "Delhi Technological University",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.7503, 77.1175]
    },
    courses: [
      { id: '22', name: 'B.Tech Computer Engineering', stream: 'Science', duration: '4 years', eligibility: '12th with PCM + JEE Main', fees: 150000 },
      { id: '23', name: 'B.Tech Mechanical Engineering', stream: 'Science', duration: '4 years', eligibility: '12th with PCM + JEE Main', fees: 150000 },
      { id: '24', name: 'B.Tech Electronics & Communication', stream: 'Science', duration: '4 years', eligibility: '12th with PCM + JEE Main', fees: 150000 }
    ],
    facilities: ['Central Library', 'Advanced Labs', 'Workshop', 'Hostel', 'Placement Cell'],
    cutoffs: { 'B.Tech Computer Engineering': 97.5, 'B.Tech Mechanical Engineering': 95.0, 'B.Tech Electronics & Communication': 96.0 },
    established: 1941,
    website: 'www.dtu.ac.in'
  },
  {
    id: 'nsut',
    name: "Netaji Subhas University of Technology",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6139, 77.2090]
    },
    courses: [
      { id: '25', name: 'B.Tech Information Technology', stream: 'Science', duration: '4 years', eligibility: '12th with PCM + JEE Main', fees: 140000 },
      { id: '26', name: 'B.Tech Civil Engineering', stream: 'Science', duration: '4 years', eligibility: '12th with PCM + JEE Main', fees: 140000 },
      { id: '27', name: 'B.Tech Chemical Engineering', stream: 'Science', duration: '4 years', eligibility: '12th with PCM + JEE Main', fees: 140000 }
    ],
    facilities: ['Library', 'Engineering Labs', 'Computer Center', 'Sports Complex'],
    cutoffs: { 'B.Tech Information Technology': 96.0, 'B.Tech Civil Engineering': 93.0, 'B.Tech Chemical Engineering': 94.0 },
    established: 1983,
    website: 'www.nsut.ac.in'
  },
  {
    id: 'iiitd',
    name: "Indraprastha Institute of Information Technology Delhi",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.5450, 77.2732]
    },
    courses: [
      { id: '28', name: 'B.Tech Computer Science & Engineering', stream: 'Science', duration: '4 years', eligibility: '12th with PCM + JEE Main', fees: 200000 },
      { id: '29', name: 'B.Tech Electronics & Communications Engineering', stream: 'Science', duration: '4 years', eligibility: '12th with PCM + JEE Main', fees: 200000 }
    ],
    facilities: ['State-of-art Labs', 'Library', 'Research Centers', 'Hostel', 'Innovation Hub'],
    cutoffs: { 'B.Tech Computer Science & Engineering': 98.0, 'B.Tech Electronics & Communications Engineering': 96.5 },
    established: 2008,
    website: 'www.iiitd.ac.in'
  },
  // Medical Colleges
  {
    id: 'aiims',
    name: "All India Institute of Medical Sciences",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.5672, 77.2100]
    },
    courses: [
      { id: '30', name: 'MBBS', stream: 'Science', duration: '5.5 years', eligibility: '12th with PCB + NEET', fees: 5000 },
      { id: '31', name: 'B.Sc Nursing', stream: 'Science', duration: '4 years', eligibility: '12th with PCB + AIIMS Nursing Entrance', fees: 8000 }
    ],
    facilities: ['Hospital', 'Medical Library', 'Research Labs', 'Hostel', 'Sports Complex'],
    cutoffs: { 'MBBS': 99.9, 'B.Sc Nursing': 95.0 },
    established: 1956,
    website: 'www.aiims.edu'
  },
  {
    id: 'mamc',
    name: "Maulana Azad Medical College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6139, 77.2090]
    },
    courses: [
      { id: '32', name: 'MBBS', stream: 'Science', duration: '5.5 years', eligibility: '12th with PCB + NEET', fees: 4000 }
    ],
    facilities: ['Attached Hospital', 'Medical Library', 'Anatomy Museum', 'Hostel'],
    cutoffs: { 'MBBS': 99.5 },
    established: 1958,
    website: 'www.mamc.ac.in'
  },
  {
    id: 'lhmc',
    name: "Lady Hardinge Medical College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6139, 77.2090]
    },
    courses: [
      { id: '33', name: 'MBBS', stream: 'Science', duration: '5.5 years', eligibility: '12th with PCB + NEET', fees: 4500 }
    ],
    facilities: ['Hospital', 'Medical Library', 'Labs', 'Hostel'],
    cutoffs: { 'MBBS': 99.3 },
    established: 1916,
    website: 'www.lhmc-delhi.nic.in'
  },
  // JNU
  {
    id: 'jnu',
    name: "Jawaharlal Nehru University",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.5467, 77.1708]
    },
    courses: [
      { id: '34', name: 'B.A. Foreign Languages', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream + JNU Entrance', fees: 300 },
      { id: '35', name: 'B.Sc. Life Sciences', stream: 'Science', duration: '3 years', eligibility: '12th with PCB + JNU Entrance', fees: 500 }
    ],
    facilities: ['Central Library', 'Language Labs', 'Research Centers', 'Hostel', 'Cultural Centers'],
    cutoffs: { 'B.A. Foreign Languages': 85.0, 'B.Sc. Life Sciences': 88.0 },
    established: 1969,
    website: 'www.jnu.ac.in'
  },
  // Jamia Millia Islamia
  {
    id: 'jamia',
    name: "Jamia Millia Islamia",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.5615, 77.2800]
    },
    courses: [
      { id: '36', name: 'B.A. Mass Communication', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream + Jamia Entrance', fees: 8000 },
      { id: '37', name: 'B.Tech Civil Engineering', stream: 'Science', duration: '4 years', eligibility: '12th with PCM + JEE Main', fees: 120000 },
      { id: '38', name: 'B.Com', stream: 'Commerce', duration: '3 years', eligibility: '12th with Commerce + Jamia Entrance', fees: 6000 }
    ],
    facilities: ['Library', 'Media Center', 'Engineering Labs', 'Sports Complex', 'Mosque'],
    cutoffs: { 'B.A. Mass Communication': 92.0, 'B.Tech Civil Engineering': 90.0, 'B.Com': 88.0 },
    established: 1920,
    website: 'www.jmi.ac.in'
  },
  // More DU Colleges
  {
    id: 'du-shri-ram',
    name: "Shri Ram College of Commerce",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6862, 77.2090]
    },
    courses: [
      { id: '39', name: 'B.Com Honours', stream: 'Commerce', duration: '3 years', eligibility: '12th with Commerce/Maths', fees: 15000 },
      { id: '40', name: 'B.A. Economics', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 13000 }
    ],
    facilities: ['Library', 'Computer Labs', 'Auditorium', 'Placement Cell', 'Sports Ground'],
    cutoffs: { 'B.Com Honours': 99.0, 'B.A. Economics': 98.25 },
    established: 1926,
    website: 'www.srcc.edu'
  },
  {
    id: 'du-jesus-mary',
    name: "Jesus and Mary College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6139, 77.2090]
    },
    courses: [
      { id: '41', name: 'B.Sc. Mathematics', stream: 'Science', duration: '3 years', eligibility: '12th with PCM', fees: 12000 },
      { id: '42', name: 'B.A. English', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 10000 },
      { id: '43', name: 'B.Com', stream: 'Commerce', duration: '3 years', eligibility: '12th with Commerce/Maths', fees: 11000 }
    ],
    facilities: ['Library', 'Computer Center', 'Chapel', 'Sports Facilities', 'Canteen'],
    cutoffs: { 'B.Sc. Mathematics': 96.0, 'B.A. English': 94.5, 'B.Com': 95.5 },
    established: 1968,
    website: 'www.jmc.ac.in'
  },
  {
    id: 'du-gargi',
    name: "Gargi College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.5245, 77.2066]
    },
    courses: [
      { id: '44', name: 'B.Sc. Chemistry', stream: 'Science', duration: '3 years', eligibility: '12th with PCM', fees: 11000 },
      { id: '45', name: 'B.A. History', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 9000 },
      { id: '46', name: 'B.Com', stream: 'Commerce', duration: '3 years', eligibility: '12th with Commerce/Maths', fees: 10000 }
    ],
    facilities: ['Library', 'Science Labs', 'Computer Lab', 'Auditorium', 'Sports Ground'],
    cutoffs: { 'B.Sc. Chemistry': 94.0, 'B.A. History': 91.0, 'B.Com': 93.0 },
    established: 1967,
    website: 'www.gargicollege.in'
  },
  {
    id: 'du-zakir-husain',
    name: "Zakir Husain Delhi College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6139, 77.2090]
    },
    courses: [
      { id: '47', name: 'B.A. Urdu', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 7000 },
      { id: '48', name: 'B.A. Persian', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 7000 },
      { id: '49', name: 'B.Com', stream: 'Commerce', duration: '3 years', eligibility: '12th with Commerce/Maths', fees: 9000 }
    ],
    facilities: ['Library', 'Language Labs', 'Computer Center', 'Mosque'],
    cutoffs: { 'B.A. Urdu': 75.0, 'B.A. Persian': 70.0, 'B.Com': 85.0 },
    established: 1924,
    website: 'www.zhdc.ac.in'
  },
  {
    id: 'du-dyal-singh',
    name: "Dyal Singh College",
    type: 'Government',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      coordinates: [28.6139, 77.2090]
    },
    courses: [
      { id: '50', name: 'B.Sc. Physics', stream: 'Science', duration: '3 years', eligibility: '12th with PCM', fees: 11000 },
      { id: '51', name: 'B.A. Political Science', stream: 'Arts', duration: '3 years', eligibility: '12th with any stream', fees: 8500 },
      { id: '52', name: 'B.Com', stream: 'Commerce', duration: '3 years', eligibility: '12th with Commerce/Maths', fees: 9500 }
    ],
    facilities: ['Library', 'Physics Lab', 'Computer Center', 'Sports Ground'],
    cutoffs: { 'B.Sc. Physics': 92.0, 'B.A. Political Science': 88.0, 'B.Com': 90.0 },
    established: 1910,
    website: 'www.dyalsingh.ac.in'
  }
];