import { lessons, units } from "@/db/schema"
import UnitBanner from "./unit-banner"
import LessonButton from "./lesson-button"

type Props = {
  id: number,
  title: string,
  description: string,
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[],
  order: number,
  activeLesson: typeof lessons.$inferSelect & { unit: typeof units.$inferSelect } | undefined,
  activeLessonPercentage: number
}

const Unit = ({ title, description, lessons, activeLesson, activeLessonPercentage }: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex flex-col items-center relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          )
        })}
      </div>
    </>
  )
}

export default Unit