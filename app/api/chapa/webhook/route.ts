// app/api/chapa/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import { userSubscription } from "@/db/schema";
import { db } from "@/db/drizzle";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.CHAPA_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Missing CHAPA_WEBHOOK_SECRET in env");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    // Get raw request body as text for signature verification
    const bodyText = await req.text();

    // Get signature sent by Chapa
    const signature = req.headers.get("x-chapa-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature header" }, { status: 401 });
    }

    // Compute HMAC SHA256 digest of the raw body using your secret
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(bodyText)
      .digest("hex");

    // Compare signatures (timing-safe compare recommended, simplified here)
    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse JSON body after verifying signature
    const body = JSON.parse(bodyText);

    if (body.event === "charge.success") {
      const data = body.data;
      const txRef = data.tx_ref;
      const status = data.status; // expect "success"
      const paidAt = new Date(data.updated_at);

      // Extract userId from tx_ref format: "tx-<userId>-<timestamp>"
      const userId = txRef?.split("-")[1];

      if (!userId) {
        return NextResponse.json({ error: "Missing userId in tx_ref" }, { status: 400 });
      }

      if (status === "success") {
        // Insert or update subscription record in your DB
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

    // For other events or if no action needed
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
