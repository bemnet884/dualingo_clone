import FeedWrapper from '@/components/feed-wrapper'
import StickyWrapper from '@/components/stickey-wrapper'
import React from 'react'
import Header from './header'
import UserProgress from '@/components/user-progress'
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from '@/db/queries'
import { redirect } from 'next/navigation'
import Unit from './unit'
import Promo from '@/components/promo'
import Quests from '@/components/quests'

const Learn = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const userSubscriptionData = getUserSubscription();

  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPercentage, userSubscription] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData
  ])

  if (!userProgress || !userProgress.activeCourseId) {
    redirect('/courses')
  };

  if (!courseProgress) { redirect('/courses') };
  const isPro = !!userSubscription?.isActive

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6' >
      <StickyWrapper >
        <UserProgress
          activeCourse={userProgress.activeCourseId}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && (
          <Promo />)
        }
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourseId.title} />
        {units.map((unit) => (
          <div key={unit.id} className='mb-10'>
            <Unit
              id={unit.id}
              title={unit.title}
              description={unit.description}
              order={unit.order}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default Learn