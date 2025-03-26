import React, { memo } from "react";

import { cn } from "~/libs/utils";

import { Button, ButtonProps } from "../ui/button";

interface MyButtonProps extends ButtonProps {
  customProperty?: string;
  onClick?: () => void;
  myVariant?: "button1" | "button2";
}

const MyButton: React.FC<MyButtonProps> = ({
  customProperty,
  className,
  myVariant = "button2",
  ...props
}) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const variantStyles = {
    button1: "bg-button-1 hover:bg-button-hover",
    button2: "bg-button-2 hover:bg-button-2 hover:opacity-70 hover:text-white",
  };

  const myButtonBaseStyles =
    "xs:py-[25px] xs:px-[48px] text-16 text-text-secondary font-medium";

  return (
    <Button
      variant={"default"}
      className={cn(
        myButtonBaseStyles,
        variantStyles[myVariant],
        className,
        customProperty
      )}
      {...props}
      onClick={handleClick}
    >
      {props.children}
    </Button>
  );
};

export default memo(MyButton);
