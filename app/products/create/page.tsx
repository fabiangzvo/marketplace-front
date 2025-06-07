import { JSX } from "react";

import { createProduct } from "@/lib/actions/product";
import { ProductForm } from "@/components/productForm";

export default function CreateProductPage(): JSX.Element {
  return (
    <div>
      <h1 className="w-full text-3xl md:text-4xl font-bold mb-4 leading-tight text-center bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent ">
        MagicLogic
      </h1>
      <p className="text-lg mb-10 max-w-2xl mx-auto text-center">
        Únete como vendedor y haz crecer tu negocio
      </p>
      <ProductForm
        buttonLabel="Crear Producto"
        containerClass="mt-24 max-md:mt-16"
        handleSubmitForm={createProduct}
        successMessage="Producto creado correctamente"
      />
    </div>
  );
}
