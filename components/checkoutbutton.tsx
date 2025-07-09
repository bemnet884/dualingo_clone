'use client'

import { createChapaUrl } from "@/actions/user-subscription"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

export const UpgradeButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = () => {
    startTransition(async () => {
      try {
        const res = await createChapaUrl();
        window.location.href = res.data; // redirect to Chapa checkout
      } catch (error) {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <Button onClick={handleUpgrade} disabled={isPending}>
      {isPending ? "Redirecting..." : "Upgrade to Pro"}
    </Button>
  );
};
