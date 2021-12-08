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
    const g2ApiUrl = "http://localhost:3332/api";
    const g5ApiUrl = "http://localhost:3333";

    const keysLabels = {
        semester: "Semestre",
        courseName: "Disciplina",
    };
    const titleKey = "className";

    const { aluno_id: alunoId } = useParams();

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState("");
    const [modalItem, setModalItem] = React.useState({});

    const [aluno, setAluno] = React.useState({});
    const [matriculas, setMatriculas] = React.useState([]);

    const [disciplinas, setDisciplinas] = React.useState([]);
    const [turmas, setTurmas] = React.useState([]);

    const [loaded, setLoaded] = React.useState(false);
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        async function fetchData() {
            await Promise.all([fetchTurmas(), fetchDisciplinas()]);
            setLoaded(true);
            fetchMatriculas();
            getAluno(alunoId);
        }
        fetchData();
    }, [alunoId, loaded]);

    const fetchMatriculas = async () => {
        if (!loaded) return;

        const { data } = await axios.get(
            `${g2ApiUrl}/students/${alunoId}/enrolls`
        );
        const matriculas = await Promise.all(
            data.map(async (d) => ({
                id: d._id,
                ...d,
                disciplina: await getDisciplina(d.classId),
            }))
        );
        console.log({ matriculas, disciplinas, turmas });
        setMatriculas(
            matriculas.map((m) => {
                const turma = turmas.find((t) => t._id === m.classId);
                return {
                    ...m,
                    courseName: m.disciplina?.nome,
                    className:
                        turma && `Turma ${turma.numero} (${turma.horario})`,
                };
            })
        );
    };

    const fetchDisciplinas = async () => {
        const { data } = await axios.get(`${g5ApiUrl}/disciplina`);
        setDisciplinas(data);
    };

    const fetchTurmas = async () => {
        const { data } = await axios.get(`${g5ApiUrl}/turma`);
        setTurmas(data);
    };

    const getAluno = async (id) => {
        const { data } = await axios.get(`${g2ApiUrl}/students/${id}`);
        setAluno(data);
    };

    const getDisciplina = async (idTurma) => {
        // Consultando todas as turmas porque, no momento, não há uma rota para retornar
        // as turmas de uma disciplina específica
        // const { data: turmas } = await axios.get(`${g5ApiUrl}/turma`);
        // console.log({ classData: turmas });
        if (!turmas || !turmas.length) return null;

        const turma = turmas.find((t) => t._id === idTurma);
        console.log({ turma });
        if (!turma) return null;

        const { data: disciplina } = await axios.get(
            `${g5ApiUrl}/disciplina/${turma.disciplina}`
        );
        return {
            id: disciplina._id,
            ...disciplina,
            turmas: turmas.filter((t) => t.disciplina === turma.disciplina),
        };
    };

    const editMatricula = async (actionType, matricula = {}) => {
        switch (actionType) {
            case actionTypes.create:
                await axios.post(
                    `${g2ApiUrl}/students/${alunoId}/enrolls`,
                    matricula,
                    { headers: { Authorization: "1" } } // A API G2 está verificando se existe algo em Authorization
                );
                break;
            case actionTypes.edit:
                matricula._id &&
                    (await axios.put(
                        `${g2ApiUrl}/students/${alunoId}/enrolls/${matricula._id}`,
                        matricula,
                        { headers: { Authorization: "1" } }
                    ));
                break;
            case actionTypes.remove:
                matricula._id &&
                    (await axios.delete(
                        `${g2ApiUrl}/students/${alunoId}/enrolls/${matricula._id}`
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
                items={matriculas.filter(
                    (m) =>
                        !search ||
                        m.courseName
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        m.className.toLowerCase().includes(search.toLowerCase())
                )}
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
                disciplinas={disciplinas}
                turmas={turmas}
            />
        </Box>
    );
}
