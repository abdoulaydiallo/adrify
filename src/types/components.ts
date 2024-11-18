import { ReactNode } from "react";
import { IconProps } from "@phosphor-icons/react";

export interface SidebarProps {
  mobile?: boolean;
}

export interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export interface SidebarSectionProps {
    title: string;
    children: ReactNode;
}

export interface SidebarItemProps {
    icon: React.ComponentType<IconProps>;
    label: string;
    href: string;
    isActive: boolean;
}

export interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export interface ActionCardProps {
  title: string;
  description: string;
  color: string;
  action: string;
  icon: React.ReactNode;
}

export interface HeadingProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

