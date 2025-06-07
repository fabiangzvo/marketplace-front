import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email("Correo inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(16, "La contraseña debe tener un máximo de 16 caracteres")
      .refine(
        (value) => /[A-Z]/.test(value),
        "La contrasela debe contener por lo menos un caracter en mayúscula",
      )
      .refine(
        (value) => /[a-z]/.test(value),
        "La contrasela debe contener por lo menos un caracter en minuscula",
      )
      .refine(
        (value) => /\d/.test(value),
        "La contrasela debe contener por lo menos un número",
      )
      .refine(
        (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
        "La contrasela debe contener por lo menos un caracter en especial",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;

export const SignInSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string(),
});

export type SignInType = z.infer<typeof SignInSchema>;
