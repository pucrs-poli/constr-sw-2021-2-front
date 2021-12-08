import { Modal, DialogContentText, TextField, Button } from '@mui/material';
import { Box, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText} from '@mui/material';
import { Person, Close, Send } from "@mui/icons-material";
import React from 'react';
import { useDispatch } from 'react-redux'
import { addNewUser, deleteUser, updateUser } from '../../pages/Users/UserSlice';

export const actionTypes = {
    create: 'Cadastrar',
    edit: 'Editar',
    remove: 'Excluir'
}

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

const rolesArr = [
    'ADMIN',
    'PROFESSOR',
    'ALUNO',
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    border: 'none',
    padding: '20px',
    borderRadius: '22px',
};

export function UserModal(props) {
    const dispatch = useDispatch()
    const actionText = props.action;
    const userItem = props.item;

    const [open] = React.useState(false);
    const [user, setUser] = React.useState({});
    const [roles, setRoles] = React.useState([]);
    const [passwords, setPasswords] = React.useState(["", ""]);

    React.useEffect(() => {
        setUser(userItem);
        setRoles(userItem.papeis ? userItem.papeis.map((item) => item.nome) : []);
        setPasswords(["", ""]);
    }, [userItem, open]);

    const handleChangeRoles = (event) => {
        const {
            target: { value },
        } = event;

        const newRoles = typeof value === "string" ? value.split(",") : value;
        setRoles(newRoles);
        setUser({ ...user, papeis: newRoles });
    };

    const handleConfirmClick = () => {
         if (!validation()) {
             return;
         }

        switch (actionText) {
            case actionTypes.create:
                dispatch(addNewUser(user));
                break;
            case actionTypes.edit:
                console.log(user, "item");
                dispatch(updateUser(user.id, user));
                break;
            case actionTypes.remove:
                dispatch(deleteUser(user.id));
                break;
            default:
                break;
        }
        closeDialog();
    }

    const validation = ()  => {
        if (user.matricula.length !== 9) {
            alert("O número de matrícula deve ter 9 digítos")
            return false;
        }

        if (!roles.length) {
            alert("É necessário selecionar pelo menos um papel")
            return false;
        }

        if (passwords[0] !== passwords[1]) {
            alert("Senhas não conferem");
            return false;
        }

        return true;
    }

    const handleCancelClick = () => {
        closeDialog();
    }

    const onValueChange = (event, attribute) => {
        if (attribute === "senha") {
            setPasswords([event.target.value, passwords[1]]);
        }
        if (attribute === "secondPassword") {
            setPasswords([passwords[0], event.target.value]);
            return;
        }

        setUser({ ...user, [attribute]: event.target.value });
    }

    const closeDialog = () => {
        props.toggleModal(false);
    }

    const createEditTemplate = () => (
        <div>
            <Box sx={{ display: 'flex', flexDirection: "row", gap: "20px", marginBottom: "10px"}}> 
                <TextField 
                    id="standard-basic matricula"
                    onChange={(event) => onValueChange(event, 'matricula')}
                    defaultValue={userItem.matricula}
                    label="Matrícula" variant="standard"
                />
                <TextField 
                    id="standard-basic login"
                    onChange={(event) => onValueChange(event, 'login')} 
                    defaultValue={userItem.login}
                    label="Nome de Usuário" 
                    variant="standard"
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: "row", gap: "20px", marginBottom: "10px" }}> 
                <TextField 
                    id="standard-basic nome"
                    onChange={(event) => onValueChange(event, 'nome')} 
                    defaultValue={userItem.nome} 
                    label="Nome de Perfil" 
                    variant="standard"/>
                <TextField 
                    id="standard-basic email"
                    onChange={(event) => onValueChange(event, 'email')} 
                    defaultValue={userItem.email} 
                    label="E-mail" 
                    variant="standard"/>
            </Box>
            <Box sx={{marginBottom: "10px"}}> 
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
            <Box sx={{ display: 'flex', flexDirection: "row", gap: "20px" }}> 
                <TextField 
                    id="standard-basic primeira-senha" 
                    onChange={(event) => onValueChange(event, 'senha')} 
                    defaultValue={userItem.senha}
                    label="Senha" 
                    type="password" 
                    variant="standard"/>
                <TextField 
                    id="standard-basic segunda-senha" 
                    onChange={(event) => onValueChange(event, 'secondPassword')} 
                    defaultValue={userItem.senha}
                    label="Repetir Senha" 
                    type="password" 
                    variant="standard"/>
            </Box>
        </div>
    );

    const deleteTemplate = () => (
        <main>
            <DialogContentText>Tem certeza que deseja excluir o usuário <b>{userItem.userName}</b>?</DialogContentText>
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
                return ''
        }
    }

    return (
        <Modal open={props.open}>
            <Box sx={style}>
                <Box id="modal-header" sx={{ display: 'flex', mb: 2 }}>
                    <div className="title">
                        <Person fontSize="large" style={{fill: "#647A79"}}/>
                        <Box sx={{ ml: 1, color: "#647A79" }}>
                            Usuários /
                        </Box>
                    </div>
                    <div className="title">
                        <Box sx={{ ml: 1 }}>
                            {actionText} Usuário
                        </Box>
                    </div>
                </Box>
                <Box id="modal-body" sx={{ display: 'flex', flexDirection: "column", mt: 2, gap: "10px"}} >
                    {getTemplate()}
                </Box>
                <Box id="modal-footer" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: "10px" }}> 
                    <Button variant="outlined" onClick={handleCancelClick} startIcon={<Close />}>Cancelar</Button>
                    <Button variant="contained" endIcon={<Send />} onClick={handleConfirmClick}>{actionText === actionTypes.remove ? 'Excluir' : 'Salvar'}</Button>
                </Box>
            </Box>
        </Modal>
    );
}