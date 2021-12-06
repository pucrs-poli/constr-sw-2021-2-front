import { Person, Add } from "@mui/icons-material";
import { InputBase, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { UserModal, actionTypes } from '../../components/Users/UserModal';
import UserTable from '../../components/Users/UserTable';
import UserModel from '../../model/UserModel';

import './Users.css';

export default function Users() {
    const mockUsers = [
        new UserModel('Gabriel Rabelo', '123456789','rabelo@example.com', ['Admin','Professor'], '32131', '2738' ),
    ]

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});

    const handleCRUDClick = (reg, actionType) => {
        const userItem = reg
            ? mockUsers.find(objUser => objUser.reg === reg)
            : new UserModel();

        openModal(actionType, userItem);
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
        <div>
            <Box sx={{mt: 4}} class="users-content">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <div class="title">
                        <Person fontSize="large" style={{fill: "#647A79"}}/>
                        <Box sx={{ ml: 1 }}>
                            Usuários
                        </Box>
                    </div>

                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <InputBase
                            sx={{ mr: 1 }}
                            placeholder="Pesquisar"
                            onChange={handleSearchInputChange}
                            inputProps={{
                                style:{
                                    backgroundColor: '#F2F2F2',
                                    color: "#647A79",
                                    borderRadius: '6px',
                                    padding: '7px 16px',
                                    wregth: '150px',
                                }
                            }}
                        />
                        <Button variant="contained" startIcon={<Add/>} onClick={() => handleCRUDClick(null, actionTypes.create)}>Adicionar</Button>
                    </Box>
                </Box>

                <UserTable items={mockUsers} onEditClick={(reg) => handleCRUDClick(reg, actionTypes.edit)} onRemoveClick={(reg) => handleCRUDClick(reg, actionTypes.remove)}></UserTable>
            </Box>

            <UserModal open={modalOpen} action={modalAction} item={modalItem} toggleModal={(open) => setModalOpen(open)} />
        </div>
    );
}