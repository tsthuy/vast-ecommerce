import React, { memo } from "react";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  console.log("Container");
  const containerStyles = `
    mx-auto
    max-w-[1186px]
    px-4
    ${className || ""}
  `;

  return (
    <div className={containerStyles} {...props}>
      {children}
    </div>
  );
};

export default memo(Container);
