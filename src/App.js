import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Classes from './pages/Classes/Classes';
import Alunos from './pages/Alunos/Alunos';
import Matriculas from './pages/Matriculas/Matriculas';
import AppToolbar from "./components/AppToolbar";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#108BB1"
      },
      secondary: {
        main: "#100C06"
      },
      background: {
        default: "#EEF1EF"
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppToolbar />
        <Box sx={{ mx: 12 }} >
          <Routes >
            <Route exact path='/' element={<Home />} />
            <Route path='/aulas' element={<Classes />} />
            <Route path='/alunos' element={<Alunos />} />
            <Route path='/alunos/:aluno_id/matriculas' element={<Matriculas />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider >
  );
}

export default App;
