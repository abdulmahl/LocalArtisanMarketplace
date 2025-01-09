import { NextResponse } from "next/server";
import { db } from "../../../db/index";
import { user } from "../../../db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    // Retrieve the token from cookies
    const token = req.headers.get("cookie")?.split("=")[1]; // Adjust if cookie structure differs

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Verify the token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || typeof decoded !== "object") {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const { email } = decoded as { email: string };

    // Query the database for the student by email
    const [loggedInUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (!loggedInUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Exclude the password field from the response
    const { ...userWithoutPassword } = loggedInUser;

    // Add the role to the response
    const responsePayload = {
      ...userWithoutPassword,
    };

    return NextResponse.json(
      { loggedInUserWithPasswordSiftedOut: responsePayload },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching logged-in student:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the logged-in student" },
      { status: 500 }
    );
  }
}
