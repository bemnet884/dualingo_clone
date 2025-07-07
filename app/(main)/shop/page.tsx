import FeedWrapper from '@/components/feed-wrapper'
import StickyWrapper from '@/components/stickey-wrapper'
import UserProgress from '@/components/user-progress'
import { getUserProgress } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import ShopItems from './items'
import Promo from '@/components/promo'
import Quests from '@/components/quests'
import { auth } from '@clerk/nextjs/server'

const Shop = async () => {
  const userProgressData = getUserProgress()
  const { has } = await auth()
  const hasProPlan = await has({ plan: 'pro' }) // change 'pro' if your plan has a different ID

  const userProgress = await userProgressData

  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses")
  }

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourseId}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={hasProPlan}
        />
        {!hasProPlan && <Promo />}
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
          <p className='text-muted-foreground text-center text-lg mb-6'>
            Spend your points on cool stuff.
          </p>
          <ShopItems
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={hasProPlan}
          />
        </div>
      </FeedWrapper>
    </div>
  )
}

export default Shop
