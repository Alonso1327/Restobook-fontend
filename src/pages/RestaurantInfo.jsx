import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { Edit, Save } from "lucide-react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { customFetch } from '../utils/customFetch';
import { API_ENDPOINTS } from '../utils/apiConfig';

function RestaurantInfo() {
    const [editableFields, setEditableFields] = useState({});
    const [restaurantInfo, setRestaurantInfo] = useState({});
    const {restaurantId} = useParams();
    const {auth} = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await handleGetInfo();
                setRestaurantInfo(data);
                setError(null);
            } catch (err) {
                console.error("Error al obtener la información del restaurante:", err);
                setError("No se pudo cargar la información del restaurante. Por favor, intente de nuevo más tarde.");
            }
        };
        fetchData();
    }, []);

    const handleGetInfo = async () => {
        try {
            const response = await customFetch(API_ENDPOINTS.restaurant(restaurantId), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Error en handleGetInfo:", err);
            throw err;
        }
    }

    const toggleEditable = (fieldName) => {
        setEditableFields(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName]
        }));
    };

    const renderInputField = (fieldName, label, placeholder, type = "text") => (
        <div className="flex items-end">
            <Input
                label={label}
                placeholder={placeholder}
                variant="underlined"
                labelPlacement="outside"
                isRequired
                type={type}
                value={restaurantInfo[fieldName] || ""}
                isReadOnly={!editableFields[fieldName]}
                onChange={(e) => setRestaurantInfo(prev => ({ ...prev, [fieldName]: e.target.value }))}
                classNames={{
                    label: "font-bold",
                    input: "md:text-lg sm:text-base",
                }}
            />
            <Button isIconOnly variant="light" className="ml-2" onClick={() => toggleEditable(fieldName)}>
                {editableFields[fieldName] ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            </Button>
        </div>
    );

    return (
        <>
            <Card className="flex flex-col gap-4 justify-center items-center">
                <CardHeader className="flex items-start flex-col gap-2">
                    <h1 className="text-2xl font-bold">Información del Restaurante</h1>
                    <p className="text-sm text-default-500">Modifica la información de tu restaurante aquí</p>
                </CardHeader>
                <CardBody>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }} className="grid md:grid-cols-2 sm:grid-cols-1 md:grid-rows-2 gap-4">
                            <div className="flex flex-col gap-10">
                                {renderInputField("name", "Nombre del Restaurante", "Nombre del Restaurante")}
                                {renderInputField("address", "Dirección", "Dirección del Restaurante")}
                                {renderInputField("phone_number", "Teléfono", "Número de teléfono")}
                            </div>
                            <div className="flex flex-col gap-10">
                                {renderInputField("open_time", "Hora de Apertura", "", "time")}
                                {renderInputField("close_time", "Hora de Cierre", "", "time")}
                                {/* Nota: El campo de imagen no está en los datos recibidos, así que lo dejamos como estaba */}
                                {renderInputField("imagenDelRestaurante", "Imagen del Restaurante", "Imagen del Restaurante", "file")}
                            </div>
                            <Button type="submit" className="col-span-1">Guardar</Button>
                        </form>
                    )}
                </CardBody>
            </Card>
        </>
    );
}

export default RestaurantInfo;
