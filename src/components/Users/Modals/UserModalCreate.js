import * as React from 'react';
import { Person, Close, Send, Add } from "@mui/icons-material";
import {Box, Button, TextField, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText} from '@mui/material';
import UserModal from './UserModal';

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

export default function UserModalCreate() {
    this.internalModal = React.createRef();

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
        <UserModal
            ref={this.internalModal}
            modalOpen={<Button variant="contained" onClick={this.internalModal.handleOpen} startIcon={<Add />}>Adicionar</Button>}
            modalTitle={
                <div>
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
                </div>
            }
            modalBody={
                <div>
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
                        <TextField id="standard-basic" label="Senha" type="password" variant="standard"/>
                        <TextField id="standard-basic" label="Repetir Senha" type="password" variant="standard"/>
                    </Box>
                </div>
            }
            modalFooter={
                <div>
                    <Button variant="outlined" onClick={this.handleClose} startIcon={<Close />}>Cancelar</Button>
                    <Button variant="contained" onClick={this.handleClose} endIcon={<Send />}>Criar</Button>
                </div>
            }
        />
    );
}
