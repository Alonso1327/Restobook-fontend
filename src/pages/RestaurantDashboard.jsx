import { Outlet } from "react-router-dom";
import NavRestaurant from "../component/NavRestaurant";

function RestaurantDashboard() {
    return (
        <div className="flex h-screen bg-[#1E2330] text-[#D2B48C]">
            <NavRestaurant/>
            <main className="flex-1 p-8 overflow-auto">
                <h1 className="text-3xl font-bold mb-8">Panel de Control</h1>
                <Outlet/>
            </main>
        </div>
    );
}

export default RestaurantDashboard;
