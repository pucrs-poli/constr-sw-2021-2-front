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
        courses,
    } = props;

    const [item, setItem] = React.useState({});
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [selectedClass, setSelectedClass] = React.useState(null);

    React.useEffect(() => {
        console.log("resourceTypeItem", resourceTypeItem);
        setItem(resourceTypeItem);
        setSelectedCourse(resourceTypeItem?.course?.id);
        setSelectedClass(resourceTypeItem?.classId)
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
    }

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
                // sx={{ width: "20%", marginRight: "5%" }}
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
                // sx={{ width: "65%", marginRight: "5%" }}
                variant="filled"
                value={selectedCourse}
                onChange={handleCourseChange}
            >
                {courses.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                        {c.name}
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
                // sx={{ width: "15%" }}
                variant="filled"
                value={selectedClass}
                onChange={handleClassChange}
            >
                {selectedCourse && courses.find((c) => c.id === selectedCourse)
                    ? courses.find((c) => c.id === selectedCourse).classes.map((c) => (
                          <MenuItem key={c.id} value={c.id}>
                              {c.name}
                          </MenuItem>
                      ))
                    : []}
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
