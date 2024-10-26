import { Outlet } from "react-router-dom"
import Nav from "../component/PrincipalNav"
import FooterPrincipal from "../component/FooterPrincipal";

function PlaceholderHome() {
    return(
        <div className="flex flex-col min-h-screen bg-[#1E2330] text-[#D2B48C]">
            <Nav/>
            <Outlet/>
            <FooterPrincipal/>
        </div>
    )
}

export default PlaceholderHome;
