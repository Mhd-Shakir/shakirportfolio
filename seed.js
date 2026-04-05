import dbConnect from './src/lib/dbConnect';
import Project from './src/models/Project';
import Skill from './src/models/Skill';

const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    description: 'Advanced MERN ecosystem with secure Stripe integration, real-time analytics, and dynamic inventory sync.',
    techStack: ['Next.js 15', 'MongoDB', 'Stripe', 'Tailwind'],
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/murshidmm34-spec',
    color: '#00ffff',
    iconType: 'Terminal',
    order: 0
  },
  {
    title: 'AI Social Network',
    description: 'Next-gen social platform with AI content feeds, WebSocket chat, and biometric security.',
    techStack: ['React', 'Node.js', 'Socket.io', 'OpenAI'],
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/murshidmm34-spec',
    color: '#ff00ff',
    iconType: 'Cpu',
    order: 1
  }
];

const SKILLS = [
  { name: 'MERN Stack', iconName: 'Code2', proficiency: 95, category: 'Full Stack', order: 0 },
  { name: 'Next.js 15', iconName: 'Globe', proficiency: 92, category: 'Frontend', order: 1 },
  { name: 'React Native', iconName: 'Smartphone', proficiency: 88, category: 'Mobile', order: 2 },
  { name: 'Cloud Native', iconName: 'Server', proficiency: 85, category: 'Backend', order: 3 }
];

async function seed() {
  await dbConnect();
  
  await Project.deleteMany({});
  await Project.insertMany(PROJECTS);
  
  await Skill.deleteMany({});
  await Skill.insertMany(SKILLS);
  
  console.log('Database Seeded Successfully! 🚀');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
