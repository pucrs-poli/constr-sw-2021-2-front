import { Search, Computer, ArrowBack } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";
import AppTable from "../../components/AppTable";
import { ResourceModal, actionTypes } from "./ResourceModal";
import { Add } from "@mui/icons-material";
import Resource from "../../model/Resource";

import "./Resources.css";

export default function Resources() {
  const keysLabels = {
    description: "Descrição",
  };
  const titleKey = "name";

  const mockResource = {
    id: "1345",
    name: "Computador 1",
    description: "Computador do prédio 1",
    resourceType: "Computadores",
  };

  const mockResources = Array(4).fill(mockResource);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState('');
  const [modalItem, setModalItem] = React.useState({});

  const handleCRUDClick = (id, actionType) => {
      const resourceItem = id
          ? mockResources.find(objResource => objResource.id === id)
          : new Resource();

      openModal(actionType, resourceItem);
  }

  const openModal = (action, itemProps) => {
      setModalAction(action);
      setModalItem(itemProps);
      setModalOpen(true);
  }

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
          <Box sx={{ ml: 1 }}>Computadores</Box>
        </div>

        <Box sx={{ display: "flex", alignItems: "end" }}>
          <TextField
            id="outlined-basic"
            placeholder="Pesquisar recurso"
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

      <AppTable items={mockResources} keysLabels={keysLabels} titleKey={titleKey} onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)} onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}></AppTable>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Link to={{pathname: '/tipos_recursos'}}><Fab variant="extended" color="primary" sx={{ minWidth: 150 }}><ArrowBack />VOLTAR</Fab></Link>
          <Fab variant="extended" color="primary" sx={{ minWidth: 150 }} onClick={() => handleCRUDClick(null, actionTypes.create)}><Add />CRIAR</Fab>
      </Box>

      <ResourceModal open={modalOpen} action={modalAction} item={modalItem} toggleModal={(open) => setModalOpen(open)} />
    </Box>
  );
}
