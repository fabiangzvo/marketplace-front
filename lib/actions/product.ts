"use server";

import { Product, ProductEvent } from "@/types/product";

export async function createProduct({
  formData,
  token,
}: ProductEvent): Promise<string> {
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

export async function deleteProduct(
  productId: string,
  token: string,
): Promise<boolean> {
  const response = await fetch(`http://localhost:4000/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) return true;

  const error = await response.json();

  console.error(error);

  return false;
}

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  const response = await fetch(`http://localhost:4000/products/${productId}`, {
    method: "GET",
  });

  if (response.ok) return await response.json();

  const error = await response.json();

  console.error(error);

  return null;
}

export async function updateProduct({
  productId,
  formData,
  token,
}: ProductEvent): Promise<string> {
  if (!productId) return "No se encontro el producto.";

  const response = await fetch(`http://localhost:4000/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) return "";

  const error = await response.json();

  console.error(error);

  return "No se pudo actualizar el producto.";
}
