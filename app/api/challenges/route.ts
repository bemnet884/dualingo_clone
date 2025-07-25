import { db } from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { NextResponse } from "next/server";


export const GET = async () => {
  const data = await db.query.challenges.findMany();
  
  return NextResponse.json(data);
}

export const POST = async (req: Request) => {
  
  const body = await req.json();
  const data = await db.insert(challenges).values({...body, }).returning()

  return NextResponse.json(data[0]);
}