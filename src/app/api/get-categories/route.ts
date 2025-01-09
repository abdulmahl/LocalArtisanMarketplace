import { NextResponse } from "next/server";
import { db } from "@/db";
import { category } from "@/db/schema";

export async function GET() {
  try {
    const categories = await db.select().from(category).orderBy(category.id);
    return NextResponse.json(categories);
  } catch (error: unknown) {
    // Type assertion: we assert that the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch categories", details: error.message },
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
