"use server"

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import StartTest from "./components/start-test";
import { TestDetails } from "@/types";
import Image from "next/image";
import axios from "axios";

export default async function TestPage({ params }: { params: { id: string } }) {
    const testDetails = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/${params.id}`).then((res) => res.data);

    if (!testDetails || 'error' in testDetails) {
        return (
            <div className="flex flex-col space-y-4 items-center justify-center h-screen">
                <Image src="/error.svg" alt="Error" width={100} height={100} />
                <p className="text-lg font-medium text-center">{testDetails.error}</p>
            </div>
        )
    }

    return (
        <Suspense fallback={<div className='flex items-center justify-center min-h-screen'><Loader2 className='animate-spin' /></div>}>
            <StartTest testDetails={testDetails as TestDetails} />
        </Suspense>
    )
}