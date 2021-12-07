import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const acoes = {
    cria: 'Cadastrar',
    edita: 'Editar',
    remove: 'Excluir'
}

export function PredioConfirmaDialog(props) {
    const actionText = props.action;
    const buildingItem = props.item;

    const actionTextLC = () => (actionText || "").toLowerCase();

    const handleConfirmClick = () => {
        console.log(buildingItem);
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
                type="number"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'number')}
                defaultValue={buildingItem.number}
            />
            <TextField
                margin="dense"
                id="classBuilding"
                label="Nome e Prédio"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={buildingItem.name}
                onChange={(event) => onValueChange(event, 'name')}
            />
            <TextField
                margin="dense"
                id="buildingReference"
                label="Referencia"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={buildingItem.reference}
                onChange={(event) => onValueChange(event, 'reference')}
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
        switch(actionText) {
            case acoes.remove:
              return 'EXCLUIR';
            case acoes.cria:
              return 'CRIAR';
            default :
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