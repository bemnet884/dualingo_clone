import FeedWrapper from '@/components/feed-wrapper'
import Promo from '@/components/promo'
import StickyWrapper from '@/components/stickey-wrapper'
import { Progress } from '@/components/ui/progress'
import UserProgress from '@/components/user-progress'
import { quests } from '@/constants'
import { getUserProgress, getUserSubscription } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'


const Quests = async () => {

  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();


  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive
  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourseId}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro} />
        {!isPro && (
          <Promo />)
        }

      </StickyWrapper>
      <FeedWrapper>
        <div className='flex flex-col w-full items-center'>
          <Image
            src="/quests.svg"
            alt='Quests'
            height={90}
            width={90}
          />
          <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>Quests</h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>Complete Quests by earning points.</p>
          <ul className='w-full'>
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100
              return (
                <div
                  key={quest.title}
                  className='flex items-center w-full p-4 gap-x-4 border-t-2'
                >
                  <Image
                    src="/points.svg"
                    alt='Points'
                    height={60}
                    width={60}
                  />
                  <div className='flex flex-col gap-y-2 w-full'>
                    <p className='text-neutral-700 text-xl font-bold'>{quest.title}</p>
                    <Progress value={progress} className='h-3' />

                  </div>
                </div>
              )
            })}
          </ul>
        </div>

      </FeedWrapper>

    </div>
  )
}

export default Quests