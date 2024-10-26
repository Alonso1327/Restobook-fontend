import { Button, Image } from "@nextui-org/react";
import { NavLink, useParams } from "react-router-dom";
import logo from '../assets/logo.png'
import { Book, Calendar, LogOut, MessageSquare, Star, User, Utensils } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";


function NavRestaurant() {
    const {logout} = useAuth();
    const {restaurantId} = useParams();
    const navItems = [
        { to: `/restaurant/${restaurantId}/dashboard`, icon: Utensils, text: "Restaurante", end: true },
        { to: `/restaurant/${restaurantId}/dashboard/perfil`, icon: User, text: "Perfil" },
        { to: `/restaurant/${restaurantId}/dashboard/menu`, icon: Book, text: "Menu" },
        { to: `/restaurant/${restaurantId}/dashboard/comentarios`, icon: MessageSquare, text: "Comentarios" },
        { to: `/restaurant/${restaurantId}/dashboard/calificacion`, icon: Star, text: "Calificación" },
        { to: `/restaurant/${restaurantId}/dashboard/reservations`, icon: Calendar, text: "Reservaciones" },
    ];

    return (
        <nav className="w-64 bg-[#2A2F3F] p-6 space-y-1">
            <div className="flex items-center mb-8">
                <Image src={logo} alt="logo" width={80} height={80} />
                <span className="ml-2 text-xl font-bold">RESTOBOOK</span>
            </div>
            <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `w-full flex items-center justify-start border-none p-3 rounded-2xl transition-all duration-300 ease-in-out ${
                                isActive
                                    ? "bg-[#D2B48C] text-[#1E2330] font-bold transform scale-105"
                                    : "text-[#D2B48C] hover:bg-[#D2B48C] hover:text-[#1E2330] hover:transform hover:scale-105"
                            }`
                        }
                    >
                        <item.icon className="mr-2 h-4 w-4"/>
                        {item.text}
                    </NavLink>
                ))}

                <button
                    className="w-full flex items-center justify-start border-none p-3 rounded-2xl hover:bg-red-400 hover:text-white hover:font-bold transition-all duration-300 ease-in-out hover:transform hover:scale-105"
                    onClick={logout}
                >
                    <LogOut className="mr-2 h-4 w-4"/>
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
}

export default NavRestaurant;
