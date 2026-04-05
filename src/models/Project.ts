import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
  iconType: 'Terminal' | 'Cpu' | 'Shield' | 'Rocket';
  order: number;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  color: { type: String, default: '#00ffff' },
  iconType: { type: String, enum: ['Terminal', 'Cpu', 'Shield', 'Rocket'], default: 'Terminal' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
