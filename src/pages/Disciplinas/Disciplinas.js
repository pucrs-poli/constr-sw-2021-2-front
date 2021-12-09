/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Search, Add } from "@mui/icons-material";
import BookIcon from '@mui/icons-material/Book';
import { InputAdornment, TextField, Fab } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from "../../components/AppTable";
import { DisciplinasConfirmationDialog, actionTypes, returnedActionObject } from "../../components/DisciplinasConfirmationDialog" 
import Disciplina from '../../model/Disciplina';
import { putNewDisciplinaData, putEditarDisciplinaData, putDeleteDisciplinaData, getAllData} from '../../modules/DisciplinasServices'

import "./Disciplinas.css";

export default function Disciplinas() {
  const [tableList, setTableList] = useState([]);  
  const [tableIntrocavel, setTableIntrocavel] = useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalAction, setModalAction] = React.useState('');
  const [modalItem, setModalItem] = React.useState({});

  const titleKeyList = {
    'validade': 'Validade',
    'descricao': 'Descrição',
    'ementa': 'Ementa',
    'codigo': 'Código',
    'credito': 'Crédito',
    'cargahr': 'Carga Horária'    
  }

  let tableIncommingContent = []
  
  useEffect(() => {
    getAllDisciplinas()
  }, [])

  function getAllDisciplinas () {
    getAllData()
    .then((res) => res.json())
    .then(data => {
      if (!data) {
        throw new Error('Erro ao obter os dados');
      }

      for (let i=0; i < data.length; i++){
        const novaTurma = new Disciplina(data[i]._id, data[i].nome, data[i].validade, data[i].objetivos, data[i].ementa, data[i].codigo, data[i].creditos, data[i].cargaHoraria)
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
    const disciplinaID = item.id
    const disciplinaPayload = {
      "nome": item.titulo,
      "validade": item.validade,
      "objetivos": item.descricao,
      "ementa": item.ementa,
      "codigo": item.codigo,
      "creditos": item.credito,
      "cargaHoraria": item.cargahr
    }

    putEditarDisciplinaData(disciplinaPayload, disciplinaID)
    .then(res => res.json())
    .then(res => {
      if (!res){
        throw new Error('Erro ao cadastrar os dados');
      }
      console.log('Disciplina editada com sucesso')
      getAllDisciplinas()
    })
    .catch((e) => {
      console.error('Um erro ocorreu durante a realização do fetch', e);
    })
  }

  const handleItemSalvar = (item) => {
    const disciplinaPayload = {
      "nome": item.titulo,
      "validade": item.validade,
      "objetivos": item.descricao,
      "ementa": item.ementa,
      "codigo": item.codigo,
      "creditos": item.credito,
      "cargaHoraria": item.cargahr
    }

    putNewDisciplinaData(disciplinaPayload)
    .then(res => res.json())
    .then(res => {
      if (!res){
        throw new Error('Erro ao cadastrar os dados');
      }
      console.log('Disciplina cadastrada com sucesso')
      getAllDisciplinas()
    })
    .catch((e) => {
      console.error('Um erro ocorreu durante a realização do fetch', e);
    })
  }

  const handleItemExcluir = (item) => {
    const disciplinaID = item.id
    const disciplinaPayload = {
      "nome": item.titulo,
      "validade": item.validade,
      "objetivos": item.descricao,
      "ementa": item.ementa,
      "codigo": item.codigo,
      "creditos": item.credito,
      "cargaHoraria": item.cargahr
    }

    return putDeleteDisciplinaData(disciplinaPayload, disciplinaID)
    .then(res => res.json())
    .then(res => {
      if (!res){
        throw new Error('Erro ao cadastrar os dados');
      }
      console.log('Disciplina deletada com sucesso')
      getAllDisciplinas()
    })
    .catch((e) => {
      console.error('Um erro ocorreu durante a realização do fetch', e);
    })
  }

  const handleSearchInputChange = (value) => {
    const upperValue = value.toUpperCase()
    let auxList = []
    for (let i = 0; i < tableList.length; i++){
      const item = tableList[i]
      if(item.titulo.toUpperCase().includes(upperValue)){
        auxList.push(item)
      }
    }
    setTableList(auxList)
  }

  const handleCRUDClick = (id, actionType) => {
      const classItem = id
          ? tableList.find(objClass => objClass.id === id)
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
          <Fab variant="extended" color="primary" sx={{ minWidth: 150 }} onClick={() => handleCRUDClick(null, actionTypes.create)}><Add />ADICIONAR</Fab>
      </Box>

      <DisciplinasConfirmationDialog open={modalOpen} action={modalAction} item={modalItem} toggleModal={(open) => setModalOpen(open)} />
    </Box>
  );
}

