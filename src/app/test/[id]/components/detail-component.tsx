import { DifficultyLevel } from "@/app/search/components/test-card";
import { Badge } from "@/components/ui/badge";

export const DetailItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    badge?: boolean;
    textWrap?: boolean;
    labelVisible?: boolean;
    className?: string;
}> = ({ icon, label, value, badge, textWrap = true, labelVisible = true, className }) => (
    <div className={`flex items-center text-left ${className}`}>
        {icon}
        {labelVisible && <span className="font-medium ml-2">{label}:</span>}
        {badge ? (
            <Badge variant={value.toLowerCase() as DifficultyLevel} className="ml-2">
                {value}
            </Badge>
        ) : (
            <span className={`ml-2 ${textWrap ? 'truncate' : ''}`}>{value}</span>
        )}
    </div>
);
