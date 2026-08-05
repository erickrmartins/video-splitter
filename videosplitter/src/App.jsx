import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="ui">
      <h1>Divisor de Videos</h1>
      <div>
        <button className="btnTypeI">Selecionar arquivo</button>
        <p>Caminho: </p>
      </div>
      <div>
        <button className="btnTypeI">Selecionar destino</button>
        <p>Destino: </p>
      </div>
      <div>
        <input type="number" placeholder="Duração de cada parte" />
        
      </div>
      <button className="btnTypeII">Dividir</button>
    </div>

  )
}

export default App
