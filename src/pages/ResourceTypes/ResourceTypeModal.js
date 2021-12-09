import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const actionTypes = {
    create: 'Cadastrar',
    edit: 'Editar',
    remove: 'Excluir'
}

export function ResourceTypeModal(props) {
    const actionText = props.action;
    const resourceTypeItem = props.item;

    const actionTextLC = () => (actionText || "").toLowerCase();

    const handleConfirmClick = () => {
        console.log(resourceTypeItem);
        closeDialog();
    }

    const handleCancelClick = () => {
        closeDialog();
    }

    const onValueChange = (event, attribute) => {
        const newValue = event.target.value;
        if (!(attribute in resourceTypeItem)) {
            return;
        }
        resourceTypeItem[attribute] = newValue;
    }

    const closeDialog = () => {
        props.toggleModal(false);
    }

    const createEditTemplate = () => (
        <main>
            <DialogContentText>Continue para {actionTextLC()} o tipo de recurso <b>{resourceTypeItem.title}</b></DialogContentText>
            <TextField
                margin="dense"
                id="resourceTypeName"
                label="Nome"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={resourceTypeItem.name}
                onChange={(event) => onValueChange(event, 'name')}
            />
        </main>
    );

    const deleteTemplate = () => (
        <main>
            <DialogContentText>Tem certeza que deseja excluir o tipo de recurso <b>{resourceTypeItem.name}</b>?</DialogContentText>
        </main>
    );

    const getTemplate = () => {
        switch (actionText) {
            case actionTypes.create:
            case actionTypes.edit:
                return createEditTemplate();
            case actionTypes.remove:
                return deleteTemplate();
            default:
                return ''
        }
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>{`${actionText} Tipo de Recurso`}</DialogTitle>
            <DialogContent>
                {getTemplate()}
            </DialogContent>
            <DialogActions>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="text" color="secondary" sx={{ mr: 1 }} onClick={handleCancelClick}>CANCELAR</Button>
                    <Button variant="text" onClick={handleConfirmClick}>{actionText === actionTypes.remove ? 'EXCLUIR' : 'SALVAR'}</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}