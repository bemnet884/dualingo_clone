import { db } from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { NextResponse } from "next/server";


export const GET = async () => {
  const data = await db.query.challengeOptions.findMany();
  
  return NextResponse.json(data);
}

export const POST = async (req: Request) => {
  
  const body = await req.json();
  const data = await db.insert(challengeOptions).values({...body, }).returning()

  return NextResponse.json(data[0]);
}