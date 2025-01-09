import React from "react";
import { Button } from "@/components/ui/button";
import { UserPen } from "lucide-react";
import Link from "next/link";

export function ProfileButton() {
  return (
    <Link href={"/profile"}>
      <Button
        variant={"ghost"}
        className="rounded-full"
        size={"icon"}
        title="View Your Profile"
      >
        <UserPen />
      </Button>
    </Link>
  );
}
