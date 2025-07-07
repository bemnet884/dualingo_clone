import { Button } from "@/components/ui/button"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 p-2 border-slate-200">
      <div className="max-w-screen-lg flex mx-auto items-center justify-evenly h-full">
        <Button size="lg" variant="ghost">
          <Image
            alt="Croatian"
            src="/hr.svg"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Croatian
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            alt="Spanish"
            src="/es.svg"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            alt="French"
            src="/fr.svg"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          French
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            alt="Japanese"
            src="/jp.svg"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            alt="Italian"
            src="/it.svg"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Italian
        </Button>
      </div>
    </footer>
  )
}

export default Footer