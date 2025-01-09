import { NextResponse } from "next/server";
import { db } from "@/db";
import { cart } from "@/db/schema";

export async function GET() {
  try {
    const cartProducts = await db.select().from(cart);
    console.log("Cart count:", cartProducts.length);
    return NextResponse.json(cartProducts);
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
