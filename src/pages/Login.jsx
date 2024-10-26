import { useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const user = await login(email, password);
            // Redirige basado en el tipo de usuario
            if (user.user_type === "owner") {
                navigate(`/restaurant/${user.restaurant_id}/dashboard`);
            } else if (user.user_type === "comensal") {
                navigate('/user-info');
            } else {
                // Manejar otros tipos de usuario si es necesario
                console.error("Tipo de usuario desconocido");
                setErrorMessage("Error en el tipo de usuario. Contacta al soporte.");
            }
        } catch (error) {
            console.error("Error durante el login:", error.status);
            // Implementar mensaje de error


            if (error.status) {
                if (error.status === 401) {
                    setErrorMessage("Correo o contraseña incorrectas. Por favor, verifica tu correo y contraseña.");
                } else if (error.status === 500) {
                    setErrorMessage("Error del servidor. Por favor, intenta más tarde.");
                } else {
                    setErrorMessage("Ocurrió un error. Por favor, intenta de nuevo.");
                }
            } else {
                setErrorMessage("Error de conexión. Verifica tu conexión a internet.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#1E2330] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-[#2A2F3F] p-8 rounded-xl shadow-2xl">
                <div className="flex flex-col items-center">
                    <img src={logo} alt="RESTOBOOK" width={150} height={150} />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#D2B48C]">
                        Inicia sesión en RESTOBOOK
                    </h2>
                    <p className="mt-2 text-center text-sm text-[#D2B48C]">
                        O{" "}
                        <Link to={'/register'} className="font-medium text-[#D2B48C] hover:text-white transition-colors">
                            regístrate si aún no tienes una cuenta
                        </Link>
                    </p>
                </div>
                {errorMessage && <p className="text-sm text-red-500 text-center mb-4">{errorMessage}</p>}
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Correo electrónico
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-[#D2B48C]/20 placeholder-[#D2B48C]/50 text-[#D2B48C] focus:outline-none focus:ring-[#D2B48C] focus:border-[#D2B48C] focus:z-10 sm:text-sm bg-[#1E2330] my-2"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-[#D2B48C]/20 placeholder-[#D2B48C]/50 text-[#D2B48C] focus:outline-none focus:ring-[#D2B48C] focus:border-[#D2B48C] focus:z-10 sm:text-sm bg-[#1E2330]"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-[#D2B48C] focus:ring-[#D2B48C] border-[#D2B48C]/20 rounded bg-[#1E2330]"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-[#D2B48C]">
                                Recuérdame
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link href="#" className="font-medium text-[#D2B48C] hover:text-white transition-colors">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#1E2330] bg-[#D2B48C] hover:bg-[#C1A478] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D2B48C] transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <Spinner size="md" label="iniciando sesión..." color="default" />
                            )}
                            Iniciar sesión
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )

}
