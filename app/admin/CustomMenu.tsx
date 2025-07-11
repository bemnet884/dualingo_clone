// components/admin/CustomMenu.tsx
import { Menu, MenuItemLink, MenuProps } from 'react-admin'
import BookIcon from '@mui/icons-material/Book'
import LayersIcon from '@mui/icons-material/Layers'
import SchoolIcon from '@mui/icons-material/School'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useSidebarState } from 'react-admin'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

const CustomMenu = (props: MenuProps) => {
  const [open] = useSidebarState()
  return (
    <Menu
      {...props}
      className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col")}
    >
      <Link href='/learn'>
        <div className="flex items-center gap-x-3 pt-8 pl-4 pb-7">
          <Image src='/mascot.svg' height={40} width={40} alt="logo" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Lingo</h1>
        </div>
      </Link>
      <MenuItemLink
        to="/courses"
        state={{ _scrollToTop: true }}
        primaryText="Courses"
        leftIcon={<BookIcon className='text-green-500' />}
        dense={!open}
      />
      <MenuItemLink to="/units" primaryText="Units" leftIcon={<LayersIcon className='text-green-500' />} dense={!open} />
      <MenuItemLink to="/lessons" primaryText="Lessons" leftIcon={<SchoolIcon className='text-green-500 ' />} dense={!open} />
      <MenuItemLink to="/challenges" primaryText="Challenges" leftIcon={<QuestionAnswerIcon className='text-green-500' />} dense={!open} />
      <MenuItemLink to="/challengeOptions" primaryText="Options" leftIcon={<CheckBoxIcon className='text-green-500' />} dense={!open} />
    </Menu>
  )
}

export default CustomMenu
