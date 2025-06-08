"use server";

import axios from "../axios";

import { Product, ProductEvent } from "@/types/product";

export async function createProduct({
  formData,
  token,
}: ProductEvent): Promise<string> {
  const response = await axios.post("/products", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 201) return "";

  if (response.status === 409) return "El SKU ya existe, prueba uno diferente";

  return "No se pudo crear el producto.";
}

export async function deleteProduct(
  productId: string,
  token: string,
): Promise<boolean> {
  const response = await axios.delete(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 204) return true;

  console.error(response);

  return false;
}

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  const response = await axios.get(`/products/${productId}`);

  if (response.status === 200) return response.data;

  console.error(response);

  return null;
}

export async function updateProduct({
  productId,
  formData,
  token,
}: ProductEvent): Promise<string> {
  if (!productId) return "No se encontro el producto.";

  const response = await axios.put(`/products/${productId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) return "";

  console.error(response);

  if (response.status === 403)
    return "No tienes permiso para actualizar el producto.";

  if (response.status === 404) return "No se encontro el producto.";

  return "No se pudo actualizar el producto.";
}
