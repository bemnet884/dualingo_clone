import { db } from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { NextResponse } from "next/server";


export const GET = async () => {
  const data = await db.query.lessons.findMany();
  
  return NextResponse.json(data);
}

export const POST = async (req: Request) => {
  
  const body = await req.json();
  const data = await db.insert(lessons).values({...body, }).returning()

  return NextResponse.json(data[0]);
}