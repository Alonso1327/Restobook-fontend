import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_type: 'comensal'
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRadioChange = (value) => {
        setFormData(prevData => ({
            ...prevData,
            user_type: value
        }));
    };

    const validateForm = () => {
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
            setErrorMessage('Por favor, completa todos los campos.');
            return false;
        }
        if (formData.password.length < 6) {
            setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrorMessage('');

        try {
            // Aquí deberías hacer la llamada a tu API para registrar al usuario
            const response = await fetch('http://localhost//Restobook-API/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            // Registro exitoso
            navigate('/login'); // Redirige al usuario a la página de inicio de sesión
        } catch (error) {
            setErrorMessage('Ocurrió un error durante el registro. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1E2330] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-[#2A2F3F] p-8 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center">
            <img src={logo} alt="RESTOBOOK" width={150} height={150} />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#D2B48C]">
              Crea tu cuenta en RESTOBOOK
            </h2>
            <p className="mt-2 text-center text-sm text-[#D2B48C]">
              O{" "}
              <Link to="/login" className="font-medium text-[#D2B48C] hover:text-white transition-colors">
                inicia sesión si ya tienes una cuenta
              </Link>
            </p>
          </div>
          <form className=" mt-8 space-y-6" onSubmit={onSubmit}>
            <div className=" flex flex-col gap-4 rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="nombre" className="sr-only">
                  Nombre
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-[#D2B48C]/20 placeholder-[#D2B48C]/50 text-[#D2B48C] focus:outline-none focus:ring-[#D2B48C] focus:border-[#D2B48C] focus:z-10 sm:text-sm bg-[#1E2330]"
                  placeholder="Nombre"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="apellidos" className="sr-only">
                  Apellidos
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-[#D2B48C]/20 placeholder-[#D2B48C]/50 text-[#D2B48C] focus:outline-none focus:ring-[#D2B48C] focus:border-[#D2B48C] focus:z-10 sm:text-sm bg-[#1E2330]"
                  placeholder="Apellidos"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
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
                  className="appearance-none relative block w-full px-3 py-3 border border-[#D2B48C]/20 placeholder-[#D2B48C]/50 text-[#D2B48C] focus:outline-none focus:ring-[#D2B48C] focus:border-[#D2B48C] focus:z-10 sm:text-sm bg-[#1E2330]"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-[#D2B48C]/20 placeholder-[#D2B48C]/50 text-[#D2B48C] focus:outline-none focus:ring-[#D2B48C] focus:border-[#D2B48C] focus:z-10 sm:text-sm bg-[#1E2330]"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="user-type" className="text-sm font-medium text-[#D2B48C]">
                Tipo de usuario
              </label>
              <RadioGroup
                value={formData.user_type}
                onValueChange={handleRadioChange}
                orientation="horizontal"
                color="border-[#D2B48C]"
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <Radio value="comensal" className="border-[#D2B48C]" >
                    <span className="text-sm text-[#D2B48C]">Comensal</span>
                  </Radio>
                </div>
                <div className="flex items-center space-x-2">
                  <Radio value="owner" className="border-[#D2B48C]" />
                  <span  className="text-sm text-[#D2B48C]">Dueño</span>
                </div>
              </RadioGroup>
            </div>

            {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
            )}

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#1E2330] bg-[#D2B48C] hover:bg-[#C1A478] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D2B48C] transition-colors"
                disabled={isLoading}
              >
                {isLoading && (
                  <Spinner className="mr-2 h-4 w-4" />
                )}
                Registrarse
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Register;
