import { Link } from "react-router-dom";
import { HomeIcon, LogIn, UserPlus2, Utensils } from "lucide-react";
import logo from "../assets/logo.png";
import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { useState } from "react";

function Nav() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItem = [
        { to: '/', text: 'Inicio', icon: HomeIcon },
        { to: '/how-it-works', text: 'Como funciona', icon: Utensils },
        { to: '/register', text: 'Registrarse', icon: UserPlus2 },
    ]

    return (
        <>
            <Navbar shouldHideOnScroll isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} classNames={{
                base: [
                    'bg-[#1E2330]',
                    'border-b',
                    'border-[#D2B48C]/20'
                ],
            }}>
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>
                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <Image src={logo} alt={logo} width={60} height={60} />
                        <p className="font-bold sm:text-4xl sm:flex gap-4 ">Restobook</p>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand >
                        <Image src={logo} alt={logo} width={60} height={60} />
                        <p className="font-bold sm:text-4xl sm:flex gap-4 ">Restobook</p>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent justify="end">
                    {navItem.map((item, index) => (
                        <NavbarItem key={`${item}-${index}`} className="hidden sm:flex sm:items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            <Link to={item.to}>
                                {item.text}
                            </Link>
                        </NavbarItem>
                    ))}
                    <NavbarItem className="flex items-center text-small sm:text-base sm:gap-1">
                        <LogIn className="mr-1 h-4 w-4" />
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu >
                    {navItem.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`} className="flex items-center gap-2 w-full">
                            <item.icon className="" />
                            <Link onClick={() => setIsMenuOpen(false)} to={item.to}>
                                {item.text}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </>
    )
}


export default Nav;
