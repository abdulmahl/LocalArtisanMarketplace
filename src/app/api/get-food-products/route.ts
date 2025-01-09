import { NextResponse } from "next/server";
import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const foodCategoryId = 3;

    const foodProducts = await db
      .select()
      .from(product)
      .where(eq(product.categoryId, foodCategoryId)); // Ensure categoryId is correct

    if (!foodProducts.length) {
      console.log("No products found for this category.");
    }

    return NextResponse.json(foodProducts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Failed to fetch products", details: error.message },
        { status: 500 }
      );
    }

    console.error("Unknown error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
