'use client'

import useHeartsModal from "@/store/use-hearts-modal";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close, open } = useHeartsModal();

  useEffect(() => setIsClient(true), []);

  const onClick = () => {
    close();
    router.push('/store')
  }

  if (!isClient) { return null };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader >
          <div className="flex items-center justify-center mb-5 w-full">
            <Image
              src="/mascot_bad.svg"
              alt="Mascot"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            You run out of hearts!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get pro for unlimited hearts or purchase them in the store.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex flex-col w-full gap-y-4">
            <Button
              variant='primary'
              className="w-full"
              size='lg'
              onClick={onClick}
            >Get unlimited heartss</Button>
            <Button
              variant='primaryOutline'
              className="w-full"
              size='lg'
              onClick={close}
            >No thanks</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default HeartsModal