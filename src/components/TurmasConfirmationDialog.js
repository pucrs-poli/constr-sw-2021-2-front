import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';

export let returnedActionObject = {}

export const actionTypes = {
    create: 'Cadastrar',
    edit: 'Editar',
    remove: 'Excluir'
}

export function TurmasConfirmationDialog(props) {
    const actionText = props.action;
    const turmasItem = props.item;
    const [actionObject, setActionObject] = useState([]);

    const actionTextLC = () => (actionText || "").toLowerCase();

    useEffect(() => {
        returnedActionObject = actionObject
    }, [actionObject])

    const handleConfirmClick = () => {
        console.log(turmasItem);
        console.log(actionText)
        setActionObject({actionType: actionText, item: turmasItem})
        closeDialog();
    }

    const handleCancelClick = () => {
        closeDialog();
    }

    const onValueChange = (event, attribute) => {
        const newValue = event.target.value;
        if (!(attribute in turmasItem)) {
            return;
        }
        turmasItem[attribute] = newValue;
    }

    const closeDialog = () => {
        props.toggleModal(false);
    }

    const createEditTemplate = () => (
        <main>
            <DialogContentText>Preencha os campos para {actionTextLC()} uma turma <b>{turmasItem.titulo}</b></DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="turmaTitulo"
                label="Turma"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'titulo')}
                defaultValue={turmasItem.titulo}
            />
            <TextField
                autoFocus
                margin="dense"
                id="turmaAno"
                label="Ano"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'ano')}
                defaultValue={turmasItem.ano}
            />
            <TextField
                autoFocus
                margin="dense"
                id="turmaSemestre"
                label="Semestre"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'semestre')}
                defaultValue={turmasItem.semestre}
            />
            <TextField
                autoFocus
                margin="dense"
                id="turmaHorario"
                label="Horário"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'horario')}
                defaultValue={turmasItem.horario}
            />
            <TextField
                autoFocus
                margin="dense"
                id="turmaDisciplina"
                label="Disciplina"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => onValueChange(event, 'disciplina')}
                defaultValue={turmasItem.disciplina}
            />
        </main>
    );

    const deleteTemplate = () => (
        <main>
            {/* <DialogContentText>Continue para {actionTextLC()} a aula <b>{turmasItem.title}</b></DialogContentText> */}
            <DialogContentText>Tem certeza que deseja excluir a turma <b>{turmasItem.title}</b>?</DialogContentText>
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
            <DialogTitle>{`${actionText} Turma`}</DialogTitle>
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