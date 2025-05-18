import { ButtonHTMLAttributes } from "react";

type NavButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
}

export function NavButton(props: NavButtonProps) {
    const { children, className, ...rest } = props;
    return (
        <button
            className={`cursor-pointer w-full px-4 py-2 mb-2 flex items-center font-semibold ${className}`}
            {...rest}
        >
            {children}
        </button>
    )
}