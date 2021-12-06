import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';

export let returnedActionObject = {}

export const actionTypes = {
    create: 'Cadastrar',
    edit: 'Editar',
    remove: 'Excluir'
}

export function DisciplinasConfirmationDialog(props) {
    const actionText = props.action;
    const disciplinasItem = props.item;

    const [actionObject, setActionObject] = useState([]);

    useEffect(() => {
        returnedActionObject = actionObject
    }, [actionObject])

    const actionTextLC = () => (actionText || "").toLowerCase();

    const handleConfirmClick = () => {
        console.log(disciplinasItem);
        console.log(actionText)
        setActionObject({actionType: actionText, item: disciplinasItem})
        closeDialog();
    }

    const handleCancelClick = () => {
        closeDialog();
    }

    const onValueChange = (event, attribute) => {
        const newValue = event.target.value;
        if (!(attribute in disciplinasItem)) {
            return;
        }
        disciplinasItem[attribute] = newValue;
    }

    const closeDialog = () => {
        props.toggleModal(false);
    }

    const createEditTemplate = () => (
        <main>
            <DialogContentText>Preencha os campos para {actionTextLC()} uma disciplina <b>{disciplinasItem.titulo}</b></DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="disciplinaTitulo"
                label="Disciplina"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'titulo')}
                defaultValue={disciplinasItem.titulo}
            />
            <TextField
                margin="dense"
                id="disciplinaValidade"
                label="Validade"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'validade')}
                defaultValue={disciplinasItem.validade}
            />
            <TextField
                margin="dense"
                id="disciplinaDescricao"
                label="Descricao"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'descricao')}
                defaultValue={disciplinasItem.descricao}
            />
            <TextField
                margin="dense"
                id="disciplinaEmenta"
                label="Ementa"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'ementa')}
                defaultValue={disciplinasItem.ementa}
            />
            <TextField
                margin="dense"
                id="disciplinaCodigo"
                label="Código"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'codigo')}
                defaultValue={disciplinasItem.codigo}
            />
            <TextField
                margin="dense"
                id="disciplinaCredito"
                label="Crédito"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'credito')}
                defaultValue={disciplinasItem.credito}
            />
            <TextField
                margin="dense"
                id="disciplinaCargahr"
                label="Carga Horária"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'cargahr')}
                defaultValue={disciplinasItem.cargahr}
            />
        </main>
    );

    const deleteTemplate = () => (
        <main>
            {/* <DialogContentText>Continue para {actionTextLC()} a aula <b>{disciplinasItem.title}</b></DialogContentText> */}
            <DialogContentText>Tem certeza que deseja excluir a disciplina <b>{disciplinasItem.title}</b>?</DialogContentText>
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
            <DialogTitle>{`${actionText} Disciplina`}</DialogTitle>
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