import type {
  AboutFact,
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  NavLink,
  Project,
  SkillCategory,
  SocialLink,
  StatEntry,
} from '../types/portfolio'

export const personal = {
  name: 'Yasiru Lansakara',
  fullName: 'Yasiru Chamith Lansakara',
  title: 'Computer Science & AI Undergraduate',
  tagline:
    'I build intelligent software at the intersection of AI, machine learning, and clean engineering — turning data and ideas into practical, real-world applications.',
  roles: ['AI & Machine Learning', 'Software Development', 'Computer Vision', 'NLP & Speech AI', 'Python'],
  email: 'yasiruchamithlansakara@gmail.com',
  location: 'Sri Lanka',
  // Drives the live local-time readout in the footer.
  timeZone: 'Asia/Colombo',
  // No CV is currently published — the old one was outdated. Set this once an updated CV PDF
  // is added at public/cv/Yasiru_Lansakara_CV.pdf, and the Download CV button will reappear.
  cvPath: undefined as string | undefined,
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/YasiruChamithLansakara', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yasiru-chamith-lansakara', icon: 'linkedin' },
  { label: 'Email', url: `mailto:${personal.email}`, icon: 'email' },
]

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

// Kept short on purpose — degree, internship and project details live in their own sections.
export const about: { lead: string; paragraphs: string[]; facts: AboutFact[] } = {
  lead: 'I build AI-driven software — taking raw data and ideas all the way to applications people can actually use.',
  paragraphs: [
    "My work centers on machine learning, computer vision and speech AI. I've built models for health-related predictions, analyzed satellite imagery to track urbanization and deforestation across Sri Lanka, and shipped full-stack web apps along the way.",
    "I'm comfortable across the whole pipeline — data preprocessing, model development and experimentation, testing, and the interface on top. I'm always keen to pick up new tools and to work on problems that bring practical value to people.",
  ],
  facts: [
    { label: 'Based in', value: personal.location },
    {
      label: 'Studying',
      value: 'BSc (Hons) Computer Science with AI',
      detail: 'Coventry University, UK',
    },
    { label: 'Recently', value: 'AI/ML Intern', detail: 'SLT Digital Platforms · 6 months' },
    { label: 'Focus', value: 'Machine Learning · Computer Vision · Speech AI & NLP' },
  ],
}

// Tools go in `skills` (shown as chips); techniques go in `methods` (a quieter line beneath).
// Everything here should be backed by a project, the internship, or coursework.
export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C/C++', 'PHP'],
  },
  {
    title: 'Machine Learning',
    skills: ['Scikit-learn', 'TensorFlow', 'XGBoost'],
    methods: [
      'Logistic Regression',
      'Random Forest',
      'SVM',
      'Naive Bayes',
      'CNNs',
      'LSTMs',
      'Feature Engineering',
      'Model Evaluation',
    ],
  },
  {
    title: 'Computer Vision & Geospatial',
    skills: ['OpenCV', 'Tesseract', 'EasyOCR', 'GeoPandas', 'Rasterio'],
    methods: [
      'OCR',
      'K-Means Image Segmentation',
      'Satellite Imagery Analysis (Landsat)',
      'Spectral Indices (NDVI, NDBI)',
      'Remote Sensing',
    ],
  },
  {
    title: 'Speech & Language AI',
    skills: ['FAISS', 'Gemini API'],
    methods: [
      'Speech-to-Text',
      'Audio Processing',
      'MFCC Features',
      'Speech Emotion Classification',
      'NLP',
      'Vector Search',
      'Chatbot Development',
    ],
  },
  {
    title: 'Data & Forecasting',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Statsmodels', 'Prophet', 'Jupyter Notebook'],
    methods: ['Data Preprocessing', 'Exploratory Data Analysis', 'Time-Series Forecasting (ARIMA, SARIMA)'],
  },
  {
    title: 'Web Development',
    skills: ['React', 'Vite', 'React Router', 'Axios', 'Node.js', 'Express.js', 'FastAPI', 'Flask', 'HTML5', 'CSS3'],
    methods: ['REST APIs', 'JWT Authentication'],
  },
  {
    title: 'Databases & Cloud',
    skills: ['MySQL', 'MongoDB', 'Mongoose', 'Firebase', 'AWS'],
  },
  {
    title: 'Tools & Practices',
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Arduino'],
    methods: ['Testing & Debugging', 'Technical Documentation', 'Agile'],
  },
]

export const projects: Project[] = [
  {
    id: 'mediassist-bot',
    title: 'MediAssist Bot — AI Medical Assistant',
    description:
      'Academic proof-of-concept that reads handwritten or printed prescriptions via OCR (Tesseract, EasyOCR), extracts medicine names and dosages with NLP, and retrieves grounded drug information through FAISS vector search. Built with mandatory safety disclaimers and emergency-query detection, scoped to six common chronic conditions. One of two independent builds exploring this concept with different stacks.',
    categories: ['AI & ML'],
    tech: ['Python', 'FastAPI', 'React', 'FAISS', 'OCR', 'NLP'],
    status: 'Completed',
    featured: true,
    githubUrl: 'https://github.com/YasiruChamithLansakara/MediAssist-Bot',
    visualLabel: 'AI Assistant',
  },
  {
    id: 'urbanization-kurunegala',
    title: 'Urbanization Analysis — Kurunegala District',
    description:
      'Satellite-based urban growth analysis for Kurunegala District using Landsat 8/9 imagery (2013–2025). Computed NDVI, NDBI, UI and MNDWI spectral indices to classify urban areas, mapped potential growth zones, and compared six forecasting approaches (Prophet, ARIMA, Random Forest, XGBoost, LSTM, K-Means) to project growth through 2030.',
    categories: ['Computer Vision', 'Data & Remote Sensing'],
    tech: ['Python', 'OpenCV', 'GeoPandas', 'Rasterio', 'Scikit-learn', 'TensorFlow'],
    status: 'Completed',
    featured: true,
    githubUrl: 'https://github.com/YasiruChamithLansakara/Urbanization_Kurunegala',
    visualLabel: 'Satellite Imagery',
  },
  {
    id: 'voice-emotion-classification',
    title: 'Voice Emotion Classification',
    description:
      'Binary speech-emotion classifier distinguishing angry from calm/neutral speech using MFCC audio features and a convolutional neural network trained on the RAVDESS dataset — related to internship research on calm-versus-aggressive voice classification.',
    categories: ['AI & ML'],
    tech: ['Python', 'TensorFlow', 'MFCC / Audio Features', 'CNN'],
    status: 'Completed',
    githubUrl: 'https://github.com/YasiruChamithLansakara/Voice-Emotion-Classification',
    visualLabel: 'Audio Classification',
  },
  {
    id: 'bus-seat-booking',
    title: 'Bus Seat Booking Application',
    description:
      'Full-stack MERN reservation system where passengers search trips by route and date, view live seat availability, and book seats, while admins manage schedules and bookings through a JWT-protected dashboard.',
    categories: ['Web Development'],
    tech: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    status: 'Completed',
    featured: true,
    githubUrl: 'https://github.com/YasiruChamithLansakara/Bus-Seat-Booking-Application',
    visualLabel: 'Full-Stack App',
  },
  {
    id: 'neurixa',
    title: 'Neurixa — Medical Assistant Platform',
    description:
      'Full-stack medical assistant pairing a React/Vite frontend with a Flask backend powered by Google Gemini for conversational guidance and prescription image analysis, with informational-only safety disclaimers built into every response. A second, independent exploration of the same concept with a different stack.',
    categories: ['AI & ML', 'Web Development'],
    tech: ['React', 'Vite', 'Flask', 'Python', 'Gemini API'],
    status: 'Completed',
    githubUrl: 'https://github.com/YasiruChamithLansakara/Neurixa',
    visualLabel: 'AI Assistant',
  },
  {
    id: 'heart-disease-prediction',
    title: 'Heart Disease Prediction',
    description:
      'Classification models trained on the UCI heart disease dataset (~920 patient records, 14 clinical features) to predict disease risk. Compared Logistic Regression, Random Forest, SVM, XGBoost and Naive Bayes, evaluated with ROC AUC and full classification reports — Logistic Regression reached the highest accuracy (76.6%) and Naive Bayes the strongest ROC AUC (0.85).',
    categories: ['AI & ML'],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    status: 'Completed',
    featured: true,
    githubUrl: 'https://github.com/YasiruChamithLansakara/HeartDiseasePrediction---ML-model',
    visualLabel: 'ML Classification',
  },
  {
    id: 'strawberry-segmentation',
    title: 'Strawberry Segmentation (K-Means Clustering)',
    description:
      'Image segmentation pipeline applying K-Means clustering in Lab color space to isolate strawberry, leaf and background regions. Includes a multi-K comparison (K = 2–5), per-cluster mask visualization, and a documented analysis report.',
    categories: ['Computer Vision'],
    tech: ['Python', 'OpenCV', 'NumPy', 'Matplotlib'],
    status: 'Completed',
    githubUrl: 'https://github.com/YasiruChamithLansakara/Fruits-Segmentation-KMeans',
    visualLabel: 'Image Segmentation',
  },
  {
    id: 'deforestation-matale',
    title: 'Deforestation Analysis — Matale District',
    description:
      'Environmental monitoring system analyzing deforestation in Matale District using Landsat imagery (2013–2025) and over 150GB of processed satellite data. Combined NDVI/NDBI indices with cloud-masked quality control, spatial risk mapping, and multi-model forecasting (Prophet, ARIMA, SARIMA, XGBoost, Random Forest) to project forest loss trends through 2030.',
    categories: ['Computer Vision', 'Data & Remote Sensing'],
    tech: ['Python', 'OpenCV', 'GeoPandas', 'Scikit-learn', 'Statsmodels'],
    status: 'Completed',
    featured: true,
    githubUrl: 'https://github.com/YasiruChamithLansakara/Deforestation_Matale',
    visualLabel: 'Geospatial Analysis',
  },
]

export const experience: ExperienceEntry[] = [
  {
    role: 'AI/ML Intern',
    organization: 'SLT — Digital Platforms Development Section',
    period: '17 March 2026 – 17 September 2026',
    logo: { src: 'images/experience/slt-logo.svg', alt: 'SLT logo' },
    bullets: [
      'Contributed to speech-to-text development and testing for voice-based applications.',
      'Researched and helped implement voice-based mood classification, distinguishing calm from aggressive speech patterns.',
      'Contributed to an AI chatbot project, including testing and debugging.',
      'Took part in documentation, testing, and project handover processes.',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    qualification: 'BSc (Hons) in Computer Science with Artificial Intelligence',
    institution: 'Coventry University, UK',
    period: '2026 – 2027',
    status: 'In Progress',
    modules: [
      'Machine Learning',
      'Artificial Neural Networks',
      'Intelligent Agent',
      'Security',
      'Individual Project',
      'Individual Project Preparation',
    ],
  },
  {
    qualification: 'Higher National Diploma in Computer Science with Artificial Intelligence',
    institution: 'National Institute of Business Management (NIBM)',
    period: '2025 – 2026',
    status: 'Completed',
    modules: [
      'Machine Learning for Artificial Intelligence',
      'Computer Vision',
      'Image Processing',
      'Natural Language Processing',
      'Data Structures and Algorithms',
      'Cloud Computing',
      'Data Modeling and NoSQL Database',
      'Robotics',
      'Internet of Things (IoT)',
      'Embedded Systems',
      'Numerical Mathematics and Computing',
      'AI Project',
      'Industrial Training',
      'CREST',
      'Effective Communication Skills II',
    ],
  },
  {
    qualification: 'Diploma in Computer Science with Artificial Intelligence',
    institution: 'National Institute of Business Management (NIBM)',
    period: '2024 – 2025',
    status: 'Completed',
    detail: 'GPA 3.98 / 4.0',
    modules: [
      'Introduction to Artificial Intelligence',
      'Object Oriented Programming with Java',
      'Software Engineering Fundamentals',
      'Relational Database Management Systems',
      'Web Application Development',
      'Probability and Statistics',
      'Data Communications and Computer Networks',
      'Computer Programming',
      'Mathematics for Computer Science',
      'Introduction to Computer Systems',
      'Project Management for Computer Science',
      'Social, Ethical and Professional Issues in Computing',
      'Effective Communication Skills I',
    ],
  },
  {
    qualification: 'G.C.E. Advanced Level — Physical Science',
    institution: 'Wayamba Royal College, Kurunegala',
    period: '2022',
    status: 'Completed',
    school: true,
    modules: ['Physics', 'Chemistry', 'Combined Mathematics', 'General Information Technology', 'General English'],
  },
  {
    qualification: 'G.C.E. Ordinary Level',
    institution: 'Wayamba Royal College, Kurunegala',
    period: '2019',
    status: 'Completed',
    school: true,
    modules: [
      'Mathematics',
      'Science',
      'English Language',
      'Sinhala Language & Literature',
      'History',
      'Geography',
      'Buddhism',
      'Drama & Theatre',
      'Health & Physical Education',
    ],
  },
]

export const certifications: CertificationEntry[] = [
  {
    name: 'Future AWS AI Programmer (Nanodegree)',
    issuer: 'Udacity',
    date: '8 October 2026',
    credentialUrl: 'https://www.udacity.com/certificate/e/cccf2ab2-900d-11f1-8f2f-bf01a55aa7d7',
    imagePath: 'images/certifications/future-aws-ai-programmer.webp',
    imageSize: { width: 1000, height: 773 },
  },
  {
    name: 'AWS AI Practitioner Challenge',
    issuer: 'Udacity',
    date: '7 May 2026',
    credentialUrl: 'https://www.udacity.com/certificate/e/739c9b82-2d6b-11f1-afe9-739b7e14f48d',
    imagePath: 'images/certifications/aws-ai-practitioner-challenge.webp',
    imageSize: { width: 1000, height: 773 },
  },
  {
    name: 'Cloud 102: AI & Machine Learning Using AWS Services',
    issuer: 'AWS Cloud Club, NIBM',
    date: '28 March 2026',
    imagePath: 'images/certifications/cloud-102-aws.webp',
    imageSize: { width: 1000, height: 707 },
  },
  {
    name: 'Critical Thinking in the AI Era',
    issuer: 'HP LIFE (HP Foundation)',
    date: '22 March 2026',
    credentialId: '4fe96200-4eca-4db5-ad47-68a4275599e0',
    imagePath: 'images/certifications/critical-thinking-ai-era.webp',
    imageSize: { width: 1000, height: 707 },
  },
  {
    name: 'Python for Beginners',
    issuer: 'University of Moratuwa (CODL)',
    date: '2 February 2024',
    credentialUrl: 'https://open.uom.lk/verify',
    credentialId: 'uQDVI9hiSx',
    imagePath: 'images/certifications/python-for-beginners.webp',
    imageSize: { width: 1000, height: 707 },
  },
  {
    name: 'Web Design for Beginners',
    issuer: 'University of Moratuwa (CODL)',
    credentialUrl: 'https://open.uom.lk/verify',
    credentialId: 'iWXdR0tOYi',
    imagePath: 'images/certifications/web-design-for-beginners.webp',
    imageSize: { width: 1000, height: 707 },
  },
  {
    name: 'Mastering Azure: Elevate Your Cloud Expertise',
    issuer: 'Microsoft Learn Student Ambassadors',
    imagePath: 'images/certifications/mastering-azure.webp',
    imageSize: { width: 1000, height: 773 },
  },
]

// Headline numbers for the About section. Counts are derived; the GPA and internship length
// mirror the Diploma entry in `education` and the SLT entry in `experience` — keep them in sync.
export const stats: StatEntry[] = [
  { value: projects.length, label: 'Projects built' },
  { value: certifications.length, label: 'Certifications' },
  { value: 3.98, decimals: 2, label: 'Diploma GPA' },
  { value: 6, suffix: ' mo', label: 'AI/ML internship' },
]
