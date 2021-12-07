import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppTable from '../../components/AppTable';
import './Predio_Salas.css';
import { SalaConfirmaDialog, acoes } from '../../components/SalaConfirmaDialog';
import { Add } from "@mui/icons-material";
import o_Predio_Salas from '../../model/Predio_Salas';
import Sala from '../../model/Sala';

export default function Predio_Salas() {
    const mockSalas = [
        new Sala('1', '00001001', 'Sala 302 - Prédio 32', '50'),
        new Sala('2', '00001001', 'Sala 301 - Prédio 40', '50'),
        new Sala('3', '00001001', 'Sala 200 - Prédio 45', '50'),
        new Sala('4', '00001001', 'Sala 500 - Prédio 30', '50'),
    ];

    const mockPredioSalas = new o_Predio_Salas(1, 32, mockSalas);

    const keysLabels = {
        id: "ID",
        classBuilding: "Nome e Prédio",
        capacity: "Capacidade",
    };

    const titleKey = "number";

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});

    const handleCRUDClick = (id, actionType) => {
        const PredioItem = id
            ? mockPredioSalas.salas.find(objPredio => objPredio.id === id)
            : new o_Predio_Salas();// Passar os parametros para criação do novo prédio

        openModal(actionType, PredioItem);
    }

    const openModal = (action, itemProps) => {
        setModalAction(action);
        setModalItem(itemProps);
        setModalOpen(true);
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
                        Salas do Prédio {mockPredioSalas.number}
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
                items={mockPredioSalas.salas}
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
                item={modalItem}
                toggleModal={(open) => setModalOpen(open)} />

        </Box >
    );
}
