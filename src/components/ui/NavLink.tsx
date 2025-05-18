import Link from "next/link";

type NavLinkProps = {
    children: React.ReactNode;
    href: string;
    className?: string;
}

export function NavLink(props: NavLinkProps) {
    const { children, className, href } = props;
    return (
        <Link
            className={`cursor-pointer w-full px-4 py-2 mb-2 flex items-center font-semibold ${className}`}
            href={href}
        >
            {children}
        </Link>
    )
}