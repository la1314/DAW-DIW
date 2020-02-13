import React from 'react';
import './App.css';
import Busqueda from './componentes/Busqueda';
import Listado from './componentes/Listado';

function App() {

  return (
    <div className="App">
      <h1>PokeDex</h1>
      <Busqueda />
      {/* <Listado /> */}
    </div>
  );
}


export default App;
