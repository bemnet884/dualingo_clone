import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import SidebarItems from "./sidebar-items"
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { Loader } from "lucide-react"

type Props = {
  className?: string
}
const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)} >
      <Link href='/learn'>
        <div className="flex items-center gap-x-3 pt-8 pl-4 pb-7">
          <Image src='/mascot.svg' height={40} width={40} alt="logo" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Lingo</h1>
        </div>
      </Link>
      <div className="flex flex-col flex-1 gap-y-2">
        <SidebarItems
          label={"Learn"}
          iconSrc={"/learn.svg"}
          href={"/learn"} />
        <SidebarItems
          label={"Leaderboard"}
          iconSrc={"/leaderboard.svg"}
          href={"/leaderboard"} />
        <SidebarItems
          label={"Quests"}
          iconSrc={"/quests.svg"}
          href={"/quests"} />
        <SidebarItems
          label={"Shop"}
          iconSrc={"/shop.svg"}
          href={"/shop"} />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  )
}

export default Sidebar