import { memo } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { LogOut, Package, Star, UserRoundPen, XCircle } from "lucide-react";

import { cn } from "~/libs/utils";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface DropDownHeaderProps {
  isInAccountPage: boolean;
  handleLogout: () => void;
}

const DropDownHeader = ({
  isInAccountPage,
  handleLogout,
}: DropDownHeaderProps) => {
  console.log("dropdowen re-rendered");
  const { t } = useTranslation("common");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            isInAccountPage &&
              "rounded-full bg-button-2 text-white hover:border-2 hover:border-black hover:bg-button-2",
            "flex items-center justify-center [&_svg]:size-6",
            !isInAccountPage && "text-black hover:bg-gray-200"
          )}
        >
          <UserRoundPen className="size-8" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="max-w-64 space-y-2 border-none bg-transparent/50 pb-[10px] pl-[20px] pr-[12px] pt-[18px] text-white backdrop-blur-3xl"
      >
        <Link href={"/account"} className="text-14 font-normal">
          <DropdownMenuItem className="flex cursor-pointer items-center gap-4">
            <button>
              <UserRoundPen className="size-6" />
            </button>

            {t("common.manage_my_account")}
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="flex cursor-pointer items-center gap-4">
          <button>
            <Package className="size-6" />
          </button>

          <Link href={""} className="text-14 font-normal">
            {t("common.my_order")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer items-center gap-4">
          <button>
            <XCircle className="size-6" />
          </button>

          <Link href={""} className="text-14 font-normal">
            {t("common.my_cancellation")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer items-center gap-4">
          <button>
            <Star className="size-6" />
          </button>

          <Link href={""} className="text-14 font-normal">
            {t("common.my_reviews")}
          </Link>
        </DropdownMenuItem>

        <Link
          href={""}
          className="mt-2 block text-14 font-normal"
          onClick={handleLogout}
        >
          <DropdownMenuItem className="flex cursor-pointer items-center gap-4">
            <button>
              <LogOut className="size-6" />
            </button>

            {t("common.logout")}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(DropDownHeader);
