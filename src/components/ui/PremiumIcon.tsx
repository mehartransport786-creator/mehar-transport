import { LucideIcon } from "lucide-react";

interface PremiumIconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PremiumIcon({ icon: Icon, size = "md", className = "" }: PremiumIconProps) {
  // Size mappings
  const boxSizes = {
    sm: "w-10 h-10 rounded-xl",
    md: "w-14 h-14 rounded-2xl",
    lg: "w-16 h-16 rounded-[20px]"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-7 h-7"
  };

  return (
    <div className={`flex items-center justify-center bg-[#F8F9FA] border border-[#E5E7EB]/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] ${boxSizes[size]} ${className}`}>
      <Icon 
        className={`${iconSizes[size]} text-[#1B1E4F]`} 
        strokeWidth={1.5} 
      />
    </div>
  );
}
