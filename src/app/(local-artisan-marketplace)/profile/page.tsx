"use client";

import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { user } from "../../../db/schema";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<typeof user | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-loggedin-user", {
          method: "GET",
        });

        if (!response.ok) {
          const errData = await response.json();
          console.warn("Error fetching user:", errData);
          router.push("/user-login");
          return;
        }

        const loggedInUser = await response.json();
        setUserData(loggedInUser.loggedInUserWithPasswordSiftedOut);
      } catch (error) {
        console.error("Network error:", error);
        router.push("/user-login");
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedInUser();
  }, [router]);

  return (
    <div>
      <Header
        lgTitle={
          loading ? "Loading your profile..." : `Ola ${userData?.firstName}`
        }
        smTitle={loading ? "Loading your profile..." : `${userData?.firstName}`}
      />
      <p className="mt-[5rem] p-5 text-xl">Your Profile</p>
    </div>
  );
}
