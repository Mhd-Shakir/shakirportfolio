import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
  delete (mongoose.models as any).Contact;
}

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
