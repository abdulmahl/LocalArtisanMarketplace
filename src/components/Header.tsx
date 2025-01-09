"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { useTheme } from "next-themes";
import { CartButton } from "./CartButton";
import { ProfileButton } from "./ProfileButton";

type HeaderProps = {
  lgTitle: string;
  smTitle: string;
};

export default function Header({ lgTitle, smTitle }: HeaderProps) {
  const pathname = usePathname();
  const { theme, systemTheme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<string | undefined>();

  useEffect(() => {
    setResolvedTheme(theme || systemTheme);
  }, [theme, systemTheme]);

  if (!resolvedTheme) {
    // Prevent rendering until the theme is resolved
    return null;
  }

  return (
    <>
      {pathname === "/" ? (
        <header
          className={`${
            resolvedTheme === "dark" ? "bg-gray-950" : "bg-gray-50"
          } flex items-center justify-between p-5 fixed w-full shadow-md z-50 top-0 border-b-[0.5px]`}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold hidden md:block">{lgTitle} </h2>
            <h2 className="text-xl font-bold flex md:hidden">{smTitle}</h2>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <CartButton />
            <ProfileButton />
          </div>
        </header>
      ) : (
        <header
          className={`${
            resolvedTheme === "dark" ? "bg-gray-950" : "bg-gray-50"
          } flex items-center justify-between p-5 fixed w-full shadow-md z-50 top-0 border-b-[0.5px]`}
        >
          <div className="flex items-center gap-2">
            {pathname === "/" ? null : (
              <Button
                variant={"ghost"}
                size={"icon"}
                title="Back to categories"
                className="rounded-full"
              >
                <Link href={"/"}>
                  <ArrowLeft />
                </Link>
              </Button>
            )}

            <h2 className="text-2xl font-bold hidden md:block">{lgTitle} </h2>
            <h2 className="text-xl font-bold flex md:hidden">{smTitle}</h2>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            {pathname === "/user/user-login" ||
            pathname === "/user/user-register" ? null : (
              <>
                <CartButton />
                <ProfileButton />
                <LogoutButton />
              </>
            )}
          </div>
        </header>
      )}
    </>
  );
}
