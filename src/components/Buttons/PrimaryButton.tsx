import { ButtonHTMLAttributes, ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    isLoading?: boolean;
    children?: ReactNode;
    color?: string;
};

export default function PrimaryButton({
    title,
    isLoading,
    children,
    color,
    ...rest
}: PrimaryButtonProps) {
    return (
        <button
            className="w-28 flex justify-center py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-primary disabled:bg-zinc-200 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            {...rest}
        >
            {isLoading ? (
                <FaSpinner className="animate-spin mx-auto" size={20} />
            ) : (
                title || children
            )}
        </button>
    );
}