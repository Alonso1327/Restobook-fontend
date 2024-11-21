import { Button, Card, CardBody, CardHeader, getKeyValue, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { Book, DeleteIcon, EditIcon, EyeIcon, Menu } from "lucide-react";
import { useCallback, useState } from 'react';

function MenuNoFound() {
    return (
        <>
            <div className="flex items-center justify-center">
                <Book className="size-20" />
            </div>
            <h3 className="text-2xl font-semibold text-black">No Hay platos en el menú</h3>
        </>
    )
}

function RestauranteMenu() {
    const [menuItems, setMenuItems] = useState([]);

    const renderCell = useCallback((dish, columnKey) => {
        const cellValue = dish[columnKey]

        switch (columnKey) {
            case 'actions':
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Editar Platillo">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar Platillo">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return (<>{cellValue}</>)
        }
    })

    const addMenuItem = () => {
        const newItem = { name: 'Nuevo Plato', description: 'Descripción', price: '0.00' };
        setMenuItems([...menuItems, newItem]);
    };

    const columns = [
        {
            key: "name",
            label: "Nombre"
        },
        {
            key: "description",
            label: "Descripción"
        },
        {
            key: "price",
            label: "Precio"
        },
        {
            key: "actions",
            label: "Acciones"
        }
    ]



    return (
        <>
            <Card className="p-2">
                <CardHeader className="flex items-start flex-col gap-2">
                    <h1 className="text-2xl font-bold">Gestión del Menú</h1>
                    <p className="text-sm text-default-500">Añade o modifica los platos de tu menú</p>
                </CardHeader>
                <CardBody className="space-y-4">
                    <Table aria-label="Example static collection table">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={menuItems} emptyContent={<MenuNoFound />}>
                            {(item) => (
                                <TableRow key={item.name}>
                                    {(columKey) => <TableCell>{renderCell(item, columKey)}</TableCell>}
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                    <form className="flex flex-col gap-3">
                        <Input
                            label="Nombre del plato"
                            name="name"
                            placeholder="Nombre del plato"
                            className=" border-[#D2B48C]/20 text-[#E6D0B3] placeholder-[#D2B48C]/50"
                            isRequired
                        />
                        <Input
                            label="Descripción"
                            name="description"
                            placeholder="Descripción del plato"
                            className=" border-[#D2B48C]/20 text-[#E6D0B3] placeholder-[#D2B48C]/50"
                            isRequired
                        />
                        <Input
                            label="Precio"
                            name="price"
                            placeholder="Precio"
                            className=" border-[#D2B48C]/20 text-[#E6D0B3] placeholder-[#D2B48C]/50"
                            isRequired
                        />

                        <Button className="w-1/3 bg-[#D2B48C] text-[#1E2330] hover:bg-[#C1A478] self-center" onClick={addMenuItem}>
                            Añadir Plato
                        </Button>
                    </form>

                </CardBody>
            </Card>
        </>
    );
}

export default RestauranteMenu;
