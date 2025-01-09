"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "./Header";
import CTAButton from "./CTAButton";

type Categories = {
  name: string;
  imageUrl: string;
};

export default function SplashPage() {
  const [categoryData, setCategoryData] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch("/api/get-categories", {
          method: "GET",
        });

        if (response.ok) {
          const categories = await response.json();
          // console.log(categories);
          setCategoryData(categories);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <>
      <section className="h-screen">
        <Header lgTitle="Local Artisan Marketplace" smTitle="Marketplace" />
        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 pt-[5rem]">
              {categoryData.map((category: Categories) => {
                const { name, imageUrl } = category;
                const fixedName = name.includes("Featured")
                  ? name.replace("Featured ", "featured-")
                  : name;

                return (
                  <Link
                    href={`/${fixedName.toLowerCase()}`}
                    key={fixedName}
                    className={`flex flex-col p-5 border-[0.5px] border-l-0 border-t-0 transition-colors ease-out duration-300`}
                  >
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <div
                      className="w-full h-[7rem] bg-cover bg-center"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    >
                      <div className="flex flex-col items-center justify-between mt-10"></div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <CTAButton />
          </div>
        )}
      </section>
    </>
  );
}
