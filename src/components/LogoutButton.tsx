"use client";

import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function clearToken() {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function LogoutButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the token exists in cookies
    const isTokenPresent = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("token="));
    setIsLoggedIn(isTokenPresent);
  }, []);

  const handleLogout = () => {
    clearToken();
    router.push("/"); // Redirect to login page
  };

  return (
    <>
      {!isLoggedIn ? null : (
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="rounded-full"
          size="icon"
          title="Log Out"
          aria-label="Log Out"
        >
          <LogOut />
        </Button>
      )}
    </>
  );
}
