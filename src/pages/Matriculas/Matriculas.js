import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from "../../components/AppTable";
import { useParams } from "react-router-dom";

import "./Matriculas.css";

export default function Matriculas() {
  const mockClass = {
    semester: "5",
    classId: "6789",
    studentId: "1345"
  };



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

      <AppTable items={mockClasses}></AppTable>
    </Box>
  );
}

