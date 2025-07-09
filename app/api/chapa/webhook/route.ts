import { NextRequest, NextResponse } from "next/server";
import { userSubscription } from "@/db/schema";
import { db } from "@/db/drizzle";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.CHAPA_WEBHOOK_SECRET;
    if (!secret) {
      console.error("❌ Missing CHAPA_WEBHOOK_SECRET in env");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    // Read raw body as string
    const rawBody = await req.text();

    // Verify signature
    const signature = req.headers.get("x-chapa-signature");
    if (!signature) {
      console.warn("❌ Missing signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.warn("❌ Signature mismatch");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse verified JSON
    const body = JSON.parse(rawBody);
    console.log("🔔 Webhook received:", JSON.stringify(body, null, 2));

    if (body.event !== "charge.success") {
      console.log("ℹ️ Ignored event:", body.event);
      return NextResponse.json({ received: true });
    }

    const data = body.data;

    if (!data || !data.tx_ref || !data.status || !data.updated_at) {
      console.error("❌ Missing required payment fields in data:", data);
      return NextResponse.json({ error: "Invalid webhook data" }, { status: 400 });
    }

    const txRef: string = data.tx_ref;
    const status: string = data.status;
    const paidAt = new Date(data.updated_at);

    const userId = txRef.split("-")[1];
    if (!userId) {
      console.error("❌ Invalid tx_ref format:", txRef);
      return NextResponse.json({ error: "Invalid tx_ref" }, { status: 400 });
    }

    if (status === "success") {
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

      console.log(`✅ Payment recorded for user ${userId}`);
      return NextResponse.json({ success: true });
    }

    console.log("ℹ️ Payment not marked as success:", status);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
