import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import logo from "../assets/logo.png";

function Nav() {

    return (
        <>
            <header className="px-4 lg:px-6 h-20 flex items-center border-b border-[#D2B48C]/20">
                <Link className="flex items-center justify-center" to={'/'}>
                    <img src={logo} alt="" width={60} height={60} />
                    <span className="ml-2 text-2xl font-bold text-[#D2B48C]">RESTOBOOK</span>
                </Link>
                <nav className="ml-auto hidden md:flex gap-4 sm:gap-4">
                    <Link className="text-m font-medium hover:text-white transition-colors" to={'/'}>
                        Inicio
                    </Link>
                    <Link className="text-m font-medium hover:text-white transition-colors" to={'how-it-works'}>
                        Como funciona
                    </Link>
                    <Link className="text-sm font-medium hover:text-white transition-colors flex items-center" to="/login">
                        <LogIn className="mr-1 h-4 w-4" />
                        Iniciar sesión
                    </Link>
                    <Link className="text-sm font-medium hover:text-white transition-colors flex items-center" to="/register">
                        <UserPlus className="mr-1 h-4 w-4" />
                        Registrarse
                    </Link>
                </nav>


            </header>
        </>
    )
}


export default Nav;
