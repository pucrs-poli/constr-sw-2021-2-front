import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppTable from '../../components/AppTable';
import { ClassConfirmationDialog, actionTypes } from '../../components/ClassConfirmationDialog';
import './Classes.css';
import { Add } from "@mui/icons-material";
import Class from '../../model/Class';

export default function Classes() {
    const keysLabels = {
        group: "Grupo",
        resources: "Recursos",
    };

    const titleKey = "title";

    const mockClasses = [
        new Class('0001', 'Apresentação Trabalho Constr. Software', 'T11', 'Notebook #32'),
        new Class('0002', 'Inteligência Artificial', 'T9', 'Controle Remoto #32'),
        new Class('0003', 'Natação Aula Prática', 'T13', 'Projetor #32'),
        new Class('0004', 'Aula no Prédio 90', 'T12A', 'Câmera #32'),
    ]
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});

    const handleCRUDClick = (id, actionType) => {
        const classItem = id
            ? mockClasses.find(objClass => objClass.id === id)
            : new Class();

        openModal(actionType, classItem);
    }

    const openModal = (action, itemProps) => {
        setModalAction(action);
        setModalItem(itemProps);
        setModalOpen(true);
    }

    const handleSearchInputChange = (event) => {
        const searchString = event.target.value;
        // TODO: chamar serviço que filtra a aula.
    }

    return (
        <Box sx={{ mx: { lg: 24, xl: 36 }, mt: 4, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <div className="title">
                    <MenuBook fontSize="large" />
                    <Box sx={{ ml: 1 }}>
                        Aulas
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <TextField id="outlined-basic" placeholder="Pesquisar aula" variant="filled" onChange={handleSearchInputChange} InputProps={{
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

            <AppTable items={mockClasses} keysLabels={keysLabels} titleKey={titleKey} onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)} onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}></AppTable>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Fab variant="extended" color="primary" sx={{ minWidth: 150 }} onClick={() => handleCRUDClick(null, actionTypes.create)}><Add />CRIAR</Fab>
            </Box>

            <ClassConfirmationDialog open={modalOpen} action={modalAction} item={modalItem} toggleModal={(open) => setModalOpen(open)} />
        </Box >
    );
}
