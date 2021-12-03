/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from "../../components/AppTable";

import "./Turmas.css";

export default function Turmas() {
  const [tableList, setTableList] = useState([])

  const incommingTableList = [
    {'titulo': 'Turma 031', 'ano': '2018', 'sem': '1', 'hr': 'JK', 'discp': 'Construção de Software'},
    {'titulo': 'Turma 041', 'ano': '2019', 'sem': '2', 'hr': 'LM', 'discp': 'Algoritmos e Estruturas de Dados 1'},
    {'titulo': 'Turma 051', 'ano': '2019', 'sem': '1', 'hr': 'LM', 'discp': 'Verificação e Validação de Software 1'},
    {'titulo': 'Turma 061', 'ano': '2019', 'sem': '1', 'hr': 'JK', 'discp': 'Projeto e Arquitetura de Software'},
    {'titulo': 'Turma 155', 'ano': '2020', 'sem': '2', 'hr': 'NP', 'discp': 'Algoritmos e Estruturas de Dados 2'},
    {'titulo': 'Turma 240', 'ano': '2020', 'sem': '1', 'hr': 'NP', 'discp': 'Algoritmos Avançados'},
    {'titulo': 'Turma 570', 'ano': '2021', 'sem': '1', 'hr': 'JK', 'discp': 'Organização e Arquitetura de Computadores'},
    {'titulo': 'Turma 619', 'ano': '2021', 'sem': '1', 'hr': 'LM', 'discp': 'Sistemas Operacionais'},
    {'titulo': 'Turma 113', 'ano': '2022', 'sem': '2', 'hr': 'JK', 'discp': 'Manutenção de Software'},
    {'titulo': 'Turma 114', 'ano': '2022', 'sem': '1', 'hr': 'LM', 'discp': 'Linguagens, Automatos e Computação'}
  ]

  const titleKeyList = {
    'ano': 'Ano',
    'sem': 'Semestre',
    'hr': 'Horário',
    'discp': 'Disciplina'
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
            onChange={(e) => {
              handleSearchInputChange(e.target.value)
            }}
          />
        </Box>
      </Box>

      <AppTable items={tableList} titleKey={'titulo'} keysLabels={titleKeyList} ></AppTable>
    </Box>
  );
}

