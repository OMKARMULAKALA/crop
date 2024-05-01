import { Route, Routes } from 'react-router-dom';
import './App.css';
import CropForm from './CropForm';
import Results from './Results';

function App() {
  return (
    <div className='app'>
    
      <Routes>

        <Route  path='/' element={<CropForm/>}  />
        <Route  path='/Results' element={<Results/>}  />
      </Routes>
    </div>
  );
}

export default App;
