import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-4">
        <div className="flex items-center gap-x-2">
          <Image
            src="/unlimited.svg"
            alt='Unlimited'
            height={26}
            width={26}
          />
          <h3 className="font-bold text-lg">
            Upgrade to pro.
          </h3>
        </div>
        <p className="text-muted-foreground">Get unlimited hearts and more.</p>
      </div>
      <Button
        asChild
        variant='super'
        className="w-full"
        size="lg"
      >
        <Link href='/shop'>
          Upgrade today
        </Link>
      </Button>

    </div>
  )
}

export default Promo