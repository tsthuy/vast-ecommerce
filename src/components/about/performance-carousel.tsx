import * as React from "react";
import { useTranslation } from "next-i18next";
import { DollarSign, ShoppingBag, Store, Wallet } from "lucide-react";

import { Card } from "../ui/card";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface StatCardProps {
  stat: StatItem;
}

export const PerformancesCarousel = React.memo(function PerformancesCarousel() {
  const { t } = useTranslation("common");
  const stats: StatItem[] = [
    {
      icon: <Store className="h-8 w-8 text-white" />,
      value: "10.5k",
      label: `${t("about.sallers_active")}`,
    },
    {
      icon: <DollarSign className="h-8 w-8 text-white" />,
      value: "33k",
      label: `${t("about.monthly_profit")}`,
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-white" />,
      value: "45.5k",
      label: `${t("about.customer_active")}`,
    },
    {
      icon: <Wallet className="h-8 w-8 text-white" />,
      value: "25k",
      label: `${t("about.annual_gross")}`,
    },
  ];

  function StatCard({ stat }: StatCardProps) {
    return (
      <Card
        className={`flex w-[80%] cursor-pointer flex-col items-center justify-center rounded py-[30px] text-black hover:bg-button-2 hover:text-white sm:w-[calc((100%-30px)/2)] lg:w-[calc((100%-90px)/4)] [&>div>svg]:hover:text-black [&>div]:hover:border-[#e67c7c] [&>div]:hover:bg-white`}
      >
        <div
          className={`mb-4 rounded-full border-[12px] border-gray-300 bg-black p-4`}
        >
          {stat.icon}
        </div>

        <h2 className={`mb-2 font-inter text-32 font-bold`}>{stat.value}</h2>

        <p className={`text-center text-16 font-normal`}>{stat.label}</p>
      </Card>
    );
  }

  return (
    <>
      <div className="flex w-full flex-wrap justify-center gap-[30px] md:justify-normal">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
    </>
  );
});
