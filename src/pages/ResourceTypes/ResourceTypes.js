import { Search, Devices } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppTable from "../../components/AppTable";
import { ResourceTypeModal, actionTypes } from "./ResourceTypeModal";
import { Add } from "@mui/icons-material";
import ResourceType from "../../model/ResourceType";
import "./ResourceTypes.css";

export default function ResourceTypes() {
  const keysLabels = {
    link: "Ver recursos"
  };
  const titleKey = "name";

  const mockType = {
    id: "1345",
    name: "Computadores",
    link: "/recursos/1243"
  };

  const mockTypes = Array(4).fill(mockType);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState('');
  const [modalItem, setModalItem] = React.useState({});

  const handleCRUDClick = (id, actionType) => {
      const resourceTypeItem = id
          ? mockTypes.find(objResourceType => objResourceType.id === id)
          : new ResourceType();

      openModal(actionType, resourceTypeItem);
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
          <Devices fontSize="large" />
          <Box sx={{ ml: 1 }}>Tipos de recursos</Box>
        </div>

        <Box sx={{ display: "flex", alignItems: "end" }}>
          <TextField
            id="outlined-basic"
            placeholder="Pesquisar tipo de recurso"
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

      <AppTable items={mockTypes} keysLabels={keysLabels} titleKey={titleKey} onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)} onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}></AppTable>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Fab variant="extended" color="primary" sx={{ minWidth: 150 }} onClick={() => handleCRUDClick(null, actionTypes.create)}><Add />CRIAR</Fab>
      </Box>

      <ResourceTypeModal open={modalOpen} action={modalAction} item={modalItem} toggleModal={(open) => setModalOpen(open)} />
    </Box>
  );
}
