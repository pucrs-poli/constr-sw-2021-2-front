import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/exemplo1' element={'tela1'} />
        <Route path='/exemplo2' element={'tela2'} />
      </Routes>
    </Router>
  );
}

export default App;
