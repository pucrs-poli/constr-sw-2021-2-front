import * as React from 'react';
import { Person, Edit, Close, Send } from "@mui/icons-material";
import {Box, Button, Modal, IconButton} from '@mui/material';
import { useDispatch } from 'react-redux'
import { updateUser } from '../../pages/Users/UserSlice';

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

export default function EditUserModal() {
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const hanbleConfirmAction = () => {
        dispatch(updateUser(1, {id: 1, title: "Deu certo", body: "vamo"}));
        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <Edit />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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
                                Criar Usuário
                            </Box>
                        </div>
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

