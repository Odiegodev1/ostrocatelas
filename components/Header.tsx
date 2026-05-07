import { Smartphone } from "lucide-react";
import { Button } from "./ui/button";

export function Header(){
    return(
        <div className="h-17 border-b flex items-center justify-between border-zinc-800/50 w-full  py-1.5">
            <div className="flex items-center w-full mx-auto max-w-[1600] justify-between">
                <div className="flex items-center gap-2">
                <div className="flex items-center border border-purple-400 justify-center rounded-md bg-purple-500/40 size-10">
                    <Smartphone className="text-purple-500" />

                </div>
                <h1 className="text-lg font-semibold ">Troca Telas</h1>
            </div>

            <div className="flex gap-2 items-center">
                <Button variant="outline">Novo Orçamento</Button>
                <Button variant="outline">Historico</Button>
            </div>

            </div>

        </div>
    )
}