import { Modal, DialogContentText, TextField, Button } from "@mui/material";
import {
    Box,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Checkbox,
    ListItemText,
} from "@mui/material";
import { Person, Close, Send } from "@mui/icons-material";
import React from "react";

export const actionTypes = {
    create: "Cadastrar",
    edit: "Editar",
    remove: "Excluir",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const rolesArr = ["Admin", "Professor", "Estudante"];

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFFFFF",
    border: "none",
    padding: "20px",
    borderRadius: "22px",
};

export function UserModal(props) {
    const {
        action: actionText,
        item: userItem,
        open: modalOpen,
        toggleModal,
        editUserAction,
    } = props;

    const [user, setUser] = React.useState({});
    const [roles, setRoles] = React.useState([]);
    const [changingPassword, setChangingPassword] = React.useState(false);
    const [passwords, setPasswords] = React.useState(["", ""]);

    React.useEffect(() => {
        console.log(props);
        setUser(userItem);
        setRoles(userItem.roles || []);
        setChangingPassword(false);
        setPasswords(["", ""]);
    }, [userItem, modalOpen]);

    const handleChangeRoles = (event) => {
        const {
            target: { value },
        } = event;

        const newRoles = typeof value === "string" ? value.split(",") : value;
        setRoles(newRoles);
        setUser({ ...user, roles: newRoles });
    };

    const handleConfirmClick = () => {
        if (changingPassword && passwords[0] !== passwords[1]) {
            alert("Senhas não conferem");
            return;
        }

        console.log(user);
        editUserAction &&
            typeof editUserAction === "function" &&
            editUserAction(user, changingPassword ? passwords[0] : undefined);
        closeDialog();
    };

    const handleCancelClick = () => {
        closeDialog();
    };

    const onValueChange = (event, attribute) => {
        if (attribute === "firstPassword") {
            setPasswords([event.target.value, passwords[1]]);
            setChangingPassword(true);
            return;
        }
        if (attribute === "secondPassword") {
            setPasswords([passwords[0], event.target.value]);
            setChangingPassword(true);
            return;
        }

        if (!user[attribute]) {
            return;
        }

        setUser({ ...user, [attribute]: event.target.value });
    };

    const closeDialog = () => {
        toggleModal(false);
    };

    const createEditTemplate = () => (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    marginBottom: "10px",
                }}
            >
                <TextField
                    id="standard-basic"
                    onChange={(event) => onValueChange(event, "reg")}
                    defaultValue={user.reg}
                    label="Matrícula"
                    variant="standard"
                />
                <TextField
                    id="standard-basic"
                    onChange={(event) => onValueChange(event, "login")}
                    defaultValue={user.login}
                    label="Nome de Usuário"
                    variant="standard"
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    marginBottom: "10px",
                }}
            >
                <TextField
                    id="standard-basic"
                    onChange={(event) => onValueChange(event, "name")}
                    defaultValue={user.name}
                    label="Nome de Perfil"
                    variant="standard"
                />
                <TextField
                    id="standard-basic"
                    onChange={(event) => onValueChange(event, "email")}
                    defaultValue={user.email}
                    label="E-mail"
                    variant="standard"
                />
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
                <InputLabel id="roles">Papéis</InputLabel>
                <Select
                    labelId="roles"
                    id="roles-select"
                    multiple
                    value={roles}
                    onChange={handleChangeRoles}
                    sx={{ minWidth: "100%" }}
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {rolesArr.map((rol) => (
                        <MenuItem key={rol} value={rol}>
                            <Checkbox checked={roles.indexOf(rol) > -1} />
                            <ListItemText primary={rol} />
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <TextField
                    id="standard-basic"
                    onChange={(event) => onValueChange(event, "firstPassword")}
                    defaultValue={user.password}
                    label="Senha"
                    type="password"
                    variant="standard"
                />
                <TextField
                    id="standard-basic"
                    onChange={(event) => onValueChange(event, "secondPassword")}
                    defaultValue={user.password}
                    label="Repetir Senha"
                    type="password"
                    variant="standard"
                />
            </Box>
        </div>
    );

    const deleteTemplate = () => (
        <main>
            <DialogContentText>
                Tem certeza que deseja excluir o usuário <b>{user.userName}</b>?
            </DialogContentText>
        </main>
    );

    const getTemplate = () => {
        switch (actionText) {
            case actionTypes.create:
            case actionTypes.edit:
                return createEditTemplate();
            case actionTypes.remove:
                return deleteTemplate();
            default:
                return "";
        }
    };

    return (
        <Modal open={modalOpen}>
            <Box sx={style}>
                <Box id="modal-header" sx={{ display: "flex", mb: 2 }}>
                    <div className="title">
                        <Person fontSize="large" style={{ fill: "#647A79" }} />
                        <Box sx={{ ml: 1, color: "#647A79" }}>Usuários /</Box>
                    </div>
                    <div className="title">
                        <Box sx={{ ml: 1 }}>{actionText} Usuário</Box>
                    </div>
                </Box>
                <Box
                    id="modal-body"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 2,
                        gap: "10px",
                    }}
                >
                    {getTemplate()}
                </Box>
                <Box
                    id="modal-footer"
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 3,
                        gap: "10px",
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleCancelClick}
                        startIcon={<Close />}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<Send />}
                        onClick={handleConfirmClick}
                    >
                        {actionText === actionTypes.remove
                            ? "Excluir"
                            : "Salvar"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
