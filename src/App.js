import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dasbohard from './components/Dasbohard';
import Devices from './components/Devices';
import Dcontrole from './components/Dcontrole';

function App() {
    return (
   <div>
     <Routes>
        <Route path='/' Component={Dasbohard} />
        <Route path='/devices' Component={Devices} />
        <Route path='/controle' Component={Dcontrole} />
     </Routes>
   </div>
  );
}

export default App;
