import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AppTable from '../../components/AppTable';
import './Predio_Salas.css';
import { SalaConfirmaDialog, acoes } from '../../components/SalaConfirmaDialog';
import { Add } from "@mui/icons-material";
import o_Predio_Salas from '../../model/Predio_Salas';
import Sala from '../../model/Sala';
import { getRoomByBuilding } from '../../services/Predios/Predios';
import { deleteRoomById, createRoom, updateRoom } from '../../services/Salas/Salas'

export default function Predio_Salas(props) {

    const [tableList, setTableList] = useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState('');
    const [modalActionName, setModalActionName] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});
    const [buildingData, setBuildingData] = React.useState({});

    const keysLabels = {
        displayName: "Nome e Prédio",
        capacity: "Capacidade",
    };

    const titleKey = "id";

    useEffect(() => {
        const data = localStorage.getItem("predios_salas");
        setBuildingData(JSON.parse(data));
    }, [])

    useEffect(() => {
        async function fetchSalasByPredios(buildingName) {
            const data = (await getRoomByBuilding(buildingName)).data;
            const tableContent = [];
            for (const el of data) {
                const id = el.id
                const capacity = el.capacity;
                const roomName = el.name
                const displayName = `${roomName} - ${buildingData.name}`
                const newRoom = new Sala(id, roomName, buildingData.name, capacity, displayName);
                tableContent.push(newRoom);
            }
            setTableList(tableContent);
        }
        fetchSalasByPredios(buildingData.name);

    }, [buildingData])

    const predio_sala = new o_Predio_Salas(buildingData.id, buildingData.name, tableList);

    const handleCRUDClick = (id, actionType) => {
        let SalaItem = tableList.find(objSala => { return objSala.id === id });
        if (!SalaItem)
            SalaItem = new Sala();
        let action = undefined;
        switch (actionType) {
            case 'Editar':
                action = () => { handleItemEditar(SalaItem) }
                break;
            case 'Cadastrar em Prédio':
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

    const handleItemEditar = async (item) => {
        const updateObj = new Sala(item.id,
            item.name, item.classBuilding,
            item.capacity,
            `${item.name} - ${item.classBuilding}`);

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
        const displayName = `${item.name} - ${buildingData.name}`
        const newItem = new Sala("", item.name, buildingData.id, item.capacity, displayName)
        console.log(newItem)
        await createRoom(newItem).then((result) => {
            console.log(result);
            newItem.id = result.data.id;
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

    const openModal = (action, itemProps, actionName) => {
        setModalAction(() => action);
        setModalItem(itemProps);
        setModalOpen(true);
        setModalActionName(actionName)
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
                        Salas do {predio_sala.name}
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <TextField
                        id="outlined-basic"
                        placeholder="Busca sala"
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
                        }} />
                </Box>
            </Box>

            <AppTable
                items={predio_sala.salas}
                keysLabels={keysLabels}
                titleKey={titleKey}
                onEditClick={(id) => handleCRUDClick(id, acoes.edita)}
                onRemoveClick={(id) => handleCRUDClick(id, acoes.remove)}
            ></AppTable>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ minWidth: 150 }}
                    onClick={() => handleCRUDClick(null, acoes.cria_em_predio)}
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
