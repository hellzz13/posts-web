import { ButtonHTMLAttributes, ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";

type SecundaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    isLoading?: boolean;
    children?: ReactNode;
};

export default function SecondaryButton({
    title,
    isLoading,
    children,
    ...rest
}: SecundaryButtonProps) {
    return (
        <button
            className="w-28 flex justify-center py-1 px-4 border-2 border-[#999999] rounded-md shadow-sm text-sm font-medium text-black  bg-white disabled:bg-zinc-200 hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#999999]"
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
