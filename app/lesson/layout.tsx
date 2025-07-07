
type Props = {
  children: React.ReactNode;
}

const LessonLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex flex-col">
      <main className="flex flex-col h-full w-full">
        {children}
      </main>
    </div>
  )
}

export default LessonLayout