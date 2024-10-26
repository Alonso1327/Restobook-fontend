import { Button, Card, CardBody, CardHeader, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

function RestauranteMenu() {
    return (
        <>
            <Card>
                <CardHeader>
                    <h1>Gestión del Menú</h1>
                    <p>Añade o modifica los platos de tu menú.</p>
                </CardHeader>
                <CardBody className="space-y-4">
                    {/* <Table>
                        <TableHeader>
                            <TableRow>
                                <TableColumn>Nombre</TableColumn>
                                <TableColumn>Descripción</TableColumn>
                                <TableColumn>Precio</TableColumn>
                                <TableColumn>Acciones</TableColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>Tony Reichert</TableCell>
                                <TableCell>CEO</TableCell>
                                <TableCell>Active</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>Zoey Lang</TableCell>
                                <TableCell>Technical Lead</TableCell>
                                <TableCell>Paused</TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell>Jane Fisher</TableCell>
                                <TableCell>Senior Developer</TableCell>
                                <TableCell>Active</TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell>William Howard</TableCell>
                                <TableCell>Community Manager</TableCell>
                                <TableCell>Vacation</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table> */}
                    {/* <div className="space-y-2">

                        <Input
                            label="Nombre del plato"
                            name="name"
                            placeholder="Nombre del plato"
                            className="bg-[#3A4155] border-[#D2B48C]/20 text-[#E6D0B3] placeholder-[#D2B48C]/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            label="Descripción"
                            name="description"
                            placeholder="Descripción del plato"
                            className="bg-[#3A4155] border-[#D2B48C]/20 text-[#E6D0B3] placeholder-[#D2B48C]/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            label="Precio"
                            name="price"
                            placeholder="Precio"
                            className="bg-[#3A4155] border-[#D2B48C]/20 text-[#E6D0B3] placeholder-[#D2B48C]/50"
                        />
                    </div>
                    <Button className="w-full bg-[#D2B48C] text-[#1E2330] hover:bg-[#C1A478]">
                        Añadir Plato
                    </Button> */}
                </CardBody>
            </Card>
        </>
    );
}

export default RestauranteMenu;
