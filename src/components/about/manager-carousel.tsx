import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { Card } from "../ui/card"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/carousel"

interface StatItem {
  name: string
  position: string
}

interface StatCardProps {
  stat: StatItem
}

const teamMembers: StatItem[] = [
    {
      name: "Tom Cruise",
      position: "Founder & Chairman",
    
    },
    {
      name: "Emma Watson",
      position: "Founder & Chairman",
      
    },
    {
      name: "Will Smith",
      position: "Founder & Chairman",
      
    },
      {
      name: "Emma Watson",
      position: "Founder & Chairman",
      
    },
    {
      name: "Will Smith",
      position: "Founder & Chairman",
      
    }
  ]

export function ManagerCarousel() {
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [api, setApi] = React.useState<CarouselApi>();
    const [totalPages, setTotalPages] = React.useState(0);

 React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    
    const updateTotalPages = () => {
      const length = teamMembers.length;

      if(window.innerWidth >= 1024) {
        setTotalPages(length - 2);
      }
      else {
        setTotalPages(length);
      }
    };

    api.on("select", handleSelect);
    updateTotalPages(); 
    window.addEventListener("resize", updateTotalPages); 

    return () => {
      api.off("select", handleSelect);
      window.removeEventListener("resize", updateTotalPages);
    };
  }, [api]);

function StatCard({ stat }: StatCardProps) {
  return (
    <Card
      className={`w-full border-none shadow-none`}
    >
     <div className="relative w-full aspect-square bg-secondary-2">
     <Image
      src="/images/tom.png"
      alt="manager"
      fill
      className="object-contain rounded-md pt-8"
      />
    </div>
      <h3 className="font-inter font-medium text-32">{stat.name}</h3>
      <p className="text-16 font-normal pt-2 pb-4">{stat.position}</p>
      <div className="">
        <div className="flex space-x-4">

              <Link
                href="#"
                className="text-black hover:text-button-2 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-twitter"
                  text-secondary-2
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>

              <Link
                href="#"
                className="text-black hover:text-button-2 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-instagra"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />

                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />

                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>

              <Link
                href="#"
                className="text-black hover:text-button-2 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />

                  <rect width="4" height="12" x="2" y="9" />

                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
      </div>
    </Card>
  )
}

  return (
    <div className="pt-[140px]">
    
    <Carousel setApi={setApi} className="w-full ">
        <CarouselContent className="gap-[30px]">
          {teamMembers.map((stat, index) => (
            <CarouselItem key={index} className="lg:basis-[calc((100%-60px)/3)] sm:basis-[calc((100%-30px)/2)]">
            <StatCard  stat={stat} />
            </CarouselItem>
          ))}
        </CarouselContent>
    </Carousel>

     <div className="flex justify-center my-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeIndex === index ? "bg-button-2" : "bg-gray-300"
            }`}
            onClick={() => {
              setActiveIndex(index);
              api?.scrollTo(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
</div>
  )
}
