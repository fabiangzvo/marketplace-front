import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
  price: z.number().min(1, "El precio debe ser mayor a 0"),
  sku: z
    .string()
    .min(3, "El SKU debe tener al menos 3 caracteres")
    .refine(
      (value) => /^[A-Z0-9-_]+$/.test(value),
      "debe contener solo letras mayúsculas, números, guiones y guiones bajos.",
    ),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;
