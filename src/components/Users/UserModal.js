import * as React from 'react';
import { Person, Add, Close, Send } from "@mui/icons-material";
import {Box, Button, Modal, TextField, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText} from '@mui/material';
import { useDispatch } from 'react-redux'
import { addNewUser } from '../../pages/Users/UserSlice';

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

export default function UserModal() {
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [registration, setRegistration] = React.useState("");
    const [userName, setUsername] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [roles, setRoles] = React.useState([]);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    React.useEffect(() => {
        setRoles([]);
      }, [open])

    const handleChange = (event) => {
        const {
                target: { value },
        } = event;
        setRoles(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const hanbleConfirmAction = () => {
        const user = {  email: email, 
                        login: userName,
                        nome: name,
                        papeis: roles,
                        matricula: registration,
                        senha: password
                    };

        dispatch(addNewUser(user));
        handleClose();
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} startIcon={<Add />}>Adicionar</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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
                                Criar Usuário
                            </Box>
                        </div>
                    </Box>
                    <Box id="modal-body" sx={{ display: 'flex', flexDirection: "column", mt: 2, gap: "10px"}} >
                        <Box sx={{ display: 'flex', flexDirection: "row", gap: "20px" }}> 
                            <TextField id="standard-basic" label="Matrícula" variant="standard" onChange={event => setRegistration(event.target.value)}/>
                            <TextField id="standard-basic" label="Nome de Usuário" variant="standard" onChange={event => setUsername(event.target.value)}/>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", gap: "20px" }}> 
                            <TextField id="standard-basic" label="Nome de Perfil" variant="standard" onChange={event => setName(event.target.value)}/>
                            <TextField id="standard-basic" label="E-mail" variant="standard" onChange={event => setEmail(event.target.value)}/>
                        </Box>
                        <Box sx={{mt: 1}}> 
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
                            <TextField id="standard-basic" label="Senha" type="password" variant="standard" onChange={event => setPassword(event.target.value)}/>
                            <TextField id="standard-basic" label="Repetir Senha" type="password" variant="standard" onChange={event => setConfirmPassword(event.target.value)}/>
                        </Box>
                    </Box>
                    <Box id="modal-footer" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: "10px" }}> 
                        <Button variant="outlined" onClick={handleClose} startIcon={<Close />}>Cancelar</Button>
                        <Button variant="contained" onClick={hanbleConfirmAction} endIcon={<Send />}>Criar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
