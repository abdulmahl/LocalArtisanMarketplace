import { NextResponse } from "next/server";
import { db } from "../../../db/index";
import { user } from "../../../db/schema";
import bcrypt from "bcrypt";

// Define a type for the database error
interface DatabaseError extends Error {
  code?: string; // Optional 'code' property for errors like PostgreSQL unique constraint violations
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Insert data into the database
    const result = await db.insert(user).values({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      password: hashedPassword,
      city: body.city,
      province: body.province,
      termsAccepted: body.termsAccepted,
      roles: body.roles,
    });

    return NextResponse.json(
      {
        message: `${body.firstName} has registered successfully`,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving user data:", error);

    // Use the custom DatabaseError type
    const dbError = error as DatabaseError;

    if (dbError.code === "23505") {
      // Handle PostgreSQL unique constraint violation
      return NextResponse.json(
        { error: "Email already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: dbError.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
