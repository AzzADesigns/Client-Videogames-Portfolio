import { LucioAquino } from "@/components/molecules/Lucio-Aquino.tsx/Lucio-Aquino";
import Background from "@/components/molecules/shared/Background";



export default function Home() {
    return (
        <div className="flex items-center justify-center bg-red-400 ">
            <div className="w-full relative flex justify-center items-center h-full"> 
                <Background /> 
                <LucioAquino />
            </div>
        </div>
    );
}
