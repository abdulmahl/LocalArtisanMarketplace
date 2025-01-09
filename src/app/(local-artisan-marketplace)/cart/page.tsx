"use client";

import React from "react";
import Header from "@/components/Header";

export default function CartPage() {
  return (
    <div>
      <Header lgTitle={"Your Cart"} smTitle={"Cart"} />
      <p className="mt-[5rem] p-5 text-xl">Your Cart</p>
    </div>
  );
}
