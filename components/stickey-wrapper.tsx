type Props = {
  children: React.ReactNode;
}
const StickyWrapper = ({ children }: Props) => {
  return (
    <div className="hidden lg:block w-[380px] sticky self-end bottom-6">
      <div className="min-h-[calc(100vh-48px)] sticky flex flex-col top-6 gap-y-4">{children}</div>
    </div>
  )
}

export default StickyWrapper