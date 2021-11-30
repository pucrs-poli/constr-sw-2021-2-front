import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppTable from '../../components/AppTable';
import { ClassConfirmationDialog, actionTypes } from '../../components/ClassConfirmationDialog';
import './Classes.css';
import { Add } from "@mui/icons-material";

export default function Classes() {
    const mockClass = { title: 'Construção de Software', group: 'T102', resources: 'Notebook #32' };
    const mockClasses = Array(4).fill(mockClass);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState('');

    const onCreateClick = () => {
        openModal(actionTypes.create);
    }

    const onEditClick = () => {
        openModal(actionTypes.edit);
    }

    const onDeleteClick = () => {
        openModal(actionTypes.remove);
    }

    const openModal = (action) => {
        setModalAction(action);
        setModalOpen(true);
    }

    return (
        <Box sx={{ mx: { lg: 24, xl: 36 }, mt: 4, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <div class="title">
                    <MenuBook fontSize="large" />
                    <Box sx={{ ml: 1 }}>
                        Aulas
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <TextField id="outlined-basic" placeholder="Pesquisar aula" variant="filled" InputProps={{
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

            <AppTable items={mockClasses} onEditClick={onEditClick} onDeleteClick={onDeleteClick}></AppTable>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Fab variant="extended" color="primary" sx={{ minWidth: 150 }} onClick={onCreateClick}><Add />CRIAR</Fab>
            </Box>

            <ClassConfirmationDialog open={modalOpen} action={modalAction} />
        </Box >
    );
}