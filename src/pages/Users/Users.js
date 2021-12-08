import { Person, Add } from "@mui/icons-material";
import { InputBase, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { actionTypes, UserModal } from '../../components/Users/UserModal';
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from '../../components/Spinner'
import UserTable from '../../components/Users/UserTable';
import UserModel from '../../model/UserModel';
import { selectAllUsers, fetchUsers, originUsers, setUsers, resetErrorStatus } from "./UserSlice";

import './Users.css';

export default function Users() {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const allUsers = useSelector(originUsers)

  const usersStatus = useSelector((state) => state.users.status)
  const fetchStatus = useSelector((state) => state.users.fetchStatus)
  const error = useSelector((state) => state.users.error)

  React.useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [usersStatus, dispatch])

    let content

    if (fetchStatus === 'loading') {
        content = <Spinner text="Carregando usuários..." />
    } else if (fetchStatus === 'succeeded') {
        content = <UserTable items={users} onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)} onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}></UserTable>    
    } else if (fetchStatus === 'failed') {
        alert(error)
    }

    if (usersStatus === 'failed' ) {
        alert(error)
        dispatch(resetErrorStatus());
    }

    const handleSearchBarValueChange = (event) => {
        if (event.target.value === "") {
            dispatch(fetchUsers());
        } else {
            const filteredUsers = allUsers.filter((user) => 
            (user.nome.includes(event.target.value) || 
            user.email.includes(event.target.value) ||
            user.matricula.includes(event.target.value)))

            dispatch(setUsers(filteredUsers));
        }
    }

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});

    const handleCRUDClick = (id, actionType) => {
        const userItem = id
        ? users.find(objUser => objUser.id === id)
        : new UserModel();
        openModal(actionType, userItem);
    }

    const openModal = (action, itemProps) => {
        setModalAction(action);
        setModalItem(itemProps);
        setModalOpen(true);
    }

    const handleSearchInputChange = (event) => {
        const filteredUsers = allUsers.filter((user) => user.nome.includes(event.target.value) ||
                                                        user.email.includes(event.target.value) ||
                                                        user.matricula.includes(event.target.value)
        )
        setUsers(filteredUsers);
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
                            onChange={handleSearchBarValueChange}
                        />
                        <Button variant="contained" startIcon={<Add/>} onClick={() => handleCRUDClick(null, actionTypes.create)}>Adicionar</Button>
                    </Box>
                </Box>
                {content}
            </Box >
            <UserModal open={modalOpen} action={modalAction} item={modalItem} toggleModal={(open) => setModalOpen(open)} />
        </div>
    );
}