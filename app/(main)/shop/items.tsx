'use client'

import { refillHearts } from "@/actions/user-progress"
import { createChapaUrl } from "@/actions/user-subscription"
import { Button } from "@/components/ui/button"
import { POINTS_TO_REFILL } from "@/constants"
import Image from "next/image"
import { useTransition } from "react"
import { toast } from "sonner"

type Props = {
  hearts: number,
  points: number,
  hasActiveSubscription: boolean
}


const ShopItems = ({
  hearts,
  points,
  hasActiveSubscription
}: Props) => {
  const [pending, startTransition] = useTransition();


  // purhcase hearts
  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) { return; }

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong when purchasing hearts "))
    })
  }
  // subscribe to pro
  const onUpgrade = () => {
    startTransition(() => {
      createChapaUrl()
        .then((checkoutUrl) => {
          if (checkoutUrl) {
            toast.success("Redirecting to Chapa...");
            window.location.href = checkoutUrl;
          }
        })
        .catch(() => toast.error("Something went wrong whene redirecting to cahpa"));
    });
  };


  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-4">
        <Image
          src='/heart.svg'
          alt="Heart"
          width={60}
          height={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">Purchase hearts</p>
        </div>

        <Button
          disabled={
            pending
            || hearts === 5
            || points < POINTS_TO_REFILL
            || hasActiveSubscription // when user is in subscription no need to purchase hears because they alredy have unlimited hearts
          }
          onClick={onRefillHearts}>
          {hearts === 5 ? "full" : (
            <div className="flex items-center">
              <Image
                src='/points.svg'
                alt="Points"
                width={20}
                height={20}
              />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>

      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2 ">
        <Image
          src='/unlimited.svg'
          alt="Unlimited hearts"
          width={60}
          height={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">Unlimited hearts</p>
        </div>

        <Button
          disabled={pending}
          onClick={onUpgrade}>
          {hasActiveSubscription ? "settings" : "upgrade"}
        </Button>
      </div>
    </ul>
  )
}

export default ShopItems