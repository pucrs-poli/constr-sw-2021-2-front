import { MenuBook, Room, Search } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AppTable from '../../components/AppTable';
import './Salas.css';
import { SalaConfirmaDialog, acoes } from '../../components/SalaConfirmaDialog';
import { Add } from "@mui/icons-material";
import Sala from '../../model/Sala';
import { getAllRooms, deleteRoomById, createRoom, updateRoom } from '../../services/Salas/Salas'

export default function Salas() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState(() => { console.log('lol') });
    const [modalActionName, setModalActionName] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});
    const [tableList, setTableList] = useState([]);

    const keysLabels = {
        displayName: "Nome e Prédio",
        capacity: "Capacidade",
    };

    const titleKey = "id";

    useEffect(() => {
        async function fetchRooms() {
            const data = (await getAllRooms()).data;
            const tableContent = [];
            for (const el of data) {
                const id = el.id
                const building = el.building;
                const capacity = el.capacity;
                const roomName = el.name
                const displayName = `${el.name} - ${el.building.name}`
                const newRoom = new Sala(id, roomName, building, capacity, displayName);
                tableContent.push(newRoom);
            }
            setTableList(tableContent);
        }
        fetchRooms();
    }, [])


    const handleCRUDClick = (id, actionType) => {
        let SalaItem = tableList.find(objSala => { return objSala.id === id });
        if (!SalaItem)
            SalaItem = new Sala();
        let action = undefined;
        switch (actionType) {
            case 'Editar':
                action = e => {
                    console.log(e);
                    handleItemEditar(SalaItem)
                }
                break;
            case 'Cadastrar':
                action = () => { handleItemSalvar(SalaItem); }
                break;
            case 'Excluir':
                action = () => { handleItemExcluir(SalaItem) }
                break;
            default:
                console.log("Invalid");
        }

        openModal(action, SalaItem, actionType);
    }

    const openModal = (action, itemProps, actionName) => {
        setModalAction(() => action);
        setModalItem(itemProps);
        setModalOpen(true);
        setModalActionName(actionName)
    }

    const handleItemEditar = async (item, e) => {
        const updateObj = new Sala(item.id,
            item.name, item.classBuilding,
            item.capacity,
            `${item.name} - ${item.classBuilding.name}`);

        await updateRoom(updateObj).then((result) => {
            const copy = [...tableList]
            const elIndex = copy.findIndex((el) => el.id === updateObj.id);
            copy[elIndex] = updateObj;
            setTableList(copy);
        }).catch((err) => {
            console.log("Not able to update new Room");
        })
    }

    const handleItemSalvar = async (item) => {
        const newItem = new Sala("", item.name, item.classBuilding, item.capacity)
        await createRoom(newItem).then((result) => {
            console.log(result);
            newItem.id = result.data.id;
            newItem.displayName = `${item.name} - ${result.data.building.name}`;
            setTableList([...tableList, newItem]);
        }).catch((err) => {
            console.log("Not able to create new Room");
        });

    }

    const handleItemExcluir = async (item) => {
        const index = tableList.find((el) => el.id === item.id);
        if (index) {
            await deleteRoomById(index.id).then(() => {
                const newArr = tableList.filter((el) => el.id !== item.id);
                setTableList(newArr);
            }).catch((err) => {
                console.log("Delete not done");
            });
        }
    }

    const handleSearch = (value) => {
        return;
        const upperValue = value.toUpperCase()
        let auxList = []
        for (let i = 0; i < tableList.length; i++) {
            const item = tableList[i]
            if (item.classNumber.toUpperCase().includes(upperValue)) {
                auxList.push(item)
            }
        }
        setTableList(auxList)
    }

    return (
        <Box
            sx={{
                mx: { lg: 24, xl: 36 },
                mt: 4,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <div class="title">
                    <MenuBook fontSize="large" />
                    <Box sx={{ ml: 1 }}>
                        Salas
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <TextField
                        id="outlined-basic"
                        placeholder="Pesquisar sala"
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" >
                                    <Search />
                                </InputAdornment>
                            ),
                            style: {
                                backgroundColor: 'white'
                            },
                        }}
                        onChange={(e) => {
                            handleSearch(e.target.value)
                        }}
                    />
                </Box>
            </Box>

            <AppTable
                items={tableList}
                keysLabels={keysLabels}
                titleKey={titleKey}
                onEditClick={(id, event) => { console.log(event); handleCRUDClick(id, acoes.edita) }}
                onRemoveClick={(id) => handleCRUDClick(id, acoes.remove)}
            ></AppTable>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ minWidth: 150 }}
                    onClick={() => handleCRUDClick(null, acoes.cria)}
                ><Add />Adicionar</Fab>
            </Box>

            <SalaConfirmaDialog
                open={modalOpen}
                action={modalAction}
                actionType={modalActionName}
                item={modalItem}
                toggleModal={(open) => setModalOpen(open)} />

        </Box >
    );
}
