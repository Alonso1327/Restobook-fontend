import { Button, Card, CardBody, CardHeader, Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, HandPlatter, Tally1 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState} from "react";
import { useParams } from "react-router-dom";
import { createTable, deleteTable, getTablesByRestaurant } from "../utils/apiConfig";

function MesaNoFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <HandPlatter className="size-24" />
            <p className="text-xl font-semibold">No hay mesas Registrada</p>
        </div>
    )
}


function RestaurantTables() {


    // States
    const [mesas, setMesas] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form inputs
    const [tableNumber, setTableNumber] = useState("");
    const [description, setDescription] = useState("");
    const [capasity, setCapasity] = useState("");
    const [ubication, setUbication] = useState("");


    const {restaurantId} = useParams();
    const rowsPerPage = 4;

    const pages = Math.ceil(mesas.length / rowsPerPage);

    const items = useMemo(()=>{
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return mesas.slice(start, end);
    }, [page, mesas])

    useEffect(() => {
        const fetchTables = async () => {
            try{
                setLoading(true);
                const data = await getTablesByRestaurant(restaurantId);
                setMesas(data)
            }catch(err){
                console.log('Error', err);
                setLoading(false);
            }finally{
                setLoading(false);
            }
        }

        fetchTables();
    },[])

    const handleAddTable = async (e) => {
        e.preventDefault();
        try {
            const newTable = { table_number: tableNumber, capacity:parseInt(capasity, 10), description: description};
            const createdTable = await createTable(restaurantId, newTable);
            console.log('New Table Data without ID: ', newTable ,'Response: ', createdTable);
            newTable['id'] = createdTable['table_id'];
            console.log('New Table Data with ID: ', newTable, 'Response: ', createdTable);
            setMesas([...mesas, newTable]);
            console.log("Mesas created", createdTable, mesas);
            setTableNumber('')
            setCapasity('')
            setDescription('')
        } catch (err) {
            console.log('Mesas ', mesas)
            console.error(err);
        }
    }

    const handleDeleteTable = async (tableId) => {
        try{
            await deleteTable(restaurantId,tableId);
            setMesas(prevMesas => {
                const updatedTable = prevMesas.filter(m=> m.id !== tableId);
                console.log('Updated mesas: ', updatedTable);
                return updatedTable;
            });
        }catch(e){
            console.log('Delete table failed', e);
        }
    }

    // const handleEdit

    const renderCell = useCallback((mesa, columnKey) => {
        const cellValue = mesa[columnKey]

        switch (columnKey) {
            case 'actions':
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Editar Mesa">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                       
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() =>{handleDeleteTable(mesa.id); console.log(mesa.id)} } className="cursor-pointer"/>
                            </span>
                        
                    </div>
                );
            default:
                return (<>{cellValue}</>)
        }
    })

    const colums = [
        {
            key: "table_number",
            label: "Numbero"
        },
        {
            key: "description",
            label: "Descripcion"
        },
        {
            key: "capacity",
            label: "Capacidad"
        },
        // {
        //     key: "ubication",
        //     label: "Ubicacion"
        // },
        {
            key: "actions",
            label: "Acciones"
        }
    ]

    return (
        <>
            <Card>
                <CardHeader className="flex flex-col items-start gap-1">
                    <h1 className="text-2xl font-bold">Información del Restaurante</h1>
                    <p className="text-sm text-default-500">Modifica la información de tu restaurante aquí</p>
                </CardHeader>
                <CardBody>
                    <Table
                        bottomContent={
                            <div className="flex w-full justify-center">
                              <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                              />
                            </div>
                          }
                          classNames={{
                            wrapper: "min-h-[222px]",
                          }}
                    >
                        <TableHeader columns={colums}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={items} emptyContent={<MesaNoFound />}>
                            {
                                (item) => (
                                    <TableRow key={item.id}>
                                        {
                                            (columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>

                                        }
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                    <form className="flex flex-col gap-3"  onSubmit={handleAddTable} >
                        <Input label="Numero Mesa" variant="underlined" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} isRequired></Input>
                        <Input label="Capacidad" variant="underlined" value={capasity} onChange={(e) => setCapasity(e.target.value)} isRequired></Input>
                        <Input label="Descripcion" variant="underlined" value={description} onChange={(e) => setDescription(e.target.value) } isRequired></Input>
                        <Button type="submit" className="w-full sm:w-1/2 bg-[#D2B48C] text-[#1E2330] hover:bg-[#C1A478] self-center font-semibold">Añádir Mesa</Button>
                    </form>
                </CardBody>
            </Card>
        </>
    )
}

export default RestaurantTables;
