"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function CartPage() {
  // const [loading, setLoading] = useState(false);
  // const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <Header lgTitle={"Your Cart"} smTitle={"Cart"} />
      <p className="mt-[5rem] p-5 text-xl">Your Cart</p>
    </div>
  );
}
