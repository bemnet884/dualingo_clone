import FeedWrapper from '@/components/feed-wrapper'
import StickyWrapper from '@/components/stickey-wrapper'
import UserProgress from '@/components/user-progress'
import { getUserProgress, getUserSubscription } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import ShopItems from './items'
import Promo from '@/components/promo'
import Quests from '@/components/quests'

const Shop = async () => {

  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData
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
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className='flex flex-col w-full items-center'>
          <Image
            src="/shop.svg"
            alt='Shop'
            height={90}
            width={90}
          />
          <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>Shop</h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>Spend your points on cool stuff.</p>
          <ShopItems
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro} />
        </div>

      </FeedWrapper>

    </div>
  )
}

export default Shop