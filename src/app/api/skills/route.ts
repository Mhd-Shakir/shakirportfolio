import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Skill from '@/models/Skill';

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data: skills });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const skill = await Skill.create(body);
    return NextResponse.json({ success: true, data: skill });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to create skill' }, { status: 500 });
  }
}
