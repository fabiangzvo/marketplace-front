import { useCallback, type JSX } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Library, CircleDollarSign, CircleUser } from "lucide-react";
import { Button } from "@heroui/button";

import { useAppDispatch } from "@/hooks/redux";
import { Product } from "@/types/product";
import { addToCart } from "@/lib/store/cart";

interface ProductCardProps extends Product {}

export function ProductCard(props: ProductCardProps): JSX.Element {
  const { id, name, price, quantity, seller, sku } = props;

  const dispatch = useAppDispatch();

  const handleAddToCart = useCallback(() => {
    dispatch(
      addToCart({ id, name, price, seller, sku, storeQuantity: quantity })
    );
  }, [dispatch]);

  return (
    <Card className="w-full cursor-default px-2 ">
      <CardHeader className="flex justify-between pb-0">
        <span className="text-lg font-semibold text-default-500">{name}</span>
      </CardHeader>
      <CardBody className="w-full pt-2">
        <p className="mb-3 text-foreground-600 flex gap-2">
          <span className="font-semibold">SKU:</span>
          {sku}
        </p>
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
        <Button color="primary" onPress={handleAddToCart}>
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
