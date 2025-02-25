import { ArrowLeft, ArrowRight } from "lucide-react"

interface PaginatorProps {
  onPrevious: () => void
  onNext: () => void
}

export default function Paginator({ onPrevious, onNext }: PaginatorProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onPrevious}
        className="flex size-[46px] items-center justify-center rounded-full border bg-secondary-2 hover:bg-button-hover"
      >
        <ArrowLeft className="size-5" />
      </button>

      <button
        onClick={onNext}
        className="flex size-[46px] items-center justify-center rounded-full border bg-secondary-2 hover:bg-button-hover"
      >
        <ArrowRight className="size-5" />
      </button>
    </div>
  )
}
