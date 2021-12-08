import React from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Add, Search, Computer } from "@mui/icons-material";
import AppTable from "../../components/AppTable";
import { AlunosModal, actionTypes } from "./AlunoModal";
import Aluno from "../../model/Aluno";

import "./Alunos.css";

export default function Alunos() {
    const g2ApiUrl = "http://localhost:3332/api";

    const keysLabels = {
        email: "E-mail",
        // birthday: "Data de nascimento",
        phone: "Telefone",
        link: "Ver Matriculas",
    };
    const titleKey = "name";

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState("");
    const [modalItem, setModalItem] = React.useState({});

    const [alunos, setAlunos] = React.useState([]);

    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        fetchAlunos();
    }, []);

    const fetchAlunos = async () => {
        const { data } = await axios.get(`${g2ApiUrl}/students`);
        const alunos = data.map((a) => ({
            id: a._id,
            ...a,
            link: `/alunos/${a._id}/matriculas`,
        }));
        setAlunos(alunos);
    };

    const editAluno = async (actionType, aluno = {}) => {
        switch (actionType) {
            case actionTypes.create:
                await axios.post(`${g2ApiUrl}/students`, aluno);
                break;
            case actionTypes.edit:
                aluno._id &&
                    (await axios.put(
                        `${g2ApiUrl}/students/${aluno._id}`,
                        aluno
                    ));
                break;
            case actionTypes.remove:
                aluno._id &&
                    (await axios.delete(`${g2ApiUrl}/students/${aluno._id}`));
                break;
            default:
                break;
        }
        await fetchAlunos();
    };

    const handleCRUDClick = (id, actionType) => {
        const resourceItem = id
            ? alunos.find((objResource) => objResource.id === id)
            : new Aluno();

        console.log({ resourceItem });
        openModal(actionType, resourceItem);
    };

    const openModal = (action, itemProps) => {
        setModalAction(action);
        setModalItem(itemProps);
        setModalOpen(true);
    };

    return (
        <Box
            sx={{
                mx: { lg: 24, xl: 36 },
                mt: 4,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
                <div class="title">
                    <Computer fontSize="large" />
                    <Box sx={{ ml: 1 }}>Alunos</Box>
                </div>

                <Box sx={{ display: "flex", alignItems: "end" }}>
                    <TextField
                        id="outlined-basic"
                        placeholder="Pesquisar Aluno"
                        variant="filled"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            style: {
                                backgroundColor: "white",
                            },
                        }}
                    />
                </Box>
            </Box>

            <AppTable
                items={alunos.filter(
                    (a) =>
                        !search ||
                        a.name.toLowerCase().includes(search.toLowerCase())
                )}
                keysLabels={keysLabels}
                titleKey={titleKey}
                onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)}
                onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}
            ></AppTable>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ minWidth: 150 }}
                    onClick={() => handleCRUDClick(null, actionTypes.create)}
                >
                    <Add />
                    CRIAR
                </Fab>
            </Box>

            <AlunosModal
                open={modalOpen}
                action={modalAction}
                item={modalItem}
                toggleModal={(open) => setModalOpen(open)}
                actionFn={editAluno}
            />
        </Box>
    );
}
