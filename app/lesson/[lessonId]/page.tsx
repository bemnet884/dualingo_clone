import { getLesson, getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'
import Quiz from '../quiz'
import { auth } from '@clerk/nextjs/server'

type Props = {
  params: {
    lessonId: number;
  }
}

const LessonId = async ({ params }: Props) => {
  const lessonData = getLesson(params.lessonId)
  const userProgressData = getUserProgress()
  const { has } = await auth()
  const hasProPlan = await has({ plan: 'pro' }) // Update 'pro' to your actual Clerk plan name

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData
  ])

  if (!lesson || !userProgress) {
    redirect("/learn")
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialLessonHearts={userProgress.hearts}
      initialLessonPercentage={initialPercentage}
      hasActiveSubscription={hasProPlan}
    />
  )
}

export default LessonId
