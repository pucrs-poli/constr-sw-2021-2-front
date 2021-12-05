import * as React from 'react';
import {Box, Modal } from '@mui/material';

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

export default function UserModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {this.props.modalOpen}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box id="modal-header" sx={{ display: 'flex', mb: 2 }}> 
                        {this.props.modalHeader}
                    </Box>
                    <Box id="modal-body" sx={{ display: 'flex', flexDirection: "column", mt: 2, gap: "10px"}} >
                        {this.props.modalBody}
                    </Box>
                    <Box id="modal-footer" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: "10px" }}> 
                        {this.props.modalFooter}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
