"use client";

import { type JSX, useCallback } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/toast";

import { DialogFormButton } from "../dialogFormButton";

import { type SignInButtonProps } from "./types";

import { PasswordInput } from "@/components/passwordInput";
import { handleSignIn } from "@/lib/actions/authentication";
import { SignInSchema, SignInType } from "@/lib/schemas/user";

export function SignInButton({
  isOpen,
  onOpen,
  onOpenChange,
  onSwitchModal,
}: SignInButtonProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = useCallback(
    async (data: SignInType) => {
      const message = await handleSignIn(data);

      addToast({
        title: "Ingreso de cuenta",
        description: message,
        variant: "bordered",
        color: "danger",
      });
    },
    [handleSignIn],
  );

  return (
    <DialogFormButton
      buttonClass="max-sm:w-full"
      buttonLabel="Iniciar sesión"
      color="primary"
      isOpen={isOpen}
      variant="flat"
      onOpen={onOpen}
      onOpenChange={onOpenChange}
    >
      <h1 className="w-full text-3xl md:text-4xl font-bold mb-4 leading-tight text-center bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent ">
        MagicLogic
      </h1>
      <p className="text-lg mb-10 max-w-2xl mx-auto text-center">
        Inicia sesión para vender y gestionar tus productos
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          isRequired
          classNames={{
            inputWrapper: "dark:border-default-500",
            base: "my-10",
          }}
          disabled={isLoading}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email?.message}
          label="Correo electrónico"
          labelPlacement="outside"
          placeholder="tu@email.com"
          type="email"
          variant="bordered"
          {...register("email")}
        />
        <PasswordInput
          classNames={{ base: "mt-10 mb-8" }}
          disabled={isLoading}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password?.message}
          {...register("password")}
        />
        <Button
          className="w-full mb-4"
          color="primary"
          isLoading={isLoading || isSubmitting}
          type="submit"
        >
          Ingresar
        </Button>
      </Form>
      <p className="flex w-full justify-center flex-col items-center mb-6">
        ¿Aún no estás registrado?&nbsp;
        <Button
          className="font-bold text-lg data-[hover=true]:bg-transparent"
          color="primary"
          variant="light"
          onPress={onSwitchModal}
        >
          Crear cuenta
        </Button>
      </p>
    </DialogFormButton>
  );
}
