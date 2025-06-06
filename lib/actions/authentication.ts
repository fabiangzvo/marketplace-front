"use server";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { RegisterUserType } from "../schemas/user";

export async function handleSubmit(
  _: string,
  formData: FormData
): Promise<string> {
  if (!formData.get("email") && !formData.get("password")) return "";

  const response = await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    callbackUrl: "/dashboard",
    redirect: false,
  });

  if (response?.status === 200) redirect("/dashboard");
  if (response?.status === 401) return "Credenciales inválidas";

  return "No se pudo iniciar sesión";
}

export async function registerUser(
  formData: RegisterUserType
): Promise<string | undefined> {
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

  if (res.ok) return;

  const error = await res.json();
  console.error(error);

  if (error.statusCode === 409) return "El correo electrónico ya está en uso.";

  return "No se ha podido crear el usuario.";
}
