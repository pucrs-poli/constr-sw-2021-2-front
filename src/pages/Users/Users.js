import { Person, Add } from "@mui/icons-material";
import { InputBase, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { UserModal, actionTypes } from "../../components/Users/UserModal";
import UserTable from "../../components/Users/UserTable";
import UserModel from "../../model/UserModel";

import "./Users.css";

export default function Users() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState("");
    const [modalItem, setModalItem] = React.useState({});
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const users = [
            new UserModel(
                "rabelo@example.com",
                "rabelo",
                "Gabriel Rabelo",
                ["Admin", "Professor"],
                "32131"
            ),
            new UserModel(
                "calebe@example.com",
                "calebe",
                "Calebe Rocha",
                ["Estudante"],
                "12345"
            ),
        ];
        setUsers(users);
    };

    const handleCRUDClick = (reg, actionType) => {
        const userItem = reg
            ? users.find((objUser) => objUser.reg === reg)
            : new UserModel();

        openModal(actionType, userItem);
    };

    const openModal = (action, itemProps) => {
        setModalAction(action);
        setModalItem(itemProps);
        setModalOpen(true);
    };

    const handleSearchInputChange = (event) => {
        const searchString = event.target.value;
        // TODO: chamar serviço que filtra a aula.
    };

    const handleEditUser = (user, password) => {
        const userIndex = users.findIndex(
            (objUser) => objUser.reg === user.reg
        );
        console.log({ user, userIndex, password });
        if (userIndex === -1) {
            console.error("Usuário não encontrado", user);
            return;
        }
        if (password) {
            user["password"] = password;
        }
        users[userIndex] = user;
        setUsers(users);
    };

    return (
        <div>
            <Box sx={{ mt: 4 }} className="users-content">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <div className="title">
                        <Person fontSize="large" style={{ fill: "#647A79" }} />
                        <Box sx={{ ml: 1 }}>Usuários</Box>
                    </div>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <InputBase
                            sx={{ mr: 1 }}
                            placeholder="Pesquisar"
                            onChange={handleSearchInputChange}
                            inputProps={{
                                style: {
                                    backgroundColor: "#F2F2F2",
                                    color: "#647A79",
                                    borderRadius: "6px",
                                    padding: "7px 16px",
                                    wregth: "150px",
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() =>
                                handleCRUDClick(null, actionTypes.create)
                            }
                        >
                            Adicionar
                        </Button>
                    </Box>
                </Box>

                <UserTable
                    items={users}
                    onEditClick={(reg) =>
                        handleCRUDClick(reg, actionTypes.edit)
                    }
                    onRemoveClick={(reg) =>
                        handleCRUDClick(reg, actionTypes.remove)
                    }
                ></UserTable>
            </Box>

            <UserModal
                open={modalOpen}
                action={modalAction}
                item={modalItem}
                editUserAction={handleEditUser}
                toggleModal={(open) => setModalOpen(open)}
            />
        </div>
    );
}
