"use client";

import { useCallback } from "react";
import { Button } from "@heroui/button";
import { Trash2, Plus, Minus } from "lucide-react";

import { removeFromCart, updateQuantity } from "@/lib/store/cart";
import { Product } from "@/types/product";
import { useAppDispatch } from "@/hooks/redux";

interface CartItemProps {
  item: Product;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleRemove = useCallback(() => {
    dispatch(removeFromCart(item.id));
  }, [dispatch, item.id]);

  const handleIncrement = useCallback(() => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  }, [dispatch, item.id, item.quantity]);

  const handleDecrement = useCallback(() => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  }, [dispatch, item.id, item.quantity]);

  return (
    <div className="flex items-center gap-2 px-3 py-4 border rounded-lg">
      <div className="flex min-w-0 w-full justify-between items-center max-md:flex-col gap-4">
        <div className="flex flex-col">
          <h4 className="font-medium text-sm truncate max-md:text-center text-wrap">
            {item.name}
          </h4>
          <p className="text-default-600 text-sm font-bold max-md:text-center">
            ${new Intl.NumberFormat("en-CO").format(item.price)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            color="primary"
            size="sm"
            variant="flat"
            onPress={handleDecrement}
          >
            <Minus className="w-5 h-5" />
          </Button>
          <span className="text-xs font-medium w-5 text-center">
            {item.quantity}
          </span>
          <Button
            isIconOnly
            color="primary"
            size="sm"
            variant="flat"
            onPress={handleIncrement}
          >
            <Plus className="w-5 h-5" />
          </Button>
          <Button
            isIconOnly
            color="danger"
            size="sm"
            variant="light"
            onPress={handleRemove}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
