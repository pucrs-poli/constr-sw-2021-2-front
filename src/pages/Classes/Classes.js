import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AppTable from '../../components/AppTable';
import { ClassConfirmationDialog, actionTypes } from '../../components/ClassConfirmationDialog';
import './Classes.css';
import { Add } from "@mui/icons-material";
import Class from '../../model/Class';
import moment from "moment";
import ClassesService from "../../service/ClassesService";

export default function Classes() {
    const classesService = new ClassesService();
    const keysLabels = {
        numTurma: "Turma",
        disciplina: "Disciplina",
        reserva: {
            text: "Reserva",
            value: resource => resource.Recurso.name
        },
    };

    const titleKey = "date";

    const [classes, setClasses] = useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState('');
    const [modalItem, setModalItem] = React.useState({});

    useEffect(() => {
        classesService.getAllClasses()
            .then(arrClasses => {
                const classEntities = arrClasses.map(objClass => new Class(objClass))
                setClasses(classEntities);
            });
    }, [])

    const handleCRUDClick = (id, actionType) => {
        const classItem = id
            ? classes.find(objClass => objClass.id === id)
            : new Class({});

        openModal(actionType, classItem);
    }

    const openModal = (action, itemProps) => {
        setModalAction(action);
        setModalItem(itemProps);
        setModalOpen(true);
    }

    const handleSearchInputChange = async (event) => {
        const searchString = event.target.value;
        const result = await classesService.getClassByDisciplina(searchString);
        setClasses(result);
    }

    const formatTitle = (title) => {
        return moment(title).format('DD/MM/YYYY');
    }

    const handleCreated = (objClass) => {
        const arrClasses = [...classes, new Class(objClass)];
        setClasses(arrClasses);
    }

    const handleDeleted = (id) => {
        const arrClasses = classes.filter(e => e.id !== id);
        setClasses(arrClasses);
    }

    return (
        <Box sx={{ mx: { lg: 24, xl: 36 }, mt: 4, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <div className="title">
                    <MenuBook fontSize="large" />
                    <Box sx={{ ml: 1 }}>
                        Aulas
                    </Box>
                </div>

                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <TextField id="outlined-basic" placeholder="Pesquisar por disciplina" variant="filled" onChange={handleSearchInputChange} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <Search />
                            </InputAdornment>
                        ),
                        style: {
                            backgroundColor: 'white'
                        },
                    }} />
                </Box>
            </Box>

            <AppTable items={classes} keysLabels={keysLabels} titleKey={titleKey} onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)} onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)} fnFormat={formatTitle}></AppTable>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Fab variant="extended" color="primary" sx={{ minWidth: 150 }} onClick={() => handleCRUDClick(null, actionTypes.create)}><Add />CRIAR</Fab>
            </Box>

            <ClassConfirmationDialog open={modalOpen} action={modalAction} item={modalItem} toggleModal={(open) => setModalOpen(open)} onCreated={handleCreated} onDeleted={handleDeleted} />
        </Box >
    );
}
