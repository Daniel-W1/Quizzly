import React from 'react';
import StartTest from './start-test';
import { TestDetails } from "@/types";
import Image from "next/image";
import axios from "axios";

interface TestServerPageProps {
    id: string;
}

export default async function TestPage({ id }: TestServerPageProps) {
    const testDetails = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/${id}`).then((res) => res.data);

    if (!testDetails || 'error' in testDetails) {
        return (
            <div className="flex flex-col space-y-4 items-center justify-center h-screen">
                <Image src="/error.svg" alt="Error" width={100} height={100} />
                <p className="text-lg font-medium text-center">{testDetails.error}</p>
            </div>
        )
    }

    return (
        <StartTest testDetails={testDetails as TestDetails} />
    )
}