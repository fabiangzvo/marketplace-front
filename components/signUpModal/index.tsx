"use client";

import { JSX, useCallback } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/toast";
import { Form } from "@heroui/form";

import { DialogFormButton } from "../dialogFormButton";
import { PasswordInput } from "../passwordInput";

import { type RegisterUserType, RegisterUserSchema } from "@/lib/schemas/user";

export interface SignUpButtonProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onSwitchModal: () => void;
}

export function SignUpButton({
  isOpen,
  onOpen,
  onOpenChange,
  onSwitchModal,
}: SignUpButtonProps): JSX.Element {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<RegisterUserType>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = useCallback(
    async (formData: RegisterUserType) => {
      const data: Omit<RegisterUserType, "confirmPassword"> = {
        password: formData.password,
        email: formData.email,
      };

      if (formData.name) data.name = formData.name;

      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.json();
        let description = "No se ha podido crear el usuario.";

        if (error.statusCode === 409)
          description = "El correo electrónico ya está en uso.";

        console.error(error);
        addToast({
          title: "Usuario no creado",
          description,
          variant: "bordered",
          color: "danger",
        });

        return;
      }

      addToast({
        title: "Usuario creado!",
        description: "Ahora puedes iniciar sesión.",
        variant: "bordered",
        color: "success",
      });
    },
    [router]
  );

  return (
    <DialogFormButton
      buttonLabel="Registrarse"
      color="primary"
      isOpen={isOpen}
      variant="solid"
      onOpen={onOpen}
      onOpenChange={onOpenChange}
    >
      <h1 className="w-full text-3xl md:text-4xl font-bold mb-4 leading-tight text-center bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent ">
        MagicLogic
      </h1>
      <p className="text-lg mb-10 max-w-2xl mx-auto text-center">
        Únete como vendedor y haz crecer tu negocio
      </p>
      <Form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <Input
          classNames={{ inputWrapper: "dark:border-default-500" }}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name?.message}
          label="Nombre completo"
          labelPlacement="outside"
          placeholder="John Doe"
          type="text"
          variant="bordered"
          {...register("name")}
        />
        <Input
          isRequired
          classNames={{ inputWrapper: "dark:border-default-500" }}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email?.message}
          label="Email"
          labelPlacement="outside"
          placeholder="tu@email.com"
          type="email"
          variant="bordered"
          {...register("email")}
        />
        <PasswordInput
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password?.message}
          {...register("password")}
        />
        <PasswordInput
          errorMessage={errors.confirmPassword?.message}
          isInvalid={!!errors.confirmPassword?.message}
          label="Confirmar contraseña"
          {...register("confirmPassword")}
        />
        <Button
          className="w-full mt-10 mb-4"
          color="primary"
          isLoading={isLoading}
          type="submit"
        >
          Crear Cuenta
        </Button>
      </Form>
      <p className="flex w-full justify-center flex-col items-center mb-6">
        ¿Ya estás registrado?&nbsp;
        <Button
          className="font-bold text-lg data-[hover=true]:bg-transparent"
          color="primary"
          variant="light"
          onPress={onSwitchModal}
        >
          Iniciar sesión
        </Button>
      </p>
    </DialogFormButton>
  );
}
