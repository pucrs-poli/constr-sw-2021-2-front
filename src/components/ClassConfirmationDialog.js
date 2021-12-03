import { Dialog, DialogContent, DialogContentText, DialogTitle, Select, TextField } from '@mui/material';
import React from 'react';

export const actionTypes = {
    create: 'Cadastrar',
    edit: 'Editar',
    remove: 'Excluir'
}

export function ClassConfirmationDialog(props) {
    const actionText = actionTypes[props.action];

    return (
        <Dialog open={props.open}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>{`${actionText} Aula`}</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Disciplina"
                    type="text"
                    fullWidth
                    variant="filled"
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Número da Turma"
                    type="text"
                    fullWidth
                    variant="filled"
                />
                <Select
                    id="name"
                    label="Reserva"
                    type="text"
                    fullWidth
                    variant="filled"
                />
            </DialogContent>
        </Dialog>
    );
}