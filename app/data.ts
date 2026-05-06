// app/data.ts

// This tells TypeScript exactly what a "Course" looks like
export type Course = {
  id: string;
  title: string;
  duration: string;
  level: string;
  imagePath: string;
  desc: string;
  tags: string[];
};

export const COURSES: Course[] = [
  { 
    id: 'fullstack', 
    title: 'Full-Stack Engineering', 
    duration: '12 Weeks', 
    level: 'Intermediate', 
    imagePath: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    desc: 'Master the MERN stack and build production-ready web applications from scratch.',
    tags: ['React', 'Node.js', 'MongoDB', 'System Design']
  },
  { 
    id: 'data-science', 
    title: 'Data Science & AI', 
    duration: '10 Weeks', 
    level: 'Beginner-Pro', 
    imagePath: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    desc: 'Dive deep into machine learning algorithms, data visualization, and predictive AI models.',
    tags: ['Python', 'TensorFlow', 'SQL', 'Pandas']
  },
  { 
    id: 'cyber-security', 
    title: 'Cybersecurity Analyst', 
    duration: '8 Weeks', 
    level: 'Advanced',
    imagePath: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    desc: 'Learn ethical hacking, penetration testing, and how to secure enterprise networks.',
    tags: ['Network Security', 'Kali Linux', 'Cryptography']
  }
];