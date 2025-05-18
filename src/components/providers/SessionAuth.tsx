'use server'

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function SessionAuth({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    if (!session) {
        return redirect('/login');
    }

    return children;
}
