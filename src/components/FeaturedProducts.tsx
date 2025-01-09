"use client";

import React, { useEffect, useState } from "react";
// import Image from "next/image";
import Header from "./Header";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddtoBagButton from "./AddtoBagButton";
import { SkeletonCard } from "@/components/SkeletonCard";

type Product = {
  productName: string;
  productDescription: string;
  productPrice: string;
  productImage: string;
  firstName: string;
};

export default function FeaturedProducts() {
  const [productData, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-featured-products", {
          method: "GET",
        });

        if (response.ok) {
          const products = await response.json();
          // console.log(products);
          setProducts(products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="h-screen">
      <Header lgTitle="Featured Products" smTitle="Featured" />

      <div
        className="grid p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        gap-4 pt-[6rem]"
      >
        {loading &&
          Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)}

        {productData.map((product: Product, index: number) => {
          const { productName, productDescription, productPrice } = product;
          return (
            <div
              key={index}
              className="flex flex-col justify-between items-center p-5 border-[0.5px] shadow-lg rounded-lg"
            >
              <Popover>
                <PopoverTrigger>
                  <h3 className="text-xl font-semibold mb-4 text-nowrap">
                    {productName}
                  </h3>
                </PopoverTrigger>
                <PopoverContent>{productDescription}</PopoverContent>
              </Popover>

              {/* <Image
                src={productImage}
                alt="Products Display"
                width={100}
                height={100}
              /> */}
              <p className="m-0 text-center">{productDescription || ""}</p>
              <div className="flex flex-col items-center justify-between mt-10">
                <p>R{productPrice}</p>
                <AddtoBagButton />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
