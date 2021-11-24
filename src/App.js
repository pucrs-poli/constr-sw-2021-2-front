import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Routes>
          <Route exact path='/'   component={'telaInicial'} />
          <Route path='/exemplo1' component={'tela1'} />
          <Route path='/exemplo2' component={'tela2'} />
      </Routes>
    </Router>
  );
}

export default App;
