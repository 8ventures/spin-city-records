import { cn } from "~/utils/cn"

type SpinnerProps = {
  className?: string
}

export default function Skeleton({className}: SpinnerProps) {

  return (
    <div role="status">
      <div className={cn("h-full w-full animate-pulse rounded-xl border border-[#333333]", className,)}></div>
    </div>
  )
}
