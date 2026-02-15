export type QAEntry = {
  question: string;
  answer: string;
};

export type ResumeData = {
  name: string;
  role: string;
  company: string;
  duration: string;
  experienceSummary: string;
  experiences: {
    role: string;
    company: string;
    duration: string;
    location: string;
    summary: string;
    highlights: string[];
  }[];
  email: string;
  phone: string;
  location: string;
  height: string;
  weight: string;
  values: string[];
  hobbies: string[];
  projects: string[];
  strengths: string[];
  education: string[];
  languages: { name: string; level: string }[];
  socialLinks: { label: string; href: string }[];
  qa: QAEntry[];
};

export const resumeData: ResumeData = {
  name: "Thameem Ansari",
  role: "Senior Frontend Engineer",
  company: "Capgemini",
  duration: "May 7, 2025 - Present",
  experienceSummary:
    "Disciplined and value-oriented frontend engineer with over 5 years of experience delivering scalable React applications with strong performance and accessibility.",
  experiences: [
    {
      role: "Senior Frontend Engineer",
      company: "Capgemini",
      duration: "May 7, 2025 - Present",
      location: "Chennai, India",
      summary:
        "Leading frontend engineering for scalable enterprise applications with React and TypeScript, focusing on quality, performance, and maintainable architecture.",
      highlights: [
        "Built and maintained production-grade frontend modules for enterprise workflows",
        "Collaborated across product, design, and backend teams for reliable delivery",
        "Improved performance and UX consistency through reusable component patterns"
      ]
    },
    {
      role: "Senior Frontend Engineer",
      company: "Cavin Infotech",
      duration: "October 2024 - April 2025",
      location: "Chennai, India",
      summary:
        "Building scalable product web solutions with ReactJS, Next.js, WebSocket, Redux Toolkit, and strong UI/UX practices.",
      highlights: [
        "Venba - AI Chat Assistance Web App",
        "Fintech - Financial Eligibility & Advisory Platform",
        "Trove - Real-Time Chat App",
        "MyTheron - Internal Job Portal Application"
      ]
    },
    {
      role: "Senior Frontend Engineer",
      company: "Coherent Pixels (Client: Cavin Infotech)",
      duration: "July 2024 - September 2024",
      location: "Chennai, India",
      summary:
        "Worked on contract through Coherent Pixels for Cavin Infotech, developing and optimizing React-based client applications.",
      highlights: [
        "Project: Ascendio - Goal Tracking Application",
        "Built structured workflow and progress-tracking interfaces with strong user engagement focus",
        "Integrated interactive charts/reports for performance insights",
        "Technologies: ReactJS, JavaScript, React Hook Form, Redux Toolkit"
      ]
    },
    {
      role: "Frontend Engineer",
      company: "Goaira Technologies",
      duration: "September 2022 - June 2024",
      location: "Chennai, India",
      summary:
        "Developed and maintained Goaira admin panel and website for trip-booking flows across cars, bikes, autos, and rentals.",
      highlights: [
        "Optimized app performance and reduced load times",
        "Developed custom rendering solutions with React Reconciler",
        "Integrated APIs and managed global state with Redux Toolkit",
        "Conducted performance audits and implemented optimizations",
        "Collaborated with UX/UI designers and backend developers"
      ]
    },
    {
      role: "Junior Frontend Developer",
      company: "Tecnovators Software Solutions",
      duration: "May 2021 - September 2022",
      location: "Chennai, India",
      summary:
        "Built and maintained high-performance e-commerce web applications with scalable and responsive frontend architecture.",
      highlights: [
        "Developed multiple e-commerce applications with ReactJS, HTML, CSS, and JavaScript",
        "Maintained over 40 web pages with daily updates",
        "Integrated/customized third-party React libraries",
        "Used Git for version control and team collaboration",
        "Ensured cross-browser compatibility and clean coding standards"
      ]
    }
  ],
  email: "loyalty.thameem@gmail.com",
  phone: "+91 9629036885",
  location: "Chennai, India",
  height: "178cm / 5'10\"",
  weight: "82kg (Feb 2026)",
  values: [
    "Fitness-focused",
    "Spiritual",
    "Family responsibility person",
    "Eggetarian",
    "Teetotaler",
    "Non-smoker",
    "Non-drinker",
    "Minimalist",
    "Health-conscious",
    "Value-driven",
    "Self-disciplined",
    "Traditional mindset",
    "Simple living person"
  ],
  hobbies: [
    "Favorite: White rice with rasam and egg",
    "Favorite: Egg biryani",
    "Favorite: Coconut rice",
    "Favorite: Ghee rice",
    "No smoking",
    "No drinking",
    "No tea & coffee",
    "No sweets & chocolates",
    "No milk",
    "No junk food",
    "Does not watch movies",
    "Does not listen to songs"
  ],
  projects: [
    "Venba - AI Chat Assistance Web App",
    "Fintech - Financial Eligibility & Advisory Platform",
    "Trove - Real-Time Chat App",
    "MyTheron - Internal Job Portal Application"
  ],
  strengths: [
    "React and Next.js architecture",
    "TypeScript and modern UI development",
    "Redux Toolkit and scalable state management",
    "Performance and accessibility focus"
  ],
  education: [
    "Master of Computer Application - Bharathidasan University (May 2018 - Apr 2020)",
    "Bachelor of Computer Application - Bharathidasan University (Jun 2015 - Apr 2018)"
  ],
  languages: [
    { name: "Tamil", level: "Native" },
    { name: "English", level: "Moderate" }
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/loyalty-thameem" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/loyalty-thameem-88489222a" },
    { label: "X", href: "https://x.com/Loyalty_Thameem" },
    { label: "Instagram", href: "https://www.instagram.com/loyalty_thameem/" },
    { label: "YouTube", href: "https://www.youtube.com/@Loyalty_Thameem" }
  ],
  qa: [
    {
      question: "Tell me about your experience",
      answer: "I have over 5 years of frontend experience and currently work as a Senior Frontend Engineer at Capgemini, with prior roles at Cavin Infotech, Coherent Pixels, Goaira Technologies, and Tecnovators."
    },
    {
      question: "Which projects have you built?",
      answer: "I worked on Venba AI Chat Assistant, a fintech financial eligibility and advisory platform, Trove real-time chat app, and MyTheron internal job portal."
    },
    {
      question: "What are your strengths?",
      answer: "My strengths include React architecture, TypeScript, Redux Toolkit, performance tuning, and building accessible user interfaces."
    },
    {
      question: "What are your personal values?",
      answer: "I follow a disciplined and value-driven lifestyle with strong family values, a traditional mindset, and long-term commitment to health, consistency, and purposeful growth."
    },
    {
      question: "What is your education background?",
      answer: "I completed MCA and BCA from Bharathidasan University, Thanjavur."
    }
  ]
};
