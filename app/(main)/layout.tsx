import Mobileheader from "@/components/mobileheader";
import Sidebar from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Mobileheader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="h-full pt-4 max-w-[1050px] mx-auto">
          {children}

        </div>
      </main>
    </>
  )
}

export default MainLayout