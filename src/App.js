import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import AppToolbar from "./components/AppToolbar";
import { createTheme, ThemeProvider } from '@mui/material';

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
        main: "#EEF1EF"
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppToolbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/exemplo1' element={'tela1'} />
          <Route path='/exemplo2' element={'tela2'} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
