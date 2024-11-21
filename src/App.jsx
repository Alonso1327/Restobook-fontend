import PlaceholderHome from "./pages/PlaceholderHome"
import Home from "./pages/Home"
import HowWork from "./pages/HowWork"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserInfo from "./pages/UserInfo"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import RegisterRestaurant from "./pages/RegisterRestaurant"
import { useEffect } from "react"
import RestaurantDashboard from "./pages/RestaurantDashboard"
import RestaurantInfo from "./pages/RestaurantInfo"
import { setNavigate } from './utils/customFetch';
import RestauranteMenu from "./pages/RestauranteMenu"
import RestaurantTables from "./pages/RestaurantTables"

// Componente de ruta protegida modificado
const ProtectedRoute = ({ children, allowedUserType }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login", { replace: true });
    } else if (auth.userType !== allowedUserType) {
      navigate("/", { replace: true });
    } else if(allowedUserType === 'owner'){
      if(!auth.restaurantId){
        navigate('/register-restaurant', {replace: true});
      }
    }
  }, [auth, navigate, allowedUserType]);

  if (!auth) return null;

  return children;
};

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<PlaceholderHome/>}>
        <Route index element={<Home/>}/>
        <Route path="/how-it-works" element={<HowWork/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route
        path="/user-info"
        element={
          <ProtectedRoute allowedUserType="comensal">
            <UserInfo/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/register-restaurant"
        element={
          <ProtectedRoute allowedUserType="owner">
            <RegisterRestaurant/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurant/:restaurantId/dashboard"
        element={
          <ProtectedRoute allowedUserType="owner">
            <RestaurantDashboard/>
          </ProtectedRoute>
        }
      >
        <Route index element={<RestaurantInfo/>}/>
        <Route path="perfil" element={<h1>Perfil del dueño</h1>}/>
        <Route path="menu" element={<RestauranteMenu/>}/>
        <Route path="comentarios" element={<h1>Comentarios</h1>}/>
        <Route path="calificacion" element={<h1>Calificación</h1>}/>
        <Route path="mesas" element={<RestaurantTables/>}/>
        <Route path="reservations" element={<h1>Reservaciones</h1>}/>
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
