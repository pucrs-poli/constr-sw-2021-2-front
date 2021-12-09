/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { MenuBook, Search, Add } from "@mui/icons-material";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from "../../components/AppTable";
import { TurmasConfirmationDialog, actionTypes, returnedActionObject } from "../../components/TurmasConfirmationDialog" 
import Turma from '../../model/Turma';
import { putNewTurmaData, putEditarTurmaData, putDeleteTurmaData, getAllData} from '../../modules/TurmasServices'

import "./Turmas.css";


export default function Turmas() {
  const [tableList, setTableList] = useState([])  
  const [tableIntrocavel, setTableIntrocavel] = useState([])  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [modalItem, setModalItem] = useState([]);

  const titleKeyList = {
    'ano': 'Ano',
    'semestre': 'Semestre',
    'horario': 'Horário',
    'disciplina': 'Disciplina'
  }

  let tableIncommingContent = []

  useEffect(() => {
    getAllTurmas()
  }, [])

  function getAllTurmas () {
    getAllData()
    .then((res) => res.json())
    .then(data => {
      if (!data) {
        throw new Error('Erro ao obter os dados');
      }

      for (let i=0; i < data.length; i++){
        const novaTurma = new Turma(data[i]._id, data[i].numero, data[i].ano, data[i].semestre, data[i].horario, data[i].disciplina)
        tableIncommingContent.push(novaTurma)
      }

      setTableList(tableIncommingContent)
      setTableIntrocavel(tableIncommingContent)
    })
    .catch((e) => {
      console.error('Um erro ocorreu durante a realização do fetch', e);
    })
  }

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
    const turmaID = item.id
    const turmaPayload = {
      "numero": item.titulo,
      "ano": item.ano,
      "semestre": item.semestre,
      "disciplina": item.disciplina,
      "horario": item.horario
    }

    putEditarTurmaData(turmaPayload, turmaID)
    .then(res => res.json())
    .then(res => {
      if (!res){
        throw new Error('Erro ao cadastrar os dados');
      }
      console.log('Turma editada com sucesso')
      getAllTurmas()
    })
    .catch((e) => {
      console.error('Um erro ocorreu durante a realização do fetch', e);
    })
  }

  const handleItemSalvar = (item) => {
    const turmaPayload = {
      "numero": item.titulo,
      "ano": item.ano,
      "semestre": item.semestre,
      "disciplina": item.disciplina,
      "horario": item.horario
    }

    putNewTurmaData(turmaPayload)
    .then(res => res.json())
    .then(res => {
      if (!res){
        throw new Error('Erro ao cadastrar os dados');
      }
      console.log('Turma cadastrada com sucesso')
      getAllTurmas()
    })
    .catch((e) => {
      console.error('Um erro ocorreu durante a realização do fetch', e);
    })
  }

  const handleItemExcluir = (item) => { // TODO: nao ta atualizando a lista quando roda o delete
    const turmaID = item.id
    const turmaPayload = {
      "numero": item.titulo,
      "ano": item.ano,
      "semestre": item.semestre,
      "disciplina": item.disciplina,
      "horario": item.horario
    }

    putDeleteTurmaData(turmaPayload, turmaID)
    .then(res => res.json())
    .then(res => {
      if (!res){
        throw new Error('Erro ao cadastrar os dados');
      }
      console.log('Turma deletada com sucesso')
      getAllTurmas()
    })
    .catch((e) => {
      console.error('Um erro ocorreu durante a realização do fetch', e);
    })
  }

  const handleSearchInputChange = (value) => { // TODO: nao ta atualizando a lista quando roda o search
    const upperValue = value.toUpperCase()
    let auxList = []
    for (let i = 0; i < tableList.length; i++){
      const item = tableList[i]
      console.log('ITEM: ', item.titulo.toString())
      if(item.titulo.toString().toUpperCase().includes(upperValue)){
        auxList.push(item)
      }
    }
    setTableList(auxList)
  }

  const handleCRUDClick = (id, actionType) => {
      console.log(id, actionType)
      const turmaItem = id
          ? tableList.find(objClass => objClass.id === id)
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
              setTableList(tableIntrocavel)
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

