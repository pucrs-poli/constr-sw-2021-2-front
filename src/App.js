import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Classes from './pages/Classes/Classes';
import ResourceTypes from './pages/ResourceTypes/ResourceTypes';
import Resources from './pages/Resources/Resources';
import Alunos from './pages/Alunos/Alunos';
import Turmas from './pages/Turmas/Turmas';
import Disciplinas from './pages/Disciplinas/Disciplinas';
import Matriculas from './pages/Matriculas/Matriculas';
import Users from './pages/Users/Users';
import AppToolbar from "./components/AppToolbar";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import Salas from './pages/Salas/Salas';
import Predio_Salas from './pages/Predio_Salas/Predio_Salas';
import Predios from './pages/Predios/Predios';

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
            <Route path='/tipos_recursos' element={<ResourceTypes />} />
            <Route path='/recursos/:tipo_recurso' element={<Resources />} />
            <Route path='/alunos' element={<Alunos />} />
            <Route path='/turmas' element={<Turmas />} />
            <Route path='/disciplinas' element={<Disciplinas />} />
            <Route path='/alunos/:aluno_id/matriculas' element={<Matriculas />} />
            <Route path='/usuarios' element={<Users />} />
            <Route path='/salas' element={<Salas />} />
            <Route path='/predios' element={<Predios />} />
            <Route path='/sala_predios' element={<Predio_Salas />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider >
  );
}

export default App;
