import React, { ReactNode } from "react";

interface EmptyLayoutProps {
  children: ReactNode;
  [key: string]: any;
}

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  return <>{children}</>;
};

export default EmptyLayout;
