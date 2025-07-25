import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton, } from "@clerk/nextjs"
import Image from "next/image"
import { Loader } from 'lucide-react'
import { Button } from "@/components/ui/button"
const Header = () => {
  return (
    <header className="h-20 w-full px-4 border-b-2 border-slate-200">
      <div className="lg:max-w-screen-lg mx-auto flex justify-between items-center h-full">
        <div className="flex items-center gap-x-3 pt-8 pl-4 pb-7">
          <Image src='/mascot.svg' height={40} width={40} alt="logo" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Lingo</h1>
        </div>
        <ClerkLoading >
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" variant="ghost">Login</Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  )
}

export default Header