
import { FormLogin } from "@/components/login/FormLogin";
import { BigTitle } from "@/components/ui/BigTitle";

export default function LoginPage() {

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] w-full">
            <BigTitle className="max-w-xl text-center">
                Para ter acesso a nossa <span className="text-myorange-low">plataforma de odds</span>, você precisa fazer login.
            </BigTitle>
            <FormLogin />
        </div>
    );
}