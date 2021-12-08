import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/system";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Add, Search, Computer, ArrowBack } from "@mui/icons-material";
import AppTable from "../../components/AppTable";
import { MatriculasModal, actionTypes } from "./MatriculasModal";
import Matricula from "../../model/Matricula";

import "./Matriculas.css";

export default function Matriculas() {
    const rootApi = "http://localhost:3000/api";

    const keysLabels = {
        semester: "Semestre",
        courseName: "Disciplina",
    };
    const titleKey = "className";

    const mockMatricula = {
        semesterId: "5",
        classId: "6789",
        className: "Banco de Dados",
        studentId: "1345",
    };
    const mockMatriculas = Array(4).fill(mockMatricula);

    const mockCourses = [
        {
            id: "1",
            name: "Fundamentos de Programação",
            classes: [{ id: "61aff870c2fc22a3decab2e1", name: "123" }],
        },
        {
            id: "2",
            name: "Algoritmos e Estruturas de Dados",
            classes: [{ id: "61aff870c2fc22a3decab2e2", name: "124" }],
        },
        {
            id: "3",
            name: "AGES I",
            classes: [{ id: "61aff870c2fc22a3decab2e3", name: "125" }],
        },
    ];

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState("");
    const [modalItem, setModalItem] = React.useState({});
    const [aluno, setAluno] = React.useState({});
    const [matriculas, setMatriculas] = React.useState([]);
    const { aluno_id: alunoId } = useParams();

    React.useEffect(() => {
        fetchMatriculas();
        getAluno(alunoId);
    }, []);

    const fetchMatriculas = async () => {
        const { data } = await axios.get(
            `${rootApi}/students/${alunoId}/enrolls`
        );
        const matriculas = await Promise.all(
            data.map(async (d) => ({
                id: d._id,
                ...d,
                course: await getDisciplina(d.classId),
            }))
        );
        setMatriculas(
            matriculas.map((m) => ({
                ...m,
                courseName: m.course?.name,
                className: (
                    m.course.classes?.find((c) => c.id === m.classId) || {}
                ).name,
            }))
        );
    };

    const getAluno = async (id) => {
        const { data } = await axios.get(`${rootApi}/students/${id}`);
        setAluno(data);
    }

    const getDisciplina = async (idTurma) => {
        return mockCourses.find((c) => c.classes.find((t) => t.id === idTurma));
    };

    const editMatricula = async (actionType, matricula = {}) => {
        switch (actionType) {
            case actionTypes.create:
                await axios.post(
                    `${rootApi}/students/${alunoId}/enrolls`,
                    matricula
                );
                break;
            case actionTypes.edit:
                matricula.id &&
                    (await axios.put(
                        `${rootApi}/students/${alunoId}/enrolls/${matricula.id}`,
                        matricula
                    ));
                break;
            case actionTypes.remove:
                matricula.id &&
                    (await axios.delete(
                        `${rootApi}/students/${alunoId}/enrolls/${matricula.id}`
                    ));
                break;
            default:
                break;
        }
        await fetchMatriculas();
    };

    const handleCRUDClick = (id, actionType) => {
        const matriculaItem = id
            ? matriculas.find((objResource) => objResource.id === id)
            : new Matricula();

        openModal(actionType, matriculaItem);
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
                    <Box sx={{ ml: 1 }}>Matriculas de {aluno.name}</Box>
                </div>

                <Box sx={{ display: "flex", alignItems: "end" }}>
                    <TextField
                        id="outlined-basic"
                        placeholder="Pesquisar matricula"
                        variant="filled"
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
                items={matriculas}
                keysLabels={keysLabels}
                titleKey={titleKey}
                onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)}
                onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}
            ></AppTable>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Link to={{ pathname: "/alunos" }}>
                    <Fab
                        variant="extended"
                        color="primary"
                        sx={{ minWidth: 150 }}
                    >
                        <ArrowBack />
                        VOLTAR
                    </Fab>
                </Link>
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

            <MatriculasModal
                open={modalOpen}
                action={modalAction}
                item={modalItem}
                toggleModal={(open) => setModalOpen(open)}
                actionFn={editMatricula}
                courses={mockCourses}
            />
        </Box>
    );
}
