import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from "../../components/AppTable";
import { useParams } from "react-router-dom";
import React from "react";
import { ClassConfirmationDialog, actionTypes } from '../../components/ClassConfirmationDialog';

import "./Matriculas.css";

export default function Matriculas() {
  const mockClass = {
    semester: "5",
    classId: "6789",
    studentId: "1345"
  };

  const titleKey = "semester";


  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState('');
  const [modalItem, setModalItem] = React.useState({});

  const keysLabels = {
    classId: "classId",
    semesterId: "semesterId",

    // birthday: "Data de nascimento",
    
  };

  const handleCRUDClick = (id, actionType) => {
    const classItem = id
        ? mockClasses.find(objClass => objClass.id === id)
        : "new Class()";

    openModal(actionType, classItem);
}

const openModal = (action, itemProps) => {
    setModalAction(action);
    setModalItem(itemProps);
    setModalOpen(true);
}

const handleSearchInputChange = (event) => {
    const searchString = event.target.value;
    // TODO: chamar serviço que filtra a aula.
}

  const mockClasses = Array(4).fill(mockClass);
  const { aluno_id: alunoId } = useParams();

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
          <MenuBook fontSize="large" />
          <Box sx={{ ml: 1 }}>Matriculas Aluno {alunoId}</Box>
        </div>

        <Box sx={{ display: "flex", alignItems: "end" }}>
          <TextField
            id="outlined-basic"
            placeholder="Pesquisar aula"
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

      <AppTable items={mockClasses} 
        keysLabels={keysLabels}
        titleKey={titleKey}
        onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)} 
        onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}  
        ></AppTable>
    </Box>
  );
}

