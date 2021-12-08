import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const acoes = {
    cria: 'Cadastrar',
    edita: 'Editar',
    remove: 'Excluir',
    cria_em_predio: 'Cadastrar em Prédio'
}

export function SalaConfirmaDialog(props) {
    const actionText = props.actionType
    const roomItem = props.item;

    const actionTextLC = () => (actionText || "").toLowerCase();

    const handleConfirmClick = () => {
        props.action();
        closeDialog();
    }

    const handleCancelClick = () => {
        closeDialog();
    }

    const onValueChange = (event, attribute) => {
        const newValue = event.target.value;
        if (!(attribute in roomItem)) {
            return;
        }
        roomItem[attribute] = newValue;
    }

    const closeDialog = () => {
        props.toggleModal(false);
    }

    const createEditTemplate = () => (
        <main>
            <DialogContentText>Continue para {actionTextLC()} a Sala <b>{roomItem.name}</b></DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome Sala"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={roomItem.name}
                onChange={(event) => onValueChange(event, 'name')}
            />
            {actionTextLC() === "cadastrar" &&
                <TextField
                    margin="dense"
                    id="roomBuilding"
                    label="Prédio"
                    type="text"
                    fullWidth
                    variant="filled"
                    defaultValue={roomItem.classBuilding.id}
                    onChange={(event) => onValueChange(event, 'classBuilding.id')}
                />}
            <TextField
                margin="dense"
                id="capacity"
                label="Capacidade da Sala"
                type="number"
                fullWidth
                variant="filled"
                defaultValue={roomItem.capacity}
                onChange={(event) => onValueChange(event, 'capacity')}
            />
        </main>
    );

    const deleteTemplate = () => (
        <main>
            <DialogContentText>Tem certeza que deseja excluir a Sala <b>{roomItem.number}</b>?</DialogContentText>
        </main>
    );

    const getTemplate = () => {
        switch (actionText) {
            case acoes.cria:
            case acoes.edita:
            case acoes.cria_em_predio:
                return createEditTemplate();
            case acoes.remove:
                return deleteTemplate();
            default:
                return ''
        }
    }

    const renderSwitch = () => {
        switch (actionText) {
            case acoes.remove:
                return 'EXCLUIR';
            case acoes.cria:
                return 'CRIAR';
            default:
                return 'EDITAR';
        }
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>{`${actionText} Sala`}</DialogTitle>
            <DialogContent>
                {getTemplate()}
            </DialogContent>
            <DialogActions>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="text" color="secondary" sx={{ mr: 1 }} onClick={handleCancelClick}>CANCELAR</Button>
                    <Button variant="text" onClick={handleConfirmClick}>{renderSwitch()}</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}