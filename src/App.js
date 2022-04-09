import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MathGameProvider } from './contexts/mathgameContext';
import Game from './pages/Game';
import Home from './pages/Home';
import Result from './pages/Result';

function App() {
  return (
    <MathGameProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      
    </MathGameProvider>
  );
}

export default App;
