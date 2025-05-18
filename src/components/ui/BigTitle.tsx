interface BigTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function BigTitle({ children, className }: BigTitleProps) {
    return (
        <h1 className={`text-4xl font-bold mb-8 text-myorange-white leading-tight ${className}`}>
            {children}
        </h1>
    )
}