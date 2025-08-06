import Link from "next/link";
import { FaEnvelope, FaHome, FaUserAlt, FaPowerOff } from "react-icons/fa";
import { PiGameControllerBold } from "react-icons/pi";

export default function Sidebar() {
  return (
    <aside className="h-screen w-25 ml-8  flex flex-col items-center justify-between py-6 px-2 shadow-xl">
      <div className="flex relative flex-col items-center justify-center h-full gap-6 mt-2">
        {/* Avatar */}
        <section className="flex absolute top-0 w-75 p-0 h-20 gap-5  justify-center items-center left-0">
          <div className="w-15 h-15 rounded-full flex  border-white overflow-hidden mb-2">
            <img src="/profile.jpeg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl">Lucio Misael Aquino</h1>
        </section>
        
        {/* Menú de íconos */}
        <nav className="flex flex-col  h-full justify-between  py-35 gap-7 items-center">
          <Link href="/" className="border-2 p-4 rounded-full">
            <FaHome className="text-2xl text-orange-400 hover:text-orange-300 transition-colors" />
          </Link>
          <Link href="/proyectos" className="border-2 p-4 rounded-full">
            <PiGameControllerBold className="text-2xl text-yellow-400 hover:text-yellow-300 transition-colors" />
          </Link>
          <Link href="/sobre-mi"className="border-2 p-4 rounded-full">
            <FaUserAlt className="text-2xl text-blue-400 hover:text-blue-300 transition-colors" />
          </Link>
          <Link href="/contacto"className="border-2 p-4 rounded-full">
            <FaEnvelope className="text-2xl text-white hover:text-blue-200 transition-colors" />
          </Link>
        </nav>
      </div>
      <div className="flex flex-col items-center gap-6 mb-2">
        
        <button className="h-14 w-14 border-2 bg-red-500/70 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors">
          <FaPowerOff className="text-2xl text-white" />
        </button>
      </div>
    </aside>
  );
}
