import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"

import { cn } from "~/libs/utils"

interface CountTimerProps {
  variant?: "default" | "circular"
  targetDate: Date
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountTimer({
  variant = "default",
  targetDate,
  className,
}: CountTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const { t } = useTranslation("common")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (variant === "circular") {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-4 text-white",
          className
        )}
      >
        {Object.entries(timeLeft).map(([key, value]) => (
          <div
            key={key}
            className="flex size-[55px] flex-col items-center justify-center rounded-full bg-secondary-2 text-black hover:bg-button-1 hover:text-white xss:size-[62px]"
          >
            <span className="text-16 font-semibold">
              {value.toString().padStart(2, "0")}
            </span>

            <span className="text-12 font-normal capitalize">{t(key)}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center xs:p-0 pb-[60px]", className)}>
      <div className="relative flex flex-col items-center ">
        <span className="absolute top-[-15px] text-sm font-medium">
          {t("days")}
        </span>

        <span className="font-inter text-16 font-bold md:text-32">
          {timeLeft.days.toString().padStart(2, "0")}
        </span>
      </div>

      <span className="self-end px-5 font-inter text-16 font-bold text-button-2 md:text-32">
        :
      </span>

      <div className="relative flex flex-col items-center text-left">
        <span className="l-0 absolute top-[-15px] text-sm font-medium">
          {t("hours")}
        </span>

        <span className="font-inter text-16 font-bold md:text-32">
          {timeLeft.hours.toString().padStart(2, "0")}
        </span>
      </div>

      <span className="self-end px-5 font-inter text-16 font-bold text-button-2 md:text-32">
        :
      </span>

      <div className="relative flex flex-col items-center text-left min-w-[44px]">
        <span className="l-0 absolute top-[-15px] text-sm font-medium">
          {t("minutes")}
        </span>

        <span className="font-inter text-16 font-bold md:text-32">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </span>
      </div>

      <span className="self-end px-5 font-inter text-16 font-bold text-button-2 md:text-32">
        :
      </span>

      <div className="relative flex flex-col items-center text-left min-w-[44px]">
        <span className="l-0 absolute top-[-15px] text-sm font-medium">
          {t("seconds")}
        </span>

        <span className="font-inter text-16 font-bold md:text-32">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}
