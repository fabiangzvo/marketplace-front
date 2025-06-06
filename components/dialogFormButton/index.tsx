"use client";

import { JSX } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@heroui/modal";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";

import { type DialogButtonProps } from "./types";

export function DialogFormButton(props: DialogButtonProps): JSX.Element {
  const {
    buttonLabel,
    color,
    variant,
    tooltip,
    title,
    children,
    isOpen,
    onOpen,
    onOpenChange,
  } = props;

  return (
    <>
      <Tooltip content={tooltip} isDisabled={!tooltip}>
        <Button color={color} variant={variant} onPress={onOpen}>
          {buttonLabel}
        </Button>
      </Tooltip>
      <Modal
        backdrop="blur"
        classNames={{ footer: "w-full", body: "w-full", header: "w-full" }}
        isOpen={isOpen}
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
