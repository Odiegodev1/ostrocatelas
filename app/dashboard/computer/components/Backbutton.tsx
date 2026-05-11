"use client"

import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function Backbutton(){
    const router = useRouter();

    const handleback = () => {
        router.back();
    }
    return(
        <button onClick={handleback} className="m-2 cursor-pointer">
            <ArrowLeftCircle  className="size-8 text-purple-500"/>
        </button>
    )
}