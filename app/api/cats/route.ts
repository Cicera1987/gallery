// app/api/cats/route.ts
import { NextResponse } from 'next/server';
import cats from '../../../cats.json';



export async function GET() {
    return NextResponse.json(cats);
}
