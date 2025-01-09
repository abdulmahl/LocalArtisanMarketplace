import { NextResponse } from "next/server";
import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch the category ID for "Featured Products" (assuming the ID is 6 for featured products)
    const artCategoryId = 1;

    // Fetch the products with category_id matching the featuredCategoryId
    const artProducts = await db
      .select()
      .from(product)
      .where(eq(product.categoryId, artCategoryId)); // Correctly filter by categoryId

    return NextResponse.json(artProducts);
  } catch (error: unknown) {
    // Type assertion: we assert that the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch products", details: error.message },
        { status: 500 }
      );
    }
    // In case the error isn't an instance of Error, return a generic message
    return NextResponse.json(
      { error: "Failed to fetch products", details: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
