import { UpgradeButton } from "@/components/checkoutbutton";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignIn, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, } from "@clerk/nextjs"
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="max-w-[988px] flex-1 w-full mx-auto flex flex-col lg:flex-row p-4 items-center justify-center gap-2">

      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src='/hero.svg' alt="hero image" fill />
      </div>
      <div className="flex flex-col gap-y-8 items-center">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 text-center  max-w-[480px]">Learn, Practice and Master New Languages With Lingo.</h1>

        <UpgradeButton />
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">

          <ClerkLoading >
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            {/**Signed In */}
            <SignedIn>
              <Button size="lg" variant="secondary" asChild>
                <Link href='/learn'>
                  Continue Learning</Link>
              </Button>
            </SignedIn>

            {/**Signed Out */}
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="w-full" size="lg" variant="secondary">Get Started</Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="primaryOutline">
                  Aleady have an account
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>

      </div>
    </div>
  );
}
