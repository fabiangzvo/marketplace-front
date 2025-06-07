import { JSX } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from "@heroui/modal";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";

import { ConfirmDialogProps } from "./types";

export default function ConfirmDialog(props: ConfirmDialogProps): JSX.Element {
  const {
    buttonLabel,
    color,
    variant,
    confirmLabel,
    confirmColor,
    confirmVariant,
    description,
    tooltip,
    handleConfirm,
    title,
  } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content={tooltip}>
        <Button isIconOnly color={color} variant={variant} onPress={onOpen}>
          {buttonLabel}
        </Button>
      </Tooltip>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{title}</ModalHeader>
              <ModalBody>
                <p>{description}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color={confirmColor}
                  variant={confirmVariant}
                  onPress={async () => {
                    await handleConfirm();
                    onClose();
                  }}
                >
                  {confirmLabel}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
