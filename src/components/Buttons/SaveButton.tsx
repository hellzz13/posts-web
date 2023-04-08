import { ButtonHTMLAttributes, ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    isLoading?: boolean;
    children?: ReactNode;
};

export default function SaveButton({
    title,
    isLoading,
    children,
    ...rest
}: ActionButtonProps) {
    return (
        <button
            className="w-28 flex justify-center py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-[#47B960] disabled:bg-zinc-200 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#47B960]"
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
