import { Layout, LayoutProps } from 'react-admin'
import Sidebar from './CustomMenu'
import { MyAppBar } from './appBar'
const CustomLayout = (props: LayoutProps) => <Layout {...props} appBar={MyAppBar} menu={Sidebar} />

export default CustomLayout