import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../../db/index";
import { user } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const [loginUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (!loginUser) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, loginUser.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: loginUser.id, email: loginUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // for production mode ...
    // const cookie = serialize("token", token, {
    //   httpOnly: false,
    //   // httpOnly: true,
    //   secure: process.env.NODE_ENV === "development",
    //   // secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    //   // sameSite: "strict",
    //   maxAge: 3600, // 1 hour
    //   path: "/",
    // });

    const cookie = serialize("token", token, {
      httpOnly: false, // Make accessible to JavaScript during development
      secure: false, // No HTTPS in development
      sameSite: "lax", // Avoid strict restrictions in dev
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return NextResponse.json(null, {
      headers: { "Set-Cookie": cookie },
    });
  } catch (error) {
    console.error("Error during user login:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
POST;
