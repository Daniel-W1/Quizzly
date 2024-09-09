import { DifficultyLevel } from "@/app/search/components/test-card";
import { Badge } from "@/components/ui/badge";

export const DetailItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    badge?: boolean;
}> = ({ icon, label, value, badge }) => (
    <div className="flex items-center text-left">
        {icon}
        <span className="font-medium ml-2">{label}:</span>
        {badge ? (
            <Badge variant={value.toLowerCase() as DifficultyLevel} className="ml-2">
                {value}
            </Badge>
        ) : (
            <span className="ml-2 truncate">{value}</span>
        )}
    </div>
);
