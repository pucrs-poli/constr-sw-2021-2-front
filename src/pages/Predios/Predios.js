import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppTable from '../../components/AppTable';
import './Predios.css';
import { PredioConfirmaDialog, acoes } from '../../components/PredioConfirmaDialog';
import { Add } from "@mui/icons-material";
import Predio from '../../model/Predio';

export default function Predios() {
    const keysLabels = {
        name: "Nome",
        reference: "Referência",
    };

    const titleKey = "number";

    const mockPredios = [
        new Predio('1', '32', 'Prédio 32 - Politécnica', 'Ao lado biblioteca'),
        new Predio('2', '40', 'Prédio 40 - Adminstração', 'Em frente ao Maza')
    ];

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});

    const handleCRUDClick = (id, actionType) => {
        const PredioItem = id
            ? mockPredios.find(objPredio => objPredio.id === id)
            : new Predio();// Passar os parametros para criação do novo prédio

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
                items={mockPredios}
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

            <PredioConfirmaDialog
                open={modalOpen}
                action={modalAction}
                item={modalItem}
                toggleModal={(open) => setModalOpen(open)} />

        </Box >
    );
}
