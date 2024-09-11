import { Separator } from '@/components/ui/separator';
import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { UserActivity } from '@/types';

interface DailyActivityProps {
    activities: UserActivity[]
}

const DailyActivity = ({ activities }: DailyActivityProps) => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 8);

    return (
        <div className='w-full mb-2'>
            <p className='text-sm text-muted-foreground'>Past 8 months</p>
            <Separator className='mb-2' />
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={activities}
                horizontal={true}
                classForValue={(value) => {
                    if (!value) {
                        return 'color-scale-0';
                    }

                    if (value.count <= 2) {
                        return `color-scale-1`;
                    }

                    if (value.count <= 4) {
                        return `color-scale-2`;
                    }

                    if (value.count <= 6) {
                        return `color-scale-3`;
                    }

                    return `color-scale-4`;
                }}
                titleForValue={(value: any) => {
                    if (!value?.count) {
                        return '';
                    }

                    return `${value?.count} tests completed in ${value?.date}`
                }}
            />
        </div>
    )
}

export default DailyActivity