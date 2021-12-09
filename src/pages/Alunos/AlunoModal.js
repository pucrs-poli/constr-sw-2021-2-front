import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
} from "@mui/material";
import { Box } from "@mui/system";
import ReactInputMask from "react-input-mask";

export const actionTypes = {
    create: "Cadastrar",
    edit: "Editar",
    remove: "Excluir",
};

export function AlunosModal(props) {
    const {
        open: modalOpen,
        action: actionText,
        item: resourceTypeItem,
        actionFn,
    } = props;

    const [item, setItem] = React.useState({});

    React.useEffect(() => {
        setItem({
            ...resourceTypeItem,
            birthday: resourceTypeItem.birthday
                ? resourceTypeItem.birthday.split("T")[0]
                : null,
        });
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
        setItem({ ...item, [attribute]: newValue });
        console.log({ item });
    };

    const closeDialog = () => {
        props.toggleModal(false);
    };

    const createEditTemplate = () => (
        <main>
            <DialogContentText>
                Continue para {actionTextLC()} o aluno <b>{item.title}</b>
            </DialogContentText>
            <TextField
                margin="dense"
                id="resourceName"
                label="Nome"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={item.name}
                onChange={(event) => onValueChange(event, "name")}
            />
            <TextField
                margin="dense"
                id="email"
                label="Email"
                type="text"
                fullWidth
                variant="filled"
                defaultValue={item.email}
                onChange={(event) => onValueChange(event, "email")}
            />
            <ReactInputMask
                mask="+55(99)99999-9999"
                value={item.phone}
                onChange={(event) => onValueChange(event, "phone")}
            >
                {() => (
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Telefone"
                        type="text"
                        variant="filled"
                        sx={{ width: "45%" }}
                    />
                )}
            </ReactInputMask>
            <TextField
                margin="dense"
                id="birthday"
                label="Data de nascimento"
                type="date"
                variant="filled"
                defaultValue={item.birthday}
                sx={{ marginLeft: "10%", width: "45%" }}
                onChange={(event) => onValueChange(event, "birthday")}
            />
        </main>
    );

    const deleteTemplate = () => (
        <main>
            <DialogContentText>
                Tem certeza que deseja excluir o aluno <b>{item.name}</b>?
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
        // <LocalizationProvider dateAdapter={DateAdapter}>
        <Dialog open={props.open}>
            <DialogTitle>{`${actionText} Aluno`}</DialogTitle>
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
        // </LocalizationProvider>
    );
}
