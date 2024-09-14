import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { message: "Too many requests, please try again later." },
    { status: 429 }
  );
}