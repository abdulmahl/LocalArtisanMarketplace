"use client";

import React, { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cartStore";
import { useRouter } from "next/navigation";
import { user } from "@/db/schema";

export function CartButton() {
  const router = useRouter();
  const { count } = useCartStore();

  useEffect(() => {
    // Fetch the initial count when the component mounts
  }, []);

  const handleCartPage = () => {
    // Redirect to the cart page
    router.push("/cart");
  };

  return (
    <div className="relative">
      <span className="absolute z-0 bottom-[1.5rem] font-medium left-[1.5rem] rounded-full">
        {count}
      </span>
      <Button
        onClick={handleCartPage}
        variant={"ghost"}
        title="View Shopping Cart"
        size={"icon"}
        className="rounded-full"
      >
        <ShoppingBag />
      </Button>
    </div>
  );
}
