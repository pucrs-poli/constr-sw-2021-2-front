import { Modal, DialogContentText, TextField, Button } from '@mui/material';
import { Box, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText} from '@mui/material';
import { Person, Close, Send } from "@mui/icons-material";
import React from 'react';

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
    'Admin',
    'Professor',
    'Estudante',
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
    const actionText = props.action;
    console.log(props.item);
    const userItem = props.item;

    const [roles, setroles] = React.useState([]);

    const handleChange = (event) => {
        const {
                target: { value },
        } = event;
        setroles(
            // On autofill we get a the stringified value.
                typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleConfirmClick = () => {
        console.log(userItem);
        closeDialog();
    }

    const handleCancelClick = () => {
        closeDialog();
    }

    const onValueChange = (event, attribute) => {
        const newValue = event.target.value;
        if (!(attribute in userItem)) {
            return;
        }
        userItem[attribute] = newValue;
    }

    const closeDialog = () => {
        props.toggleModal(false);
    }

    const createEditTemplate = () => (
        <div>
            <Box sx={{ display: 'flex', flexDirection: "row", gap: "20px", marginBottom: "10px"}}> 
                <TextField 
                    id="standard-basic"
                    onChange={(event) => onValueChange(event, 'reg')}
                    defaultValue={userItem.reg}
                    label="Matrícula" variant="standard"
                />
                <TextField 
                    id="standard-basic"
                    onChange={(event) => onValueChange(event, 'login')} 
                    defaultValue={userItem.login}
                    label="Nome de Usuário" 
                    variant="standard"
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: "row", gap: "20px", marginBottom: "10px" }}> 
                <TextField 
                    id="standard-basic"
                    onChange={(event) => onValueChange(event, 'name')} 
                    defaultValue={userItem.name} 
                    label="Nome de Perfil" 
                    variant="standard"/>
                <TextField 
                    id="standard-basic"
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
                    onChange={handleChange}
                    sx={{minWidth: "100%"}}
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(', ')}
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
                    id="standard-basic" 
                    onChange={(event) => onValueChange(event, 'firstPassword')} 
                    defaultValue={userItem.password}
                    label="Senha" 
                    type="password" 
                    variant="standard"/>
                <TextField 
                    id="standard-basic" 
                    onChange={(event) => onValueChange(event, 'secondPassword')} 
                    defaultValue={userItem.password}
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
                    <div class="title">
                        <Person fontSize="large" style={{fill: "#647A79"}}/>
                        <Box sx={{ ml: 1, color: "#647A79" }}>
                            Usuários /
                        </Box>
                    </div>
                    <div class="title">
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