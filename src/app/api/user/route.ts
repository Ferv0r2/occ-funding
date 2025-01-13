import { NextResponse } from 'next/server';
import type { IUser } from '@/types/user/IUser';
// Handler for GET requests
export async function GET() {
  const data: IUser = {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
    name: 'John Maverick',
    email: 'john@example.com',
    walletAddress: '0x1234567890123456789012345678901234567890',
    profileImage: 'https://avatars.githubusercontent.com/u/78407912?v=4',
  };

  return NextResponse.json(data);
}
