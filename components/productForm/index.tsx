"use client";

import { JSX, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

import { ProductFormProps } from "./types";

import { CreateProductSchema, CreateProductType } from "@/lib/schemas/product";

export function ProductForm({
  defaultValues,
  containerClass,
  buttonLabel = "Crear Producto",
  handleSubmitForm,
  productId,
  successMessage,
}: ProductFormProps): JSX.Element {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: CreateProductType) => {
      const result = await handleSubmitForm({
        formData: data,
        token: session?.user?.token ?? "",
        productId,
      });

      if (!result) {
        addToast({
          title: "Producto creado",
          description: successMessage,
          variant: "bordered",
          color: "success",
        });

        redirect("/dashboard");
      }

      addToast({
        title: "Producto no creado",
        description: result,
        variant: "bordered",
        color: "danger",
      });
    },
    [session?.user, handleSubmitForm, productId, successMessage],
  );

  return (
    <Form
      className={twMerge(
        "space-y-10 w-full flex flex-col items-center",
        containerClass,
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 w-full">
        <Input
          classNames={{ inputWrapper: "dark:border-default-500" }}
          disabled={isLoading || isSubmitting}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name?.message}
          label="Nombre"
          labelPlacement="outside"
          placeholder="Cámara de video"
          type="text"
          variant="bordered"
          {...register("name")}
        />
        <Input
          classNames={{ inputWrapper: "dark:border-default-500" }}
          disabled={isLoading || isSubmitting}
          errorMessage={errors.sku?.message}
          isInvalid={!!errors.sku?.message}
          label="SKU"
          labelPlacement="outside"
          placeholder="CAM-001"
          type="text"
          variant="bordered"
          {...register("sku")}
        />
        <Input
          classNames={{ inputWrapper: "dark:border-default-500" }}
          disabled={isLoading || isSubmitting}
          errorMessage={errors.price?.message}
          isInvalid={!!errors.price?.message}
          label="Precio"
          labelPlacement="outside"
          placeholder="100.000"
          variant="bordered"
          {...register("price", { valueAsNumber: true })}
        />
        <Input
          classNames={{ inputWrapper: "dark:border-default-500" }}
          disabled={isLoading || isSubmitting}
          errorMessage={errors.quantity?.message}
          isInvalid={!!errors.quantity?.message}
          label="Cantidad"
          labelPlacement="outside"
          placeholder="25"
          type="number"
          variant="bordered"
          {...register("quantity", { valueAsNumber: true })}
        />
      </div>
      <Button className="w-1/3 max-md:w-full" color="primary" type="submit">
        {buttonLabel}
      </Button>
    </Form>
  );
}
