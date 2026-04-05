import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  title: string;
  subtitle: string;
  bio: string;
}

export interface ISkill extends Document {
  name: string;
  iconName: string;
  proficiency: number;
  category: string;
}

export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  featured: boolean;
}

const AboutSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  bio: { type: String, required: true },
});

const SkillSchema = new Schema({
  name: { type: String, required: true },
  iconName: { type: String, required: true },
  proficiency: { type: Number, required: true },
  category: { type: String, required: true },
});

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  liveUrl: { type: String },
  githubUrl: { type: String },
  techStack: [{ type: String }],
  featured: { type: Boolean, default: false },
});

export const About = mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
export const Skill = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
