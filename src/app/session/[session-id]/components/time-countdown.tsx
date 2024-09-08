import { Skeleton } from '@/components/ui/skeleton';
import React, { useEffect, useState, forwardRef } from 'react'
import Countdown from 'react-countdown';

interface TimeCountDownProps {
    time_in_minutes: number;
    id: string;
}

const TimeCountDown = forwardRef<Countdown, TimeCountDownProps>(({ time_in_minutes, id }, ref) => {
    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    useEffect(() => {
        const savedTime = sessionStorage.getItem(id);
        if (savedTime) {
            const { remainingTime: savedRemainingTime, savedAt } = JSON.parse(savedTime);
            const timePassed = Date.now() - savedAt;
            setRemainingTime(Math.max(0, savedRemainingTime - timePassed));
        } else {
            setRemainingTime(time_in_minutes * 60 * 1000);
        }
    }, [id, time_in_minutes]);

    const saveRemainingTime = (time: number) => {
        sessionStorage.setItem(id, JSON.stringify({
            remainingTime: time,
            savedAt: Date.now()
        }));
    };

    if (remainingTime === null) {
        return <Skeleton className='w-20 h-7 rounded-md' />;
    }

    return (
        <Countdown
            date={Date.now() + remainingTime}
            onComplete={() => saveRemainingTime(0)}
            onTick={({ total }) => {
                setRemainingTime(total);
                saveRemainingTime(total);
            }}
            renderer={({ hours, minutes, seconds, completed }) => (
                <span className='text-primary font-medium text-lg'>
                    {completed ? "00:00:00" : 
                     `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                </span>
            )}
            ref={ref}
        />
    );
});

TimeCountDown.displayName = 'TimeCountDown';

export default TimeCountDown;