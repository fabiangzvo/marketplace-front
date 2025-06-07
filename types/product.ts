import { User } from "./user";

import { CreateProductType } from "@/lib/schemas/product";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  seller: User;
}

export interface ProductEvent {
  productId?: string;
  formData: CreateProductType;
  token: string;
}
