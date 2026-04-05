const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://shakir_portfolio:x9YEM0m6B9pvDwFk@digirevolution.odaedua.mongodb.net/shakir-portfolio?retryWrites=true&w=majority&appName=DigiRevolution";

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  liveUrl: String,
  githubUrl: String,
  color: String,
  iconType: String,
  order: Number
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  name: String,
  iconName: String,
  proficiency: Number,
  category: String,
  order: Number
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to Atlas 🛰️');
  
  await Project.deleteMany({});
  await Project.insertMany([
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
  ]);
  
  await Skill.deleteMany({});
  await Skill.insertMany([
    { name: 'MERN Stack', iconName: 'Code2', proficiency: 95, category: 'Full Stack', order: 0 },
    { name: 'Next.js 15', iconName: 'Globe', proficiency: 92, category: 'Frontend', order: 1 },
    { name: 'React Native', iconName: 'Smartphone', proficiency: 88, category: 'Mobile', order: 2 }
  ]);
  
  console.log('Database Initialized Successfully! 🚀');
  process.exit();
}

seed();
