import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFieldsForStep(step: number) {
    switch (step) {
        case 0:
            return ["name", "username"];
        case 1:
            return ["university", "department", "year"];
        case 2:
            return ["bio", "image"];
        default:
            return [];
    }
}

export const clearLocalStorage = () => {
    localStorage.removeItem('profile-store');
    localStorage.removeItem('recentSearches');
}