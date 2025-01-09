"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"; // Adjust path if needed
import {
  User,
  Import,
  Users,
  Mail,
  ShieldEllipsis,
  ShieldCheck,
  Smartphone,
  MapPin,
  Map,
  AlertTriangleIcon,
  Eye,
  EyeOff,
  ScanLine,
  Shell,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

const userSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    city: z.string().min(1, "City is required"),
    province: z.string().min(1, "Province is required"),
    profilePicture: z.instanceof(File).optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
    roles: z.array(z.string()).min(1, "At least one role is required"),
    active: z.boolean().default(true),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UserSchema = z.infer<typeof userSchema>;

type ErrorWrapperProps = {
  errMessage?: string | undefined | null;
  className?: string;
};

export default function UserRegister() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: UserSchema) => {
    try {
      setLoading(true);
      const response = await fetch("/api/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/user/user-login");
      } else {
        const errData = await response.json();
        setBackendError(errData.error);
      }
    } catch (error: unknown) {
      console.error("Unexpected error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (backendError) {
      const timer = setTimeout(() => setBackendError(null), 5000);
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [backendError]);

  const ErrorWrapper = ({ errMessage, className }: ErrorWrapperProps) =>
    errMessage ? (
      <p
        className={`text-red-500 text-sm font-semibold ${className} mt-3 flex gap-1 items-start md:items-center`}
      >
        <AlertTriangleIcon size={15} strokeWidth={2.5} />
        {errMessage}
      </p>
    ) : null;

  return (
    <>
      <Header lgTitle="User Register" smTitle="Register" />
      <div className="flex flex-col items-center justify-center mt-[4rem] p-5 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-5xl border shadow-2xl shadow-gray-700 rounded-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="font-medium mb-2 flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
              />
              <ErrorWrapper errMessage={errors.firstName?.message} />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="font-medium mb-2 flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
              />
              <ErrorWrapper errMessage={errors.lastName?.message} />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="font-medium mb-2 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
              />
              <ErrorWrapper errMessage={errors.email?.message} />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="font-medium mb-2 flex items-center gap-2"
              >
                <Smartphone className="w-5 h-5" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
              />
              <ErrorWrapper errMessage={errors.phone?.message} />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="font-medium mb-2 flex items-center gap-2"
              >
                <Map className="w-5 h-5" />
                City
              </label>
              <input
                type="text"
                id="city"
                {...register("city")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
              />
              <ErrorWrapper errMessage={errors.city?.message} />
            </div>

            {/* Province */}
            <div>
              <label
                htmlFor="province"
                className="font-medium mb-2 flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Province
              </label>
              <input
                type="text"
                id="province"
                {...register("province")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
              />
              <ErrorWrapper errMessage={errors.province?.message} />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="font-medium mb-2 flex items-center gap-2"
              >
                <ShieldEllipsis className="w-5 h-5" />
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
              />
              <Button
                type="button"
                variant={null}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[40px] right-0"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </Button>
              {errors.password && (
                <ErrorWrapper errMessage={errors.password.message} />
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="font-medium mb-2 flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
              />
              <Button
                type="button"
                variant={null}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-[40px] right-0 "
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </Button>
              {errors.confirmPassword && (
                <ErrorWrapper errMessage={errors.confirmPassword.message} />
              )}
            </div>
          </div>

          {/* Roles */}
          <div className="">
            <label className="font-medium mb-2 flex items-center gap-2 mt-6">
              <ScanLine className="w-5 h-5" />
              Roles
            </label>
            <select
              multiple
              {...register("roles")}
              className="w-full py-2 border rounded-md"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            {errors.roles && <ErrorWrapper errMessage={errors.roles.message} />}
          </div>

          {/* Terms */}
          <div className="mt-3">
            {backendError ? (
              <p className="text-red-500 text-md font-semibold flex gap-1 md:items-center">
                <AlertTriangleIcon size={18} strokeWidth={2.5} />
                {backendError}
              </p>
            ) : (
              <>
                <label className="inline-flex gap-1 items-start md:items-center">
                  <input
                    type="checkbox"
                    {...register("termsAccepted")}
                    className="rounded border-gray-300 focus:ring-gray-700"
                  />
                  <span className="leading-none text-sm">
                    I confirm that the information provided in the above form,
                    is accurate and true.
                  </span>
                </label>
                <ErrorWrapper errMessage={errors.termsAccepted?.message} />
              </>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex itmes-center gap-5">
            {backendError ? (
              <Button
                variant={"default"}
                type="submit"
                className="mt-3 font-medium rounded-md px-8"
              >
                ...
              </Button>
            ) : (
              <Button
                variant={"default"}
                type="submit"
                className="mt-3 font-medium rounded-md px-8"
              >
                {loading ? <Shell /> : "Register"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
