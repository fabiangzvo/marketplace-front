import { PropsWithChildren, ReactNode } from "react";
import { ButtonProps } from "@heroui/button";

export interface DialogButtonProps extends PropsWithChildren {
  tooltip?: string;
  buttonLabel: string | ReactNode;
  title?: string;
  color: ButtonProps["color"];
  variant: ButtonProps["variant"];
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}
