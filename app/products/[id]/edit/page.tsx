import { JSX } from "react";
import { redirect } from "next/navigation";
import { Button } from "@heroui/button";
import Link from "next/link";

import { getProductById, updateProduct } from "@/lib/actions/product";
import { getSession } from "@/lib/session";
import { ProductForm } from "@/components/productForm";

interface ProductEditProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProductEdit({ params }: ProductEditProps): Promise<JSX.Element> {
  const { id } = await params;

  const session = await getSession();
  const product = await getProductById(id);

  if (!product) {
    redirect("/dashboard");
  }

  if (Number(session?.user?.id) !== product?.seller?.id) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="w-full text-3xl md:text-4xl font-bold text-center mb-6 max-lg:flex max-lg:flex-wrap max-lg:justify-center">
          <span className="w-full text-3xl md:text-4xl font-bold mb-4 leading-tight text-center bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent ">
            Edición&nbsp;
          </span>
          de producto
        </h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto text-center">
          No puedes editar este producto ya que no eres el vendedor
        </p>
        <Button as={Link} color="primary" href="/dashboard">
          Regresar
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="w-full text-3xl md:text-4xl font-bold text-center mb-6 max-lg:flex max-lg:flex-wrap max-lg:justify-center">
        <span className="w-full text-3xl md:text-4xl font-bold mb-4 leading-tight text-center bg-gradient-to-r from-primary-500 via-primary-400 to-primary-700 bg-clip-text text-transparent ">
          Editar&nbsp;
        </span>
        producto
      </h1>
      <ProductForm
        buttonLabel="Actualizar producto"
        containerClass="mt-24 max-md:mt-16"
        defaultValues={product}
        handleSubmitForm={updateProduct}
        productId={product.id}
        successMessage="Producto actualizado correctamente"
      />
    </div>
  );
}

export default ProductEdit;
