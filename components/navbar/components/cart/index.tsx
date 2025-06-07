"use client";

import { Fragment, useMemo, type JSX } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { ShoppingCart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";

import CartItem from "../cardItem";

import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { clearCart } from "@/lib/store/cart";

export function Cart(): JSX.Element {
  const { itemCount, items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const { content, header, footer } = useMemo(() => {
    const header =
      itemCount <= 0 ? (
        <span className="font-bold text-lg flex">
          <ShoppingBag />
          &nbsp; Carrito
        </span>
      ) : (
        <Fragment>
          <span className="font-bold text-lg flex">
            <ShoppingBag />
            &nbsp; Carrito ({itemCount})
          </span>
          {items.length > 0 && (
            <Tooltip content="Vaciar carrito" placement="bottom">
              <Button
                isIconOnly
                color="danger"
                variant="solid"
                onPress={() => dispatch(clearCart())}
              >
                <Trash2 />
              </Button>
            </Tooltip>
          )}
        </Fragment>
      );

    const content =
      itemCount > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Tu carrito está vacío</p>
        </div>
      );

    const footer =
      itemCount > 0 ? (
        <CardFooter className="flex flex-col w-full gap-4">
          <div className="flex justify-between w-full">
            <span className="font-medium text-lg">Total:</span>
            <span className="font-bold text-lg text-default-600">
              ${new Intl.NumberFormat("en-CO").format(total)}
            </span>
          </div>
          <Button
            className="w-full"
            color="primary"
            endContent={<ArrowRight />}
            size="lg"
          >
            Proceder al pago
          </Button>
        </CardFooter>
      ) : null;

    return { header, content, footer };
  }, [itemCount, items, total]);

  return (
    <Popover placement="bottom">
      <Badge
        classNames={{ badge: "dark:text-black" }}
        color="primary"
        content={itemCount}
        placement="bottom-right"
      >
        <PopoverTrigger>
          <Button isIconOnly color="primary" variant="bordered">
            <ShoppingCart />
          </Button>
        </PopoverTrigger>
      </Badge>
      <PopoverContent as={Card} className="min-w-[35vw]">
        <CardHeader className="flex items-center gap-2 w-full justify-between">
          {header}
        </CardHeader>
        <CardBody className="space-y-4">{content}</CardBody>
        {footer}
      </PopoverContent>
    </Popover>
  );
}
