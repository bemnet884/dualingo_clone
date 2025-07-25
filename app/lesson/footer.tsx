import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle } from "lucide-react"
import { useKey, useMedia } from "react-use"

type Props = {
  disabled?: boolean,
  status: "correct" | "wrong" | "none" | "completed",
  onCheck: () => void,
  lessonId?: number
}
const Footer = ({
  disabled,
  status,
  onCheck,
  lessonId
}: Props) => {

  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-w-[1024px])");


  return (
    <footer className={cn(
      "lg:-h-[140px] h-[100px] border-t-2",
      status === "correct" && "border-transparent bg-green-100",
      status === "wrong" && "border-transparent bg-rose-100",
    )}>
      <div
        className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10"
      >
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center"
          >
            <CheckCircle className="w-6 h-6 lg:w-10 lg:h-10 mr-4" />
            Nicely Done!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center"
          >
            <XCircle className="w-6 h-6 lg:w-10 lg:h-10 mr-4" />
            Try Again!
          </div>
        )}
        {status === "completed" && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            onClick={() => window.location.href = `/lesson/${lessonId}`}
          >
            Practice Again
          </Button>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  )
}

export default Footer