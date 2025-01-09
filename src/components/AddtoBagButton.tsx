import React from "react";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cartStore";

export default function AddtoBagButton() {
  const { increment } = useCartStore();

  return (
    <Button
      onClick={increment}
      variant="outline"
      className="rounded-lg font-semibold"
    >
      <ShoppingBagIcon />
      <p>Add to Bag</p>
    </Button>
  );
}
