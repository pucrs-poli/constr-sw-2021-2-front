import * as React from 'react';
import { Person, Add, Close, Send } from "@mui/icons-material";
import {Box, Button, Modal, TextField, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText} from '@mui/material';

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
    'Admin',
    'Professor',
    'Estudante',
];

export default function UserModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    <Box id="modal-title" sx={{ display: 'flex', mb: 2 }}> 
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
                            <TextField id="standard-basic" label="Matrícula" variant="standard"/>
                            <TextField id="standard-basic" label="Nome de Usuário" variant="standard"/>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", gap: "20px" }}> 
                            <TextField id="standard-basic" label="Nome de Perfil" variant="standard"/>
                            <TextField id="standard-basic" label="E-mail" variant="standard"/>
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
                            <TextField id="standard-basic" label="Senha" variant="standard"/>
                            <TextField id="standard-basic" label="Repetir Senha" variant="standard"/>
                        </Box>
                    </Box>
                    <Box id="modal-bottom" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: "10px" }}> 
                        <Button variant="outlined" onClick={handleClose} startIcon={<Close />}>Cancelar</Button>
                        <Button variant="contained" onClick={handleClose} endIcon={<Send />}>Criar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
