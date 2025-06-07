import { JSX } from "react";

import { title } from "@/components/primitives";
import { ProductList } from "@/components/productList";

export default async function Home(): Promise<JSX.Element> {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full text-3xl md:text-4xl font-bold text-center mb-6 max-lg:flex max-lg:flex-wrap max-lg:justify-center">
        <span className={title()}>Explorar&nbsp;</span>
        <span className={title({ color: "blue" })}>productos&nbsp;</span>
      </div>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto text-center">
        Explora entre los cientos de productos que ofrecemos. Encuentra eso que
        necesitas y no sabes que buscas.
      </p>
      <ProductList />
    </section>
  );
}
