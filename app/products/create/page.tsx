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

import { createProduct } from "@/lib/actions/product";
import { CreateProductSchema, CreateProductType } from "@/lib/schemas/product";

export default function CreateProductPage(): JSX.Element {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
  });

  const onSubmit = useCallback(
    async (data: CreateProductType) => {
      const result = await createProduct(data, session?.user?.token ?? "");

      if (result) {
        addToast({
          title: "Producto no creado",
          description: result,
          variant: "bordered",
        });
      } else {
        addToast({
          title: "Producto creado",
          description: "El producto se ha creado correctamente",
          variant: "bordered",
        });

        redirect("/dashboard");
      }
    },
    [session?.user],
  );

  return (
    <div>
      <h1 className="w-full text-3xl md:text-4xl font-bold mb-4 leading-tight text-center bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent ">
        MagicLogic
      </h1>
      <p className="text-lg mb-10 max-w-2xl mx-auto text-center">
        Únete como vendedor y haz crecer tu negocio
      </p>
      <Form
        className="space-y-10 w-full flex flex-col items-center"
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
        <Button className="w-1/3 max-md:w-full" type="submit">
          Crear Producto
        </Button>
      </Form>
    </div>
  );
}
