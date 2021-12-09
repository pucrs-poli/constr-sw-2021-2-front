import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const actionTypes = {
    create: "Cadastrar",
    edit: "Editar",
    remove: "Excluir",
};

export function MatriculasModal(props) {
    const {
        open: modalOpen,
        action: actionText,
        item: resourceTypeItem,
        actionFn,
        disciplinas,
        turmas,
    } = props;

    const [item, setItem] = React.useState({});
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [selectedClass, setSelectedClass] = React.useState(null);

    React.useEffect(() => {
        console.log(props);
        setItem(resourceTypeItem);
        setSelectedCourse(resourceTypeItem?.disciplina?._id);
        setSelectedClass(resourceTypeItem?.classId);
    }, [resourceTypeItem, modalOpen]);

    const actionTextLC = () => (actionText || "").toLowerCase();

    const handleConfirmClick = async () => {
        console.log(item);
        await actionFn(actionText, item);
        closeDialog();
    };

    const handleCancelClick = () => {
        closeDialog();
    };

    const onValueChange = (event, attribute) => {
        const newValue = event.target.value;
        if (!(attribute in item)) {
            return;
        }
        item[attribute] = newValue;
    };

    const handleCourseChange = (event) => {
        const newValue = event.target.value;
        console.log(newValue);
        setSelectedCourse(newValue);
        setSelectedClass(null);
        setItem({ ...item, classId: undefined });
    };

    const handleClassChange = (event) => {
        const newValue = event.target.value;
        console.log(newValue);
        setSelectedClass(newValue);
        setItem({ ...item, classId: newValue });
    };

    const closeDialog = () => {
        props.toggleModal(false);
    };

    const createEditTemplate = () => (
        <main>
            <DialogContentText>
                Continue para {actionTextLC()} a matricula <b>{item.title}</b>
            </DialogContentText>
            <TextField
                margin="dense"
                id="semester"
                label="Semestre"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={item.semester}
                onChange={(event) => onValueChange(event, "semester")}
            />
            <TextField
                select
                margin="dense"
                id="course"
                label="Disciplina"
                type="text"
                fullWidth
                variant="filled"
                value={selectedCourse}
                onChange={handleCourseChange}
            >
                {disciplinas.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                        {c.nome}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                margin="dense"
                id="class"
                label="Turma"
                type="text"
                fullWidth
                variant="filled"
                value={selectedClass}
                onChange={handleClassChange}
            >
                {turmas
                    .filter((t) => t.disciplina === selectedCourse)
                    .map((c) => (
                        <MenuItem key={c._id} value={c._id}>
                            {`${c.numero} (${c.horario})`}
                        </MenuItem>
                    ))}
            </TextField>
        </main>
    );

    const deleteTemplate = () => (
        <main>
            <DialogContentText>
                Tem certeza que deseja excluir a matricula <b>{item.name}</b>?
            </DialogContentText>
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
                return "";
        }
    };

    return (
        <Dialog open={props.open}>
            <DialogTitle>{`${actionText} Matricula`}</DialogTitle>
            <DialogContent>{getTemplate()}</DialogContent>
            <DialogActions>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="text"
                        color="secondary"
                        sx={{ mr: 1 }}
                        onClick={handleCancelClick}
                    >
                        CANCELAR
                    </Button>
                    <Button variant="text" onClick={handleConfirmClick}>
                        {actionText === actionTypes.remove
                            ? "EXCLUIR"
                            : "SALVAR"}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}
