import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="flex flex-col items-center space-y-3 mt-5 pb-10">
      <h2 className="text-3xl font-bold">Ready to Start Exploring?</h2>
      <div className="flex gap-3 items-center">
        <Link
          href={"/user-register"}
          className="hover:underline underline-offset-4"
        >
          <Button variant="outline" title="Register Here">
            Join for Free
          </Button>
        </Link>

        <Link
          href={"/user-login"}
          className="hover:underline underline-offset-4"
        >
          <Button variant="outline" title="Sign In Here">
            or log in here
          </Button>
        </Link>
      </div>
    </section>
  );
}
