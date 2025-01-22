// pages/api/upload.js
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import connectDB from '@/app/utils/db';

export async function POST(req) {
  try {
    // Connect to MongoDB first
    await connectDB();

    const data = await req.formData();
    const file = data.get('image');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      return NextResponse.json({ 
        success: true,
        filename: `/uploads/${filename}` 
      });
    } catch (error) {
      console.error('File write error:', error);
      return NextResponse.json(
        { error: 'Error saving file' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};