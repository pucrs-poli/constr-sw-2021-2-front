import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const acoes = {
    cria: 'Cadastrar',
    edita: 'Editar',
    remove: 'Excluir'
}

export function PredioConfirmaDialog(props) {
    const actionText = props.actionType;
    const buildingItem = props.item;

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
        if (!(attribute in buildingItem)) {
            return;
        }
        buildingItem[attribute] = newValue;
    }

    const closeDialog = () => {
        props.toggleModal(false);
    }

    const createEditTemplate = () => (
        <main>
            <DialogContentText>Continue para {actionTextLC()} o prédio <b>{buildingItem.title}</b></DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="buildingNumber"
                label="Predio"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'name')}
                defaultValue={buildingItem.name}
            />
            <TextField
                margin="dense"
                id="buildingReference"
                label="Localização"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={buildingItem.location}
                onChange={(event) => onValueChange(event, 'location')}
            />
        </main>
    );

    const deleteTemplate = () => (
        <main>
            <DialogContentText>Tem certeza que deseja excluir o prédio <b>{buildingItem.number}</b>?</DialogContentText>
        </main>
    );

    const getTemplate = () => {
        switch (actionText) {
            case acoes.cria:
            case acoes.edita:
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
            <DialogTitle>{`${actionText} Prédio`}</DialogTitle>
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