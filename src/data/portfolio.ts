export const personalInfo = {
  name: 'Pawan Sain',
  title: 'Data Analyst & Full Stack Developer',
  tagline: 'Transforming raw data into meaningful business insights',
  email: 'pawansa2006@gmail.com',
  phone: '+91 9829019720',
  location: 'Greater Jaipur Area, India',
  github: 'https://github.com/UnplannedCoder',
  linkedin: 'https://www.linkedin.com/in/pawan-sain-18b74631b',
  twitter: '#',
  resume: '#',
  about: `I'm Pawan Sain, an aspiring Data Analyst and Computer Science student at JECRC University with a strong passion for transforming raw data into meaningful business insights. I enjoy solving real-world problems through data analysis and visualization.

I have earned the Google Data Analytics Professional Certificate, where I gained hands-on experience throughout the complete data analysis lifecycle — from data collection and cleaning to analysis, visualization, and communicating insights.

My technical toolkit includes Python, SQL, Excel, Power BI, Git, and GitHub. Alongside data analytics, I'm also strengthening my software development skills through Full Stack Web Development, giving me a deeper understanding of how applications generate data and how that data can be analyzed to support better decision-making.

I'm passionate about continuous learning, building practical projects, and currently seeking internship and entry-level opportunities where I can contribute, grow, and gain industry experience as a Data Analyst.`,
  stats: [
    { label: 'Projects Completed', value: 8 },
    { label: 'Certificates Earned', value: 8 },
    { label: 'Technologies Used', value: 15 },
    { label: 'Months Experience', value: 2 },
  ],
}

export const education = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    major: 'Computer Science',
    school: 'JECRC University',
    duration: 'January 2024 – October 2028',
    location: 'Jaipur, Rajasthan',
    icon: '🎓',
  },
]

export const experience = [
  {
    role: 'Full Stack Development Intern',
    company: 'DecodeLabs',
    type: 'Remote',
    duration: 'June 2026 – July 2026',
    responsibilities: [
      'Developed and enhanced web applications using modern full-stack technologies.',
      'Completed weekly development projects and milestones.',
      'Improved frontend and backend development skills through hands-on industry projects.',
      'Worked with HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, Git, and GitHub.',
    ],
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
  },
]

export const skills = [
  {
    category: 'Programming Languages',
    items: [
      { name: 'Python', level: 82, icon: '🐍' },
      { name: 'JavaScript', level: 80, icon: '🟨' },
      { name: 'HTML', level: 92, icon: '🌐' },
      { name: 'CSS', level: 88, icon: '🎨' },
    ],
  },
  {
    category: 'Data Analytics',
    items: [
      { name: 'Microsoft Excel', level: 88, icon: '📊' },
      { name: 'SQL (MySQL)', level: 82, icon: '🗄️' },
      { name: 'Power BI', level: 85, icon: '📈' },
      { name: 'MySQL', level: 80, icon: '🐬' },
      { name: 'MongoDB', level: 72, icon: '🍃' },
    ],
  },
  {
    category: 'Web Development',
    items: [
      { name: 'React.js', level: 80, icon: '⚛️' },
      { name: 'Node.js', level: 75, icon: '🟩' },
      { name: 'Express.js', level: 75, icon: '🚀' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', level: 85, icon: '🔧' },
      { name: 'GitHub', level: 85, icon: '🐙' },
    ],
  },
]

export const techStack = [
  { name: 'Python' },
  { name: 'JavaScript' },
  { name: 'React.js' },
  { name: 'Node.js' },
  { name: 'Express.js' },
  { name: 'HTML & CSS' },
  { name: 'SQL / MySQL' },
  { name: 'MongoDB' },
  { name: 'Microsoft Excel' },
  { name: 'Power BI' },
  { name: 'Git' },
  { name: 'GitHub' },
]

export const projects = [
  {
    id: 1,
    title: 'Expense Tracker',
    description: 'A full-stack expense tracking app to log, categorize, and visualize personal finances. Features real-time balance updates and clean, responsive UI.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    github: '',
    live: 'https://expense-tracker-app-rho-mocha.vercel.app',
    image: '/projects/expense-tracker.png',
    featured: true,
    type: 'Full Stack',
  },
  {
    id: 2,
    title: 'AeroFlow AI',
    description: 'An AI-powered full-stack web application built during the DecodeLabs internship. Integrates modern frontend and backend technologies with AI-driven features.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/code-by-pawan/DecodeLabs-Internship/tree/main/Fullstack%20Project%201',
    live: '',
    image: '/projects/aeroflow-ai.png',
    featured: true,
    type: 'Full Stack',
  },
  {
    id: 3,
    title: 'TaskFlow',
    description: 'A collaborative task management application with intuitive workflow management. Built with a full-stack architecture for efficient project tracking.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    github: 'https://github.com/code-by-pawan/DecodeLabs-Internship/tree/main/Fullstack%20Project%202',
    live: '',
    image: '/projects/taskflow.png',
    featured: true,
    type: 'Full Stack',
  },
  {
    id: 4,
    title: 'SaaSify CRM',
    description: 'A SaaS-based Customer Relationship Management tool designed to streamline business workflows, manage leads, and track customer interactions.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/code-by-pawan/DecodeLabs-Internship/tree/main/Fullstack%20Project%203',
    live: '',
    image: '/projects/saasify-crm.png',
    featured: false,
    type: 'Full Stack',
  },
  {
    id: 5,
    title: 'Aura Tasks',
    description: 'A beautifully designed task management app with smooth animations and a focus on user experience. Helps manage daily to-dos efficiently.',
    tags: ['React', 'Node.js', 'CSS', 'Express.js'],
    github: 'https://github.com/code-by-pawan/DecodeLabs-Internship/tree/main/Fullstack%20Project%204',
    live: '',
    image: '/projects/aura-tasks.png',
    featured: false,
    type: 'Full Stack',
  },
  {
    id: 6,
    title: 'Blinkit Sales Analysis Dashboard',
    description: 'An interactive Power BI dashboard analyzing Blinkit grocery sales data. Uncovers trends in product performance, category sales, and outlet-wise revenue.',
    tags: ['Power BI', 'Data Analytics', 'DAX', 'SQL'],
    github: 'https://github.com/UnplannedCoder/Blinkit-Grocery-Analysis',
    live: '',
    image: '/projects/blinkit.png',
    featured: true,
    type: 'Data Analytics',
  },
  {
    id: 7,
    title: 'Mobile Sales Analysis Dashboard',
    description: 'A comprehensive Power BI dashboard tracking mobile phone sales metrics, brand performance, regional trends, and key business KPIs.',
    tags: ['Power BI', 'Data Analytics', 'DAX', 'Excel'],
    github: 'https://github.com/UnplannedCoder/Mobile-Sales-Analysis',
    live: '',
    image: '/projects/mobile-sales.png',
    featured: false,
    type: 'Data Analytics',
  },
  {
    id: 8,
    title: 'Sales Performance Dashboard',
    description: 'An insightful Power BI dashboard delivering a 360° view of sales performance including revenue trends, top products, regional analysis, and growth metrics.',
    tags: ['Power BI', 'Data Analytics', 'DAX', 'Excel'],
    github: 'https://github.com/UnplannedCoder/Sales-Performance-Insights',
    live: '',
    image: '/projects/sales-performance.png',
    featured: false,
    type: 'Data Analytics',
  },
]

export const certificates = [
  {
    id: 1,
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google / Coursera',
    date: 'Jul 25, 2026',
    // Exact filename from public/certificates/
    image: '/certificates/Google Data Analytics.png',
    tags: ['Data Analytics', 'SQL', 'Python', 'Tableau'],
    courses: 9,
  },
  {
    id: 2,
    title: 'Microsoft Power BI Data Analyst Professional Certificate',
    issuer: 'Microsoft / Coursera',
    date: 'Jul 30, 2026',
    image: '/certificates/Microsoft Power BI.png',
    tags: ['Power BI', 'DAX', 'Excel', 'Data Modeling'],
    courses: 8,
  },
  {
    id: 3,
    title: 'Deloitte Australia – Data Analytics Job Simulation',
    issuer: 'Deloitte / Forage',
    date: 'Jun 14, 2026',
    image: '/certificates/Data Analytics.png',
    tags: ['Data Analysis', 'Forensic Technology'],
    courses: null,
  },
  {
    id: 4,
    title: 'Google Prompting Essentials',
    issuer: 'Google / Coursera',
    date: 'Jul 6, 2026',
    image: '/certificates/Google Prompting Essentials.png',
    tags: ['AI', 'Prompt Engineering', 'Generative AI'],
    courses: 4,
  },
  {
    id: 5,
    title: 'Meta Full Stack Developer: Front-End & Back-End from Scratch',
    issuer: 'Meta / Coursera',
    date: 'Jul 5, 2026',
    image: '/certificates/Fullstack Developer.png',
    tags: ['React', 'Python', 'Django', 'Full Stack'],
    courses: 10,
  },
  {
    id: 6,
    title: 'AI for Beginners',
    issuer: 'HP LIFE',
    date: 'Jul 18, 2025',
    image: '/certificates/AI For Beginners.png',
    tags: ['AI', 'Machine Learning', 'Technology'],
    courses: null,
  },
  {
    id: 7,
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: 'Oct 24, 2025',
    image: '/certificates/MySQL.png',
    tags: ['SQL', 'Database', 'Querying'],
    courses: null,
  },
  {
    id: 8,
    title: 'Python',
    issuer: 'GeeksforGeeks',
    date: '2025',
    image: '/certificates/Python.png',
    tags: ['Python', 'Programming', 'Data Structures'],
    courses: null,
  },
]
