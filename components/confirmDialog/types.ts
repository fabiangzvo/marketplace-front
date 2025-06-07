import { ReactNode } from "react";
import { ButtonProps } from "@heroui/button";

export interface ConfirmDialogProps {
  tooltip?: string;
  buttonLabel: string | ReactNode;
  confirmLabel: string;
  description: string;
  title: string;
  color: ButtonProps["color"];
  variant: ButtonProps["variant"];
  confirmColor: ButtonProps["color"];
  confirmVariant: ButtonProps["variant"];
  handleConfirm: () => Promise<void> | void;
}
