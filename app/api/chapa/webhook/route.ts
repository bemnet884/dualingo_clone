// app/api/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import { userSubscription } from "@/db/schema";
import { db } from "@/db/drizzle";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.event === "charge.success") {
      const data = body.data;
      const txRef = data.tx_ref;
      const status = data.status; // expect "success"
      const paidAt = new Date(data.updated_at);

      // Extract userId from tx_ref which is in the format: "tx-<userId>-<timestamp>"
      const userId = txRef?.split("-")[1];

      if (!userId) {
        return NextResponse.json({ error: "Missing userId in tx_ref" }, { status: 400 });
      }

      if (status === "success") {
        // Insert or update subscription record
        await db
          .insert(userSubscription)
          .values({
            userId,
            chapaTxRef: txRef,
            chapaPaymentStatus: "paid",
            chapaPaymentTime: paidAt,
          })
          .onConflictDoUpdate({
            target: userSubscription.userId,
            set: {
              chapaTxRef: txRef,
              chapaPaymentStatus: "paid",
              chapaPaymentTime: paidAt,
            },
          });

        return NextResponse.json({ success: true });
      }
    }

    // For other events or no-op
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
