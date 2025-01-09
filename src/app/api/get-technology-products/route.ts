import { NextResponse } from "next/server";
import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const technologyCategoryId = 4;

    const technologyProducts = await db
      .select()
      .from(product)
      .where(eq(product.categoryId, technologyCategoryId)); // Ensure categoryId is correct

    if (!technologyProducts.length) {
      console.log("No products found for this category.");
    }

    return NextResponse.json(technologyProducts);
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
