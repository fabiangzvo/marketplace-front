import { type JSX } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Library, CircleDollarSign, CircleUser } from "lucide-react";
import { Button } from "@heroui/button";

import { Product } from "@/types/product";

interface ProductCardProps extends Product {}

export function ProductCard(props: ProductCardProps): JSX.Element {
  const { id, name, price, quantity, seller, sku } = props;

  return (
    <Card className="w-full cursor-default px-2 ">
      <CardHeader className="flex justify-between pb-0">
        <span className="text-lg font-semibold text-default-500">{name}</span>
      </CardHeader>
      <CardBody className="w-full pt-2">
        <p className="mb-2 text-sm text-foreground-600">{sku}</p>
        <div className="gap-4 grid grid-cols-2 w-full">
          <p className="flex gap-4">
            <Library className="text-default-500" />
            {quantity} Unidades
          </p>
          <p className="flex gap-4">
            <CircleDollarSign className="text-default-500" />
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            }).format(price)}
          </p>
          <p className="flex gap-4 col-span-full">
            <CircleUser className="text-default-500" />
            {seller.name || seller.email}
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex gap-2 justify-end">
        <Button color="primary">Agregar al carrito</Button>
      </CardFooter>
    </Card>
  );
}
