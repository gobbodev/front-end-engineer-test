"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { signIn, useSession } from "next-auth/react";

import { FaGithub } from "react-icons/fa";

// não é um Form, mas provavelmente seria em um caso real, com outras opções de login (como email pessoal e senha)
// decidi manter esse nome pra melhorar a organização e compreensão do código
export function FormLogin() {
    const {  status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    return (
        <div className="bg-gradient-to-br from-myorange-low/20 to-myblack-dark p-10 rounded-xl shadow-lg text-center max-w-md w-full border border-myorange-low/20 backdrop-blur-sm">

            <p className="text-myorange-white/70 mb-8">Use sua conta do GitHub para fazer login</p>

            <button
                onClick={() => signIn("github")}
                className="w-full flex items-center justify-center bg-myorange-low transition-all duration-300 text-myblack font-semibold py-4 px-6 rounded-lg hover:bg-myorange hover:text-mywhite hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
                <FaGithub className="mr-3 w-6 h-6" />
                Faça Login com GitHub
            </button>
        </div>
    )
}