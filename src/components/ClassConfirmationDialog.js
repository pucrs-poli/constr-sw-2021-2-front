import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, FormControl, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const actionTypes = {
    create: 'Cadastrar',
    edit: 'Editar',
    remove: 'Excluir'
}

export function ClassConfirmationDialog(props) {
    const actionText = props.action;
    const classItem = props.item;

    const actionTextLC = () => (actionText || "").toLowerCase();

    const handleConfirmClick = () => {
        console.log(classItem);
        closeDialog();
    }

    const handleCancelClick = () => {
        closeDialog();
    }

    const onValueChange = (event, attribute) => {
        const newValue = event.target.value;
        if (!(attribute in classItem)) {
            return;
        }
        classItem[attribute] = newValue;
    }

    const closeDialog = () => {
        props.toggleModal(false);
    }

    const createEditTemplate = () => (
        <main>
            <DialogContentText>Continue para {actionTextLC()} a aula <b>{classItem.title}</b></DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="classTitle"
                label="Aula"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'title')}
                defaultValue={classItem.title}
            />
            <TextField
                margin="dense"
                id="classGroup"
                label="Número da Turma"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={classItem.group}
                onChange={(event) => onValueChange(event, 'group')}
            />
            <TextField
                margin="dense"
                id="classResources"
                label="Recursos"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={classItem.resources}
                onChange={(event) => onValueChange(event, 'resources')}
            />
        </main>
    );

    const deleteTemplate = () => (
        <main>
            {/* <DialogContentText>Continue para {actionTextLC()} a aula <b>{classItem.title}</b></DialogContentText> */}
            <DialogContentText>Tem certeza que deseja excluir a aula <b>{classItem.title}</b>?</DialogContentText>
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
            <DialogTitle>{`${actionText} Aula`}</DialogTitle>
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