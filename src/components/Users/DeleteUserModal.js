import * as React from 'react';
import { Person, Delete, Close, Send } from "@mui/icons-material";
import {Box, Button, Modal, IconButton} from '@mui/material';
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../pages/Users/UserSlice';

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

export default function DeleteUserModal() {
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const hanbleConfirmAction = () => {
        dispatch(deleteUser(123123));
        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <Delete />
            </IconButton>
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
                                Deletar usuário
                            </Box>
                        </div>
                    </Box>
                    <Box id="modal-footer" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: "10px" }}> 
                        <Button variant="outlined" onClick={handleClose} startIcon={<Close />}>Cancelar</Button>
                        <Button variant="contained" onClick={hanbleConfirmAction} endIcon={<Send />}>Deletar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

