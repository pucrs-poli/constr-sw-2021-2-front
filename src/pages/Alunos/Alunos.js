import { Search, Computer, ArrowBack } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";
import AppTable from "../../components/AppTable";
import { AlunosModal, actionTypes } from "./AlunoModal";
import { Add } from "@mui/icons-material";
import Aluno from "../../model/Aluno";

import "./Alunos.css";

export default function Alunos() {
  const keysLabels = {
    email: "E-mail",
    // birthday: "Data de nascimento",
    phone: "Telefone",
    link: "Ver Matriculas",
  };
  const titleKey = "name";

  const mockAluno = {
    id: "1345",
    name: "João Severo",
    email: "potato@potate.com",
    birthday: "2019-08-21T00:00:00.000Z",
    phone: "+55(51)99455-6722",
    link: "/alunos/1345/matriculas",
  };

  const mockAlunos = Array(4).fill(mockAluno);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState("");
  const [modalItem, setModalItem] = React.useState({});

  const handleCRUDClick = (id, actionType) => {
    const resourceItem = id
      ? mockAlunos.find((objResource) => objResource.id === id)
      : new Aluno();

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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <div class="title">
          <Computer fontSize="large" />
          <Box sx={{ ml: 1 }}>Alunos</Box>
        </div>

        <Box sx={{ display: "flex", alignItems: "end" }}>
          <TextField
            id="outlined-basic"
            placeholder="Pesquisar Aluno"
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
        items={mockAlunos}
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
      />
    </Box>
  );
}

//import { MenuBook, Search } from "@mui/icons-material";
//import { InputAdornment, TextField } from "@mui/material";
//import { Box } from "@mui/system";
//import AppTable from "../../components/AppTable";
//
//import "./Alunos.css";
//
//export default function Alunos() {
//  const keysLabels = {
//    email: "E-mail",
//    // birthday: "Data de nascimento",
//    phone: "Telefone",
//  };
//  const titleKey = "name";
//
//  const mockClass = {
//    id: "1345",
//    name: "João Severo",
//    email: "potato@potate.com",
//    birthday: "2019-08-21T00:00:00.000Z",
//    phone: "+55(51)99455-6722",
//  };
//
//  const mockClasses = Array(4).fill(mockClass);
//
//  return (
//    <Box
//      sx={{
//        mx: { lg: 24, xl: 36 },
//        mt: 4,
//        display: "flex",
//        flexDirection: "column",
//      }}
//    >
//      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//        <div class="title">
//          <MenuBook fontSize="large" />
//          <Box sx={{ ml: 1 }}>Alunos</Box>
//        </div>
//
//        <Box sx={{ display: "flex", alignItems: "end" }}>
//          <TextField
//            id="outlined-basic"
//            placeholder="Pesquisar aluno"
//            variant="filled"
//            InputProps={{
//              startAdornment: (
//                <InputAdornment position="start">
//                  <Search />
//                </InputAdornment>
//              ),
//              style: {
//                backgroundColor: "white",
//              },
//            }}
//          />
//        </Box>
//      </Box>
//
//      <AppTable
//        items={mockClasses}
//        keysLabels={keysLabels}
//        titleKey={titleKey}
//      ></AppTable>
//    </Box>
//  );
//}
