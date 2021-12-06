/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { MenuBook, Search, Add } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from "../../components/AppTable";
import { TurmasConfirmationDialog, actionTypes } from "../../components/TurmasConfirmationDialog" 
import Turma from '../../model/Turma';

import "./Turmas.css";

export default function Turmas() {
  const [tableList, setTableList] = useState([])  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [modalItem, setModalItem] = useState([]);

  const incommingTableList = [
    new Turma('01', 'Turma 031', '2018', '1', 'JK', 'Construção de Software'),
    new Turma('02', 'Turma 041', '2019', '2', 'LM', 'Algoritmos e Estruturas de Dados 1'),
    new Turma('03', 'Turma 051', '2019', '1', 'LM', 'Verificação e Validação de Software 1'),
    new Turma('04', 'Turma 061', '2019', '1', 'JK', 'Projeto e Arquitetura de Software'),
    new Turma('05', 'Turma 155', '2020', '2', 'NP', 'Algoritmos e Estruturas de Dados 2'),
    new Turma('06', 'Turma 240', '2020', '1', 'NP', 'Algoritmos Avançados'),
    new Turma('07', 'Turma 570', '2021', '1', 'JK', 'Organização e Arquitetura de Computadores'),
    new Turma('08', 'Turma 619', '2021', '1', 'LM', 'Sistemas Operacionais'),
    new Turma('09', 'Turma 113', '2022', '2', 'JK', 'Manutenção de Software'),
    new Turma('10', 'Turma 114', '2022', '1', 'LM', 'Linguagens, Automatos e Computação'),
  ]

  const titleKeyList = {
    'ano': 'Ano',
    'semestre': 'Semestre',
    'horario': 'Horário',
    'disciplina': 'Disciplina'
  }

  useEffect(() => {
    setTableList(incommingTableList)
  }, [])

  const handleSearchInputChange = (value) => {
    const upperValue = value.toUpperCase()
    let auxList = []
    for (let i = 0; i < incommingTableList.length; i++){
      const item = incommingTableList[i]
      if(item.titulo.toUpperCase().includes(upperValue)){
        auxList.push(item)
      }
    }
    setTableList(auxList)
  }

  const handleCRUDClick = (id, actionType) => {
      console.log(id, actionType)
      const turmaItem = id
          ? incommingTableList.find(objClass => objClass.id === id)
          : new Turma();

      openModal(actionType, turmaItem);
  }

  const openModal = (action, itemProps) => {
      console.log(action, itemProps)
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
          <MenuBook fontSize="large" />
          <Box sx={{ ml: 1 }}>Turmas</Box>
        </div>

        <Box sx={{ display: "flex", alignItems: "end" }}>
          <TextField
            id="outlined-basic"
            placeholder="Pesquisar turma"
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
            onChange={(e) => {
              handleSearchInputChange(e.target.value)
            }}
          />
        </Box>
      </Box>

      <AppTable items={tableList} titleKey={'titulo'} keysLabels={titleKeyList} onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)} onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}></AppTable>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Fab variant="extended" color="primary" sx={{ minWidth: 150 }} onClick={() => handleCRUDClick(null, actionTypes.create)}><Add />CRIAR</Fab>
      </Box>

      <TurmasConfirmationDialog open={modalOpen} action={modalAction} item={modalItem} toggleModal={(open) => setModalOpen(open)} />
    </Box>
  );
}

