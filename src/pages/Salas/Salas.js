import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AppTable from '../../components/AppTable';
import './Salas.css';
import { SalaConfirmaDialog, acoes, returnedActionObject } from '../../components/SalaConfirmaDialog';
import { Add } from "@mui/icons-material";
import Sala from '../../model/Sala';

export default function Salas() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState(() => { console.log('lol') });
    const [modalActionName, setModalActionName] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});
    const [tableList, setTableList] = useState([
        new Sala('1', '00001001', 'Sala 302 - Prédio 32', '50'),
        new Sala('2', '00001002', 'Sala 301 - Prédio 40', '50'),
        new Sala('3', '00001003', 'Sala 200 - Prédio 45', '50'),
        new Sala('4', '00001004', 'Sala 500 - Prédio 30', '50')
    ]);
    const [itemIndex, setitemIndex] = React.useState(4);

    const keysLabels = {
        classBuilding: "Nome e Prédio",
        capacity: "Capacidade",
    };

    const titleKey = "classNumber";

    useEffect(() => {
        setTableList(tableList)
    }, [])


    const handleCRUDClick = (id, actionType) => {
        const SalaItem = id
            ? tableList.find(objSala => objSala.id === id)
            : new Sala();

        let action = undefined;
        switch (actionType) {
            case 'Editar':
                action = () => { handleItemEditar(SalaItem) }
                break;
            case 'Cadastrar':
                action = () => { handleItemSalvar(SalaItem) }
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

    const handleItemEditar = (item) => {
        for (let i = 0; i < tableList.length; i++) {
            const incommingItem = tableList[i]
            if (incommingItem.id === item.id) {
                tableList.splice(i, 1, item)
            }
        }
        setTableList(tableList)
    }

    const handleItemSalvar = (item) => {
        const id = `${itemIndex}`
        const newItem = new Sala(id, item.classNumber, item.classBuilding, item.capacity)
        setitemIndex((itemIndex + 1))
        tableList.push(newItem)
        setTableList(tableList)
    }

    const handleItemExcluir = (item) => {
        const newArr = tableList.filter((el) => el.id !== item.id);
        setTableList(newArr);
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
                        }} />
                </Box>
            </Box>

            <AppTable
                items={tableList}
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
