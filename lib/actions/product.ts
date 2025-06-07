import { CreateProductType } from "../schemas/product";

export async function createProduct(
  formData: CreateProductType,
  token: string,
): Promise<string> {
  const response = await fetch("http://localhost:4000/products", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) return "";

  const error = await response.json();

  console.error(error);

  return "No se pudo crear el producto.";
}
