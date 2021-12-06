import { MenuBook, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AppTable from "../../components/AppTable";

import "./Alunos.css";

export default function Alunos() {
  const keysLabels = {
    email: "E-mail",
    // birthday: "Data de nascimento",
    phone: "Telefone",
  };
  const titleKey = "name";

  const mockClass = {
    id: "1345",
    name: "João Severo",
    email: "potato@potate.com",
    birthday: "2019-08-21T00:00:00.000Z",
    phone: "+55(51)99455-6722",
  };

  const mockClasses = Array(4).fill(mockClass);

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
          <Box sx={{ ml: 1 }}>Alunos</Box>
        </div>

        <Box sx={{ display: "flex", alignItems: "end" }}>
          <TextField
            id="outlined-basic"
            placeholder="Pesquisar aluno"
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

      <AppTable
        items={mockClasses}
        keysLabels={keysLabels}
        titleKey={titleKey}
      ></AppTable>
    </Box>
  );
}
