import { NextResponse } from "next/server";
import { db } from "@/db";
import { order } from "@/db/schema";

export async function POST() {
  try {
    const addOrder = await db.insert(order).values([]);
    return NextResponse.json(addOrder);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to add product", details: error.message },
        { status: 500 }
      );
    }
  }
}
