/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Search } from "@mui/icons-material";
import BookIcon from '@mui/icons-material/Book';
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from "../../components/AppTable";

import "./Disciplinas.css";

export default function Disciplinas() {
  const [tableList, setTableList] = useState([])
  const incommingTableList = [
    {'titulo': 'Construção de Software', 'val': '2019', 'desc': 'Elaboração e Criação de Software, aplicando metodologias aprendidas em aula.', 'ement': 'Testanto a ementa', 'cod': 'NCP1992', 'cred': '4', 'carghr': '120h'},
    {'titulo': 'Algoritmos e Estruturas de Dados 1', 'val': '2019', 'desc': 'Compreensão de algoritmos e estruturas de dados básicos.', 'ement': 'Testanto a ementa', 'cod': 'LPZ1002', 'cred': '4', 'carghr': '120h'},
    {'titulo': 'Verificação e Validação de Software 1', 'val': '2020', 'desc': 'Aplicação de técnicas de análise de desenpenho de um software.', 'ement': 'Testanto a ementa', 'cod': 'PQO0118', 'cred': '4', 'carghr': '120h'},
    {'titulo': 'Projeto e Arquitetura de Software', 'val': '2020', 'desc': 'Elaboração de um projeto de software.', 'ement': 'Testanto a ementa', 'cod': 'QII8872', 'cred': '4', 'carghr': '120h'},
    {'titulo': 'Algoritmos e Estruturas de Dados 2', 'val': '2021', 'desc': 'Compreensão de algoritmos e estruturas de nível intermediário.', 'ement': 'Testanto a ementa', 'cod': 'QPP2711', 'cred': '4', 'carghr': '120h'},
    {'titulo': 'Algoritmos Avançados', 'val': '2021', 'desc': 'Aplicação de técnicas e desenvolvimento de algotirmos complexos.', 'ement': 'Testanto a ementa', 'cod': 'QOP9912', 'cred': '4', 'carghr': '120h'},
    {'titulo': 'Organização e Arquitetura de Computadores', 'val': '2021', 'desc': 'Linguagem de aprendizado de máquina e baixo nível.', 'ement': 'Testanto a ementa', 'cod': 'QIU1992', 'cred': '4', 'carghr': '120h'},
    {'titulo': 'Sistemas Operacionais', 'val': '2021', 'desc': 'Desenvolvimento de um sistema operacional completo.', 'ement': 'Testanto a ementa', 'cod': 'PQP6666', 'cred': '4', 'carghr': '120h'},
    {'titulo': 'Manutenção de Software', 'val': '2022', 'desc': 'Elaboração de um projeto de manutenção de um software.', 'ement': 'Testanto a ementa', 'cod': 'QIS1882', 'cred': '4', 'carghr': '120h'},
    {'titulo': 'Linguagens, Automatos e Computação', 'val': '2022', 'desc': 'Desenvolvimento de automatos e compreensão da história da computação.', 'ement': 'Testanto a ementa', 'cod': 'QPS1342', 'cred': '4', 'carghr': '120h'}
  ]
  const titleKeyList = {
    'val': 'Validade',
    'desc': 'Descrição',
    'ement': 'Ementa',
    'cod': 'Código',
    'cred': 'Crédito',
    'carghr': 'Carga Horária'    
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
          <BookIcon fontSize="large" />
          <Box sx={{ ml: 1 }}>Disciplinas</Box>
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

