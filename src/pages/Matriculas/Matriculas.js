import { Search, Computer, ArrowBack } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import React from "react";
import AppTable from "../../components/AppTable";
import { MatriculasModal, actionTypes } from "./MatriculasModal";
import { Add } from "@mui/icons-material";
import Matricula from "../../model/Matricula";

import "./Matriculas.css";

export default function Matriculas() {
  const keysLabels = {
    classId: "classId",
    semesterId: "semesterId",
  };

  const titleKey = "className";

  const mockMatricula = {
    semesterId: "5",
    classId: "6789",
    className: "Banco de Dados",
    studentId: "1345",
  };

  const mockMatriculas = Array(4).fill(mockMatricula);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState("");
  const [modalItem, setModalItem] = React.useState({});
  const { aluno_id: alunoId } = useParams();

  const handleCRUDClick = (id, actionType) => {
    const matriculaItem = id
      ? mockMatriculas.find((objResource) => objResource.id === id)
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <div class="title">
          <Computer fontSize="large" />
          <Box sx={{ ml: 1 }}>Matriculas Aluno {alunoId}</Box>
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
        items={mockMatriculas}
        keysLabels={keysLabels}
        titleKey={titleKey}
        onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)}
        onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}
      ></AppTable>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Link to={{ pathname: "/alunos" }}>
          <Fab variant="extended" color="primary" sx={{ minWidth: 150 }}>
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
      />
    </Box>
  );
}
