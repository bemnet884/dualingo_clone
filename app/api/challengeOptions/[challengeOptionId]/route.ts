import { db } from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export const GET = async (
  req: Request,
  { params }: { params: {challengeOptionId: number} }
) => {  
  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, params.challengeOptionId)
  })

  return NextResponse.json(data)
}

export const PUT = async (
  req: Request,
  { params }: { params: {challengeOptionId: number} }
) => {  
  const body = await req.json();
  const data = await db.update(challengeOptions).set({
    ...body
  }).where(eq(challengeOptions.id, params.challengeOptionId)).returning()

  return NextResponse.json(data[0])
}

export const DELETE = async (
  req: Request,
  { params }: { params: {challengeOptionId: number} }
) => {  
  const data = await db.delete(challengeOptions).where(eq(challengeOptions.id, params.challengeOptionId)).returning()

  return NextResponse.json(data[0])
}