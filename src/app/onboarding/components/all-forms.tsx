"use client";

import React, { FormEvent, useState } from "react";
import EducationForm from "./education-form";
import NameForm from "./name-form";
import OptionalForm from "./optional-form";
import { useMultistepForm } from "@/hooks/use-multistep-form";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
import { profileSchema } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, getFieldsForStep } from "@/lib/utils";
import { createProfile } from "@/actions/onboarding";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const AllOnboardingSteps = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof profileSchema>>({
        mode: "onChange",
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            username: "",
            university: "",
            department: "",
            bio: "",
            image: "",
            year: ""
        }
    });
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultistepForm([
            <NameForm key={0} form={form} />,
            <EducationForm key={1} form={form} />,
            <OptionalForm key={2} form={form} />,
        ]);

    const currentFields = getFieldsForStep(currentStepIndex);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const isCurrentStepValid = await form.trigger(
            currentFields as Array<Path<z.infer<typeof profileSchema>>>,
            {
                shouldFocus: true,
            }
        );

        if (!isCurrentStepValid) return;
        if (!isLastStep) {
            next();
            return;
        }

        setLoading(true);
        try {
            const profile = form.getValues();
            const result = await createProfile(profile);

            if ('error' in result) {
                setError(result.error);
                return;
            }

            setLoading(false);
            form.reset();
            router.push("/search");
        } catch (error: any) {
            setError(error?.message);
            setLoading(false);
            return;
        }
    };

    return <div className="flex justify-around items-center h-screen w-screen max-w-screen-lg mx-auto py-12">
        <Progress value={(currentStepIndex + 1) / steps.length * 100} className="absolute h-1 rounded-none top-0 left-0 w-full"/>
        <div className="h-screen items-center w-1/2 hidden lg:flex">
            <Image
                src="/onboarding.svg"
                alt="reading"
                width={500}
                height={500}
            />
        </div>

        <Form {...form}>
            <form onSubmit={onSubmit} className="overflow-y-auto overflow-x-hidden h-screen flex flex-col justify-center education-form py-8">
                {step}
                <div className={cn("w-full flex items-center px-8",
                    isFirstStep ? "justify-end" : "justify-between"
                )}>
                    {
                        !isFirstStep && <Button type="button" onClick={back} disabled={loading} variant="secondary">
                            Back
                        </Button>
                    }
                    <Button type="submit" disabled={loading} className="flex items-center space-x-2">
                        {isLastStep ? "Finish" : <span className="flex items-center">Next <ArrowRight className='w-4 h-4 ml-2' /></span>}
                        {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                    </Button>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </Form>
    </div>;
};

export default AllOnboardingSteps;
