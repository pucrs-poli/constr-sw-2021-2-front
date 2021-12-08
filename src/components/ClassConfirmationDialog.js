import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';
import ClassesService from '../service/ClassesService';

export const actionTypes = {
    create: 'Cadastrar',
    edit: 'Editar',
    remove: 'Excluir'
}

export function ClassConfirmationDialog(props) {
    const classesService = new ClassesService();
    const actionText = props.action;
    const classItem = props.item;

    const actionTextLC = () => (actionText || "").toLowerCase();

    const handleConfirmClick = () => {
        switch (actionText) {
            case actionTypes.create:
                createClass();
                break;
            case actionTypes.edit:
                updateClass();
                break;
            case actionTypes.remove:
                deleteClass();
                break;
            default:
                return;
        }
        closeDialog();
    }

    const createClass = async () => {
        const objClass = {
            numTurma: classItem.numTurma,
            disciplina: classItem.disciplina,
            professor: classItem.professor,
            reserva: classItem.reserva,
        }
        const newClass = await classesService.createClass(objClass);
        props.onCreated(newClass);
    }

    const updateClass = () => {
        const objClass = {
            id: classItem.id,
            numTurma: classItem.numTurma,
            disciplina: classItem.disciplina,
            professor: classItem.professor,
            reserva: classItem.reserva
        }
        classesService.editClass(objClass);
    }

    const deleteClass = async () => {
        const id = await classesService.deleteClassById(classItem.id);
        props.onDeleted(id);
    }

    const handleCancelClick = () => {
        closeDialog();
    }

    const formatDate = () => {
        return moment(classItem.date).format('DD/MM/YYYY')
    }

    const onValueChange = (value, attribute) => {
        if (!(attribute in classItem)) {
            return;
        }
        classItem[attribute] = value;
    }

    const onResourceChange = (value) => {
        if (classItem.reserva && classItem.reserva.Recurso) {
            classItem.reserva.Recurso.name = value;
        }
    }

    const closeDialog = () => {
        props.toggleModal(false);
    }

    const createEditTemplate = () => (
        <main>
            <DialogContentText>Continue para {actionTextLC()} a aula de <b>{formatDate()}</b></DialogContentText>
            {actionText === actionTypes.create ? (<input type="date" onChange={(event) => onValueChange(event.target.value, 'date')} />) : ('')}
            <TextField
                margin="dense"
                id="classGroup"
                label="Número da Turma"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={classItem.numTurma}
                onChange={(event) => onValueChange(event.target.value, 'numTurma')}
            />
            <TextField
                margin="dense"
                id="classGroup"
                label="Disciplina"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={classItem.disciplina}
                onChange={(event) => onValueChange(event.target.value, 'disciplina')}
            />
            <TextField
                margin="dense"
                id="classGroup"
                label="Professor"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={classItem.professor}
                onChange={(event) => onValueChange(event.target.value, 'professor')}
            />
            <TextField
                margin="dense"
                id="classResources"
                label="Reserva"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={classItem.reserva && classItem.reserva.Recurso.name}
                onChange={(event) => onResourceChange(event)}
            />
        </main>
    );

    const deleteTemplate = () => (
        <main>
            <DialogContentText>Tem certeza que deseja excluir a aula do dia <b>{formatDate()}</b>?</DialogContentText>
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