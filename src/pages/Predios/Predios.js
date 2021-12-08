import { MenuBook, Search, TextSnippet } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import AppTable from '../../components/AppTable';
import './Predios.css';
import { PredioConfirmaDialog, acoes } from '../../components/PredioConfirmaDialog';
import { Add } from "@mui/icons-material";
import Predio from '../../model/Predio';
import { getAllBuilding, deleteBuildingById, createBuilding, updateBuilding } from '../../services/Predios/Predios'


export default function Predios() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState(() => { });
    const [modalActionName, setModalActionName] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});
    const [tableList, setTableList] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [redirectState, setRedirectState] = useState({});

    const keysLabels = {
        name: "Nome",
        location: "Localização",
    };

    const titleKey = "id";

    useEffect(() => {
        async function fetchPredios() {
            const data = (await getAllBuilding()).data;
            const tableContent = [];
            for (const el of data) {
                const id = el.id
                const name = el.name;
                const location = el.location;
                const newBuilding = new Predio(id, name, location);
                tableContent.push(newBuilding);
            }
            setTableList(tableContent);
        }
        fetchPredios();
    }, [])

    const handleCRUDClick = (id, actionType) => {
        let PredioItem = tableList.find(objPredio => { return objPredio.id === id });
        if (!PredioItem)
            PredioItem = new Predio();
        let action = undefined;
        switch (actionType) {
            case 'Editar':
                action = () => { handleItemEditar(PredioItem) }
                break;
            case 'Cadastrar':
                action = () => { handleItemSalvar(PredioItem); }
                break;
            case 'Excluir':
                action = () => { handleItemExcluir(PredioItem) }
                break;
            default:
                console.log("Invalid");
        }

        openModal(action, PredioItem, actionType);
    }

    const handleItemEditar = async (item) => {
        const updateObj = new Predio(item.id,
            item.name, item.location);

        await updateBuilding(updateObj).then((result) => {
            const copy = [...tableList]
            const elIndex = copy.findIndex((el) => el.id === updateObj.id);
            copy[elIndex] = updateObj;
            setTableList(copy);
        }).catch((err) => {
            console.log("Not able to update new Room");
        })
    }

    const handleItemSalvar = async (item) => {
        const newItem = new Predio("", item.name, item.location)
        await createBuilding(newItem).then((result) => {
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
            await deleteBuildingById(index.id).then(() => {
                const newArr = tableList.filter((el) => el.id !== item.id);
                setTableList(newArr);
            }).catch((err) => {
                console.log("Delete not done");
            });
        }
    }

    const handleRedirect = async (item) => {
        const obj = tableList.find((el) => el.id === item);
        localStorage.setItem("predios_salas", JSON.stringify(obj));
        setRedirect(true);
    }

    const openModal = (action, itemProps, actionName) => {
        setModalAction(() => action);
        setModalItem(itemProps);
        setModalOpen(true);
        setModalActionName(actionName)
    }
    if (redirect) {
        return <Navigate to="/sala_predios" />;
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
                        Predios
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <TextField
                        id="outlined-basic"
                        placeholder="Busca prédio"
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
                items={tableList}
                keysLabels={keysLabels}
                titleKey={titleKey}
                onEditClick={(id) => handleCRUDClick(id, acoes.edita)}
                onRemoveClick={(id) => handleCRUDClick(id, acoes.remove)}
                onClickItem={(id) => handleRedirect(id)}
            ></AppTable>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ minWidth: 150 }}
                    onClick={() => handleCRUDClick(null, acoes.cria)}
                ><Add />Adicionar</Fab>
            </Box>

            <PredioConfirmaDialog
                open={modalOpen}
                action={modalAction}
                actionType={modalActionName}
                item={modalItem}
                toggleModal={(open) => setModalOpen(open)}

            />

        </Box >
    );
}
