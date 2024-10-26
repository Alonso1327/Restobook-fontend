import { Link } from "react-router-dom";
function FooterPrincipal() {
    return(
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#D2B48C]/20">
        <p className="text-xs text-[#D2B48C]/60">© 2024 RESTOBOOK. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-white transition-colors" href="#">
            Términos de servicio
          </Link>
          <Link className="text-xs hover:text-white transition-colors" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    )
}

export default FooterPrincipal;
