import * as React from "react"
import { DollarSign, ShoppingBag, Store, Wallet } from "lucide-react"

import { Card } from "../ui/card"

interface StatItem {
  icon: React.ReactNode
  value: string
  label: string
}

interface StatCardProps {
  stat: StatItem
}

export function PerformancesCarousel() {
   const stats: StatItem[] = [
    {
      icon: <Store className="h-8 w-8 text-white" />,
      value: "10.5k",
      label: "Sallers active our site",
    
    },
    {
      icon: <DollarSign className="h-8 w-8 text-white" />,
      value: "33k",
      label: "Mopnthly Produduct Sale",
      
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-white" />,
      value: "45.5k",
      label: "Customer active in our site",
      
    },
    {
      icon: <Wallet className="h-8 w-8 text-white" />,
      value: "25k",
      label: "Anual gross sale in our site",
      
    }
  ]

function StatCard({ stat }: StatCardProps) {
  return (
    <Card
      className={`rounded flex flex-col items-center justify-center lg:w-[calc((100%-90px)/4)]  w-[80%] sm:w-[calc((100%-30px)/2)] py-[30px] text-black hover:bg-button-2  [&>div]:hover:border-[#e67c7c] hover:text-white [&>div]:hover:bg-white [&>div>svg]:hover:text-black`}
    >
      <div className={`bg-black p-4 border-[12px]  border-gray-300 rounded-full mb-4`}>{stat.icon}</div>
      <h2 className={`text-32 font-inter font-bold mb-2`}>{stat.value}</h2>
      <p className={`text-center text-16 font-normal`}>{stat.label}</p>
    </Card>
  )
}

  return (
    <>
    <div className="flex w-full gap-[30px] flex-wrap md:justify-normal justify-center">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
    </div>
</>
  )
}
