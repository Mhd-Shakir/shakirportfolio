import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  iconName: string;
  proficiency: number;
  category: string;
  order: number;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  iconName: { type: String, required: true },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  category: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
