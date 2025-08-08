import Background from './components/Background';
import { LucioAquino } from './components/Lucio-Aquino';

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
