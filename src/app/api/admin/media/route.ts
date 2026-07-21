import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'media';
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Create the target directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a unique filename using timestamp
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/\.[^/.]+$/, ""); // strip extension
    const cleanName = originalName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    
    const fileName = `${cleanName}-${uniqueSuffix}.webp`;
    const filePath = path.join(uploadDir, fileName);

    // Process with sharp
    // Convert to webp, optimize quality
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Resize if too large (max width 3840 for 4K)
    if (metadata.width && metadata.width > 3840) {
      image.resize(3840, null, { withoutEnlargement: true });
    }

    await image
      .webp({ quality: 85, effort: 6 }) // Effort 6 gives good compression vs speed trade-off
      .toFile(filePath);

    const publicUrl = `/uploads/${folder}/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      altText,
      folder,
      fileName,
      size: fs.statSync(filePath).size,
      width: metadata.width,
      height: metadata.height
    }, { status: 201 });

  } catch (error: any) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: 'Failed to process and upload image' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'media';

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    
    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(uploadDir);
    const images = files.filter(f => f.match(/\.(jpg|jpeg|png|webp|avif|gif)$/i)).map(fileName => {
      const filePath = path.join(uploadDir, fileName);
      const stat = fs.statSync(filePath);
      return {
        url: `/uploads/${folder}/${fileName}`,
        fileName,
        size: stat.size,
        createdAt: stat.birthtime
      };
    });

    // Sort by newest first
    images.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Media fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const filePathUrl = searchParams.get('path');

    if (!filePathUrl) {
      return NextResponse.json({ error: 'Path required' }, { status: 400 });
    }

    // Security check: ensure path is within public/uploads
    if (!filePathUrl.startsWith('/uploads/')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 403 });
    }

    const absolutePath = path.join(process.cwd(), 'public', filePathUrl);
    
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Media delete error:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
