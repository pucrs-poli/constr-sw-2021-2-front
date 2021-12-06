/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Search, Add } from "@mui/icons-material";
import BookIcon from '@mui/icons-material/Book';
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from "../../components/AppTable";
import { DisciplinasConfirmationDialog, actionTypes, returnedActionObject } from "../../components/DisciplinasConfirmationDialog" 
import Disciplina from '../../model/Disciplina';

import "./Disciplinas.css";

export default function Disciplinas() {
  const [tableList, setTableList] = useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState('');
  const [modalItem, setModalItem] = React.useState({});
  const [itemId, setItemId] = React.useState(10);

  const titleKeyList = {
    'validade': 'Validade',
    'descricao': 'Descrição',
    'ementa': 'Ementa',
    'codigo': 'Código',
    'credito': 'Crédito',
    'cargahr': 'Carga Horária'    
  }  

  const incommingTableList = [
    new Disciplina('01', 'Construção de Software', '2019', 'Elaboração e Criação de Software, aplicando metodologias aprendidas em aula.', 'Testanto a ementa', 'NCP1992', '4', '120h'),
    new Disciplina('02', 'Algoritmos e Estruturas de Dados 1', '2019', 'Compreensão de algoritmos e estruturas de dados básicos.', 'Testanto a ementa', 'LPZ1002', '4', '120h'),
    new Disciplina('03', 'Verificação e Validação de Software 1', '2020', 'Aplicação de técnicas de análise de desenpenho de um software.', 'Testanto a ementa', 'PQO0118', '4', '120h'),
    new Disciplina('04', 'Projeto e Arquitetura de Software', '2020', 'Elaboração de um projeto de software.', 'Testanto a ementa', 'QII8872', '4', '120h'),
    new Disciplina('05', 'Algoritmos e Estruturas de Dados 2', '2021', 'Compreensão de algoritmos e estruturas de nível intermediário.', 'Testanto a ementa', 'QPP2711', '4', '120h'),
    new Disciplina('06', 'Algoritmos Avançados', '2021', 'Aplicação de técnicas e desenvolvimento de algotirmos complexos.', 'Testanto a ementa', 'QOP9912', '4', '120h'),
    new Disciplina('07', 'Organização e Arquitetura de Computadores', '2021', 'Linguagem de aprendizado de máquina e baixo nível.', 'Testanto a ementa', 'QIU1992', '4', '120h'),
    new Disciplina('08', 'Sistemas Operacionais', '2021', 'Desenvolvimento de um sistema operacional completo.', 'Testanto a ementa', 'PQP6666', '4', '120h'),
    new Disciplina('09', 'Manutenção de Software', '2022', 'Elaboração de um projeto de manutenção de um software.', 'Testanto a ementa', 'QIS1882', '4', '120h'),
    new Disciplina('10', 'Linguagens, Automatos e Computação', '2022', 'Desenvolvimento de automatos e compreensão da história da computação.', 'Testanto a ementa', 'QPS1342', '4', '120h')
  ]
  
  useEffect(() => {
    setTableList(incommingTableList)
  }, [])

  useEffect(() => {
    const action = returnedActionObject.actionType

    switch(action)
    {
    case 'Editar':
      handleItemEditar(returnedActionObject.item)
      break;
    case 'Cadastrar':
      handleItemSalvar(returnedActionObject.item)
      break;
    case 'Excluir':
      handleItemExcluir(returnedActionObject.item)
      break;
    default:
      console.log("Invalid");
    }
  }, [modalOpen])

  const handleItemEditar = (item) => {
    for (let i = 0; i < incommingTableList.length; i++){
      const incommingItem = incommingTableList[i]
      if (incommingItem.id === item.id) {
        incommingTableList.splice(i, 1, item)
      }
    }
    setTableList(incommingTableList)
  }

  const handleItemSalvar = (item) => {
    const id = `${itemId}`
    const newItem = new Disciplina(id, item.titulo, item.validade, item.descricao, item.ementa, item.codigo, item.credito, item.cargahr)
    setItemId((itemId + 1))
    incommingTableList.push(newItem)
    setTableList(incommingTableList)
  }

  const handleItemExcluir = (item) => {
    for (let i = 0; i < incommingTableList.length; i++){
      const incommingItem = incommingTableList[i]
      if (incommingItem.id === item.id) {
        incommingTableList.splice(i, 1)
      }
    }
    setTableList(incommingTableList)
  }

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
      const classItem = id
          ? incommingTableList.find(objClass => objClass.id === id)
          : new Disciplina();

      openModal(actionType, classItem);
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
          <BookIcon fontSize="large" />
          <Box sx={{ ml: 1 }}>Disciplinas</Box>
        </div>

        <Box sx={{ display: "flex", alignItems: "end" }}>
          <TextField
            id="outlined-basic"
            placeholder="Pesquisar disciplina"
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

      <AppTable items={tableList} titleKey={'titulo'} keysLabels={titleKeyList}  onEditClick={(id) => handleCRUDClick(id, actionTypes.edit)} onRemoveClick={(id) => handleCRUDClick(id, actionTypes.remove)}></AppTable>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Fab variant="extended" color="primary" sx={{ minWidth: 150 }} onClick={() => handleCRUDClick(null, actionTypes.create)}><Add />CRIAR</Fab>
      </Box>

      <DisciplinasConfirmationDialog open={modalOpen} action={modalAction} item={modalItem} toggleModal={(open) => setModalOpen(open)} />
    </Box>
  );
}

