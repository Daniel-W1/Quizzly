"use server";

import React from "react";
import axios from "axios";
import TextLogo from "@/app/(landing)/components/text-logo";
import { redirect } from "next/navigation";
import Link from "next/link";

const VerifyEmail = async ({
  searchParams,
}: {
  searchParams: { emailtoken?: string };
}) => {
  const emailtoken = searchParams.emailtoken;

  if (!emailtoken) {
    return redirect("/login");
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?emailtoken=${emailtoken}`,
    {
      validateStatus: () => true, // prevent throwing error when status code is not 200
    }
  );
  const { data } = response;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen max-w-screen-md mx-auto space-y-4 p-8">
      <TextLogo
        text="Quizzly"
        color="#0065F2"
        fontSize="clamp(32px, 5vw, 44px)"
        fontWeight="bold"
        fontFamily="sans-serif"
      />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl sm:text-2xl w-full font-bold text-center">
          Email Verification
        </h1>
        {data.success && (
          <div className="flex flex-col justify-center items-center space-y-4">
            <p className="text-sm text-green-500 text-center bg-green-200 p-2 rounded-md">
              {data.success}
            </p>
            <Link href="/login" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700">Login</Link>
          </div>
        )}
        {data.error && (
          <p className="text-sm text-red-500 text-center bg-red-200 p-2 rounded-md">
            {data.error}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
