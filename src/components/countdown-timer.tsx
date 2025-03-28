import { memo, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import { cn } from "~/libs/utils";

interface CountTimerProps {
  variant?: "default" | "circular";
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default memo(function CountTimer({
  variant = "default",
  targetDate,
  className,
}: CountTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { t } = useTranslation("common");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

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

            <span className="text-12 font-normal capitalize">
              {t(
                `common.${key}` as
                  | "common.days"
                  | "common.hours"
                  | "common.minutes"
                  | "common.seconds"
              )}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center pb-[60px] xs:p-0", className)}>
      <div className="relative flex flex-col items-center">
        <span className="absolute top-[-15px] text-sm font-medium">
          {t("common.days")}
        </span>

        <span className="font-inter text-16 font-bold md:text-32">
          {timeLeft.days.toString().padStart(2, "0")}
        </span>
      </div>

      <span className="self-end px-3 font-inter text-16 font-bold text-button-2 sm:px-5 md:text-32">
        :
      </span>

      <div className="relative flex flex-col items-center text-left">
        <span className="l-0 absolute top-[-15px] text-sm font-medium">
          {t("common.hours")}
        </span>

        <span className="font-inter text-16 font-bold md:text-32">
          {timeLeft.hours.toString().padStart(2, "0")}
        </span>
      </div>

      <span className="self-end pl-3 font-inter text-16 font-bold text-button-2 sm:px-5 md:text-32">
        :
      </span>

      <div className="relative flex min-w-[44px] flex-col items-center text-left">
        <span className="l-0 absolute top-[-15px] text-sm font-medium">
          {t("common.minutes")}
        </span>

        <span className="font-inter text-16 font-bold md:text-32">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </span>
      </div>

      <span className="self-end font-inter text-16 font-bold text-button-2 sm:px-5 md:text-32">
        :
      </span>

      <div className="relative flex min-w-[44px] flex-col items-center text-left">
        <span className="l-0 absolute top-[-15px] text-sm font-medium">
          {t("common.seconds")}
        </span>

        <span className="font-inter text-16 font-bold md:text-32">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
});
