"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust path if needed

// Import lucide-react icons
import {
  Mail,
  Lock,
  AlertTriangleIcon,
  Eye,
  EyeOff,
  LogIn,
  Shell,
} from "lucide-react";
import Header from "@/components/Header";

const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(10, "Password is required"),
});

type UserLoginSchema = z.infer<typeof userLoginSchema>;

// Helper Function to Decode JWT
function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const ErrorWrapper = ({ message }: { message: string | null | undefined }) =>
  message ? (
    <p className="text-red-500 text-sm font-semibold mt-3 flex gap-1 items-start md:items-center">
      <AlertTriangleIcon size={15} strokeWidth={2.5} />
      {message}
    </p>
  ) : null;

export default function UserLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    // Check if the user is already logged in by looking for the token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      console.log(token);
      // Redirect if the user is already logged in
      router.push("/profile");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: UserLoginSchema) => {
    console.log("Form Data:", data);
    try {
      setServerError("");
      setLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "appliction-json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        const tokenCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (tokenCookie) {
          try {
            const decodedPayload = parseJwt(tokenCookie);
            console.log("Token Payload:", decodedPayload);
            // You can now use the decoded payload as needed
          } catch (error) {
            console.error("Failed to decode token:", error);
          }
        }

        router.push("/profile");
      } else {
        const errData = await response.json();
        setServerError(errData.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header lgTitle="Sign Into Your Account" smTitle="Sign In" />
      <div className="flex flex-col justify-center h-dvh">
        <div className="flex items-center justify-center px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md border shadow-2xl shadow-gray-700 rounded-lg p-8"
          >
            <fieldset>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="font-medium mb-2 flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    {...register("email")}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
                  />
                  <ErrorWrapper message={errors.email?.message} />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="font-medium mb-2 flex items-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="off"
                    {...register("password")}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
                  />
                  <Button
                    title={showPassword ? "Hide Password" : "Show Password"}
                    type="button"
                    variant={null}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[38px] right-2"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </Button>
                  <ErrorWrapper message={errors.password?.message} />
                </div>
              </div>
            </fieldset>

            {serverError && <ErrorWrapper message={serverError} />}

            <Button
              type="submit"
              className="mt-5 font-medium rounded-md px-8"
              disabled={loading}
              title="Proceed To Sign In"
            >
              {loading ? (
                <Shell />
              ) : (
                <>
                  Sign In
                  <LogIn className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
