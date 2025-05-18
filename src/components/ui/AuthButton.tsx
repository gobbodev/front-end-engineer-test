
'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import {  BiUserCircle } from "react-icons/bi";
import { IoLogInOutline } from "react-icons/io5";

export function AuthButton() {
    const { data: session } = useSession();

    const ButtonHeader = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
        return (
            <button
                onClick={onClick}
                className={`flex items-center gap-2 transition-colors bg-myorange-white text-myblack font-semibold py-2 px-4 rounded-lg hover:bg-myorange hover:text-mywhite hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`}>
                {children}
            </button>
        )
    }

    if (session) {
        return (
            <div className="flex items-center text-myorange-white">
                <BiUserCircle className="w-6 h-6 mr-2" />
                <span className="mr-4  text-center h-fit">{session.user?.name}</span>
                <ButtonHeader onClick={() => signOut()}>
                    Sair
                </ButtonHeader>
            </div>
        )
    }

    return (
        <ButtonHeader onClick={() => signIn('github')}>
            Login
            <IoLogInOutline className="w-6 h-6 mr-1" />
        </ButtonHeader>
    )
}

