"use client";

import { type JSX, useActionState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";

import { DialogFormButton } from "../dialogFormButton";
import { type SignInButtonProps } from "./types";

import { PasswordInput } from "@/components/passwordInput";
import { handleSubmit } from "@/lib/actions/authentication";

export function SignInButton({
  isOpen,
  onOpen,
  onOpenChange,
  onSwitchModal,
}: SignInButtonProps): JSX.Element {
  const [error, onSubmitForm, isLoading] = useActionState(handleSubmit, "");

  return (
    <DialogFormButton
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
      <Form action={onSubmitForm}>
        <Input
          isRequired
          classNames={{
            inputWrapper: "dark:border-default-500",
            base: "my-10",
          }}
          disabled={isLoading}
          errorMessage="Completa este campo"
          label="Correo electrónico"
          labelPlacement="outside"
          name="email"
          placeholder="tu@email.com"
          type="email"
          variant="bordered"
        />
        <PasswordInput disabled={isLoading} classNames={{ base: "mt-10" }} />
        <p className="text-red-500 font-semibold text-center w-full text-lg h-5 my-4">
          {error}
        </p>
        <Button
          className="w-full mb-4"
          color="primary"
          isLoading={isLoading}
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
