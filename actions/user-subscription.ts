// actions/user-subscription.ts
"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { createChapaCheckoutSession } from "@/lib/chapa";
import { absoluteUrl } from "@/lib/utils";

export const createChapaUrl = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const email = user.emailAddresses[0].emailAddress;
  const first_name = user.firstName || "User";
  const last_name = user.lastName || "Name";

  const tx_ref = `tx-${userId}-${Date.now()}`; // unique transaction ref
  const return_url = absoluteUrl("/shop");

  const chapaUrl = await createChapaCheckoutSession({
    amount: 200, // 200 ETB
    email,
    first_name,
    last_name,
    tx_ref,
    return_url,
  });

  return { data: chapaUrl };
};
