import { NextResponse } from 'next/server';

type Data = {
  id: string;
  firstName: string;
  lastName: string;
};

// Handler for GET requests
export async function GET() {
  const data: Data = {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
    firstName: 'John',
    lastName: 'Maverick',
  };

  return NextResponse.json(data);
}
