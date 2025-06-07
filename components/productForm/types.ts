import { CreateProductType } from "@/lib/schemas/product";
import { ProductEvent } from "@/types/product";

export interface ProductFormProps {
  successMessage: string;
  defaultValues?: Partial<CreateProductType>;
  containerClass?: string;
  buttonLabel?: string;
  productId?: string;
  handleSubmitForm: (data: ProductEvent) => Promise<string>;
}
