import { JSX, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PenLine, Trash2 } from "lucide-react";
import { addToast, ToastProps } from "@heroui/toast";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import Link from "next/link";

import { type ActionProps } from "./types";

import { deleteProduct } from "@/lib/actions/product";
import ConfirmDialog from "@/components/confirmDialog";

function Actions(props: ActionProps): JSX.Element {
  const { productId, name, refreshData } = props;

  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = useCallback(async () => {
    const notification: Partial<ToastProps> = {
      title: "Eliminar producto",
      description: `${name} ha sido eliminado correctamente`,
      variant: "bordered",
      color: "success",
    };

    try {
      const isRemoved = await deleteProduct(
        productId,
        session?.user.token ?? "",
      );

      if (!isRemoved) {
        notification.description =
          "No se encontró el producto que estás tratando de eliminar.";
        notification.color = "warning";
      }
    } catch (e) {
      console.error(e);

      notification.description =
        "Ha ocurrido un error y no se ha podido eliminar el producto.";
      notification.color = "danger";
    }

    refreshData();
    router.refresh();

    addToast(notification);
  }, [refreshData, router, name, productId, session?.user.token]);

  return (
    <div className="flex items-center gap-2">
      <Tooltip content="Editar">
        <Button
          isIconOnly
          as={Link}
          color="warning"
          href={`/products/${productId}/edit`}
          variant="light"
        >
          <PenLine size={20} />
        </Button>
      </Tooltip>
      <ConfirmDialog
        buttonLabel={<Trash2 size={20} />}
        color="danger"
        confirmColor="danger"
        confirmLabel="Eliminar"
        confirmVariant="solid"
        description="¿Estás seguro de que deseas eliminar este producto?"
        handleConfirm={handleDelete}
        title={name}
        tooltip="Eliminar"
        variant="light"
      />
    </div>
  );
}

export default Actions;
