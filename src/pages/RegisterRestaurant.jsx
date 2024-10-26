import { Card, CardHeader, Image, CardBody, Input, CardFooter, Button, Spinner } from "@nextui-org/react";
import { ArrowLeft, ArrowRight, Clock, MapPin, Phone, Utensils } from "lucide-react";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";



export default function RegisterRestaurant() {
    const [step, setStep] = useState(1);
    const { auth, updateAuth } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id:'',
        name: '',
        address: '',
        open_time: '',
        close_time: '',
        phone_number: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleNextStep = () => {
        setStep(prev => Math.min(prev + 1, steps.length));
    }

    const handlePreviousStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
    }

    useEffect(()=>{
        if(auth?.userId){
            setFormData(prevData => ({
                ...prevData,
                user_id:auth.userId
            }))
        }
    },[auth])

    const validateForm = () => {
        if (!formData.name || !formData.address || !formData.open_time || !formData.close_time || !formData.phone_number) {
            setErrorMessage('Por favor, completa todos los campos.');
            alert(errorMessage);
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
            const response = await fetch('http://localhost//Restobook-API/restaurants/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    user_id: formData.user_id,
                    name: formData.name,
                    address: formData.address,
                    open_time: formData.open_time,
                    close_time: formData.close_time,
                    phone_number: formData.phone_number
                }),
            });

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            const data = await response.json();

            if (response.status === 200) {
                alert('Restaurante ya existe');
                // Asumiendo que el endpoint devuelve el ID del restaurante existente
                if (data.restaurant_id) {
                    updateAuth({ ...auth, restaurantId: data.restaurant_id });
                    navigate(`/restaurant/${data.restaurant_id}/dashboard`);
                } else {
                    navigate('/');
                }
            } else if (response.status === 201) {
                // Registro exitoso
                alert('Restaurante registrado exitosamente');
                // Asumiendo que el endpoint devuelve el ID del nuevo restaurante
                if (data.restaurant_id) {
                    updateAuth({ ...auth, restaurantId: data.restaurant_id });
                    navigate(`/restaurant/${data.restaurant_id}/dashboard`);
                } else {
                    console.error('No se recibió el ID del restaurante');
                    navigate('/');
                }
            }

        } catch (error) {
            console.error('Error durante el registro:', error);
            setErrorMessage('Ocurrió un error durante el registro. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const steps = [
        { title: "Nombre del restaurante", type: "text", description: "Por favor, ingrese el nombre del restaurante", icon: Utensils },
        { title: "Dirección", type: "text", description: "Por favor, ingrese la dirección del restaurante", icon: MapPin },
        { title: "Horario", type: "text", description: "Por favor, ingrese el horario de apertura y cierre del restaurante", icon: Clock },
        { title: "Teléfono", type: "text", description: "Por favor, ingrese el teléfono del restaurante", icon: Phone },
        { title: "Confirmar", type: "submit", description: "Por favor, confirme los datos del restaurante", icon: ArrowRight },
    ]

    return (
        <div className="min-h-screen bg-[#1E2330] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-w-md w-full space-y-8 flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <Image src={logo} alt="logo" width={100} height={100} />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#D2B48C]">Registra tu Restaurante</h2>
                    <p className="mt-2 text-center text-sm text-[#D2B48C]/80">
                        Paso {step} de {steps.length}
                    </p>
                </div>
                <Card className="bg-[#2A2F3E] border-[#D2B48C] border-2">
                    <CardHeader className="flex flex-col gap-2">
                        <div className="text-[#D2B48C] flex flex-col text-lg items-center justify-center ">
                            {steps[step - 1].icon && React.createElement(steps[step - 1].icon, { className: "mr-2 h-6 w-6" })}
                            {steps[step - 1].title}
                        </div>
                        <div className="text-[#D2B48C]/60 text-center">
                            {steps[step - 1].description}
                        </div>
                    </CardHeader>
                    <CardBody>
                    <form onSubmit={onSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <label htmlFor="nombre" className="text-[#D2B48C]">Nombre del Restaurante</label>
                  <Input
                    id="nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-[#1E2330] text-[#D2B48C] border-[#D2B48C]/20"
                  />
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <label htmlFor="direccion" className="text-[#D2B48C]">Dirección</label>
                  <Input
                    id="direccion"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="bg-[#1E2330] text-[#D2B48C] border-[#D2B48C]/20"
                  />
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="horaApertura" className="text-[#D2B48C]">Hora de Apertura</label>
                    <Input
                      id="horaApertura"
                      name="open_time"
                      type="time"
                      value={formData.open_time}
                      onChange={handleInputChange}
                      required
                      className="bg-[#1E2330] text-[#D2B48C] border-[#D2B48C]/20"
                      aria-label="Hora de Apertura"
                    />
                  </div>
                  <div>
                    <label htmlFor="horaCierre" className="text-[#D2B48C]">Hora de Cierre</label>
                    <Input
                      id="horaCierre"
                      name="close_time"
                      type="time"
                      value={formData.close_time}
                      onChange={handleInputChange}
                      required
                      className="bg-[#1E2330] text-[#D2B48C] border-[#D2B48C]/20"
                      aria-label="Hora de Cierre"
                    />
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <label htmlFor="telefono" className="text-[#D2B48C]">Número de Teléfono</label>
                  <Input
                    id="telefono"
                    name="phone_number"
                    type="phone"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                    className="bg-[#1E2330] text-[#D2B48C] border-[#D2B48C]/20"
                  />
                </div>
              )}
              {step === 5 && (
                <div className="flex flex-col gap-2 justify-center items-center space-y-4 text-[#D2B48C]">
                  <p><strong>Nombre:</strong> {formData.name}</p>
                  <p><strong>Dirección:</strong> {formData.address}</p>
                  <p><strong>Horario:</strong> {formData.open_time} - {formData.close_time}</p>
                  <p><strong>Teléfono:</strong> {formData.phone_number}</p>
                </div>
              )}
            </form>
                    </CardBody>
                    <CardFooter>
                        {step > 1 && (
                            <Button onClick={handlePreviousStep} variant="outline" className="bg-transparent text-[#D2B48C] border-[#D2B48C] hover:bg-[#D2B48C] hover:text-[#1E2330]">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                            </Button>
                        )}
                        {step < 5 ? (
                            <Button onClick={handleNextStep} className="ml-auto bg-[#D2B48C] text-[#1E2330] hover:bg-[#C1A478]">
                                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button onClick={onSubmit} disabled={isLoading} className="ml-auto bg-[#D2B48C] text-[#1E2330] hover:bg-[#C1A478]">
                                {isLoading ? (
                                    <>
                                        <Spinner/>
                                        Registrando...
                                    </>
                                ) : (
                                    <>
                                        Registrar Restaurante
                                    </>
                                )}
                            </Button>
                        )}


                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
