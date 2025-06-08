import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import { RegisterUserType, SignInType } from "../schemas/user";

import axios from "@/lib/axios";

export async function handleSignIn(formData: SignInType): Promise<string> {
  const response = await signIn("credentials", {
    email: formData.email,
    password: formData.password,
    callbackUrl: "/dashboard",
    redirect: false,
  });

  if (response?.status === 200) redirect("/dashboard");

  if (response?.status === 401) return "Credenciales inválidas";

  return "No se pudo iniciar sesión";
}

export async function registerUser(
  formData: RegisterUserType,
): Promise<string | undefined> {
  const data: Omit<RegisterUserType, "confirmPassword"> = {
    password: formData.password,
    email: formData.email,
  };

  if (formData.name) data.name = formData.name;

  const response = await axios.post("/auth/register", data);

  if (response.status === 201) return "";

  if (response.status === 409) return "El correo electrónico ya está en uso.";

  return "No se ha podido crear el usuario.";
}
