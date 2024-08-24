import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LastCTA = () => {
  return (
    <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-8 items-center justify-center text-center min-h-[70vh] bg-accent w-full p-4 sm:p-6 md:p-8">
      <p className="text-sm sm:text-base md:text-lg text-gray-500">Empower Your Academic Journey</p>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-xs sm:max-w-xl md:max-w-2xl">
        Join a Community of Learners Revolutionizing Study Habits
      </h1>

      <Button className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3">
        <Link href="/login">Join Now</Link>
      </Button>
    </div>
  );
};

export default LastCTA;
