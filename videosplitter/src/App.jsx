import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="ui">
      <h1>Divisor de Videos</h1>
      <div>
        <button className="btnTypeI">Selecionar arquivo</button>
        <span className="selectedFile">Nenhum arquivo selecionado</span>
      </div>
      <div>
        <button className="btnTypeI">Selecionar destino</button>
        <span className="selectedDirectory">Nenhum destino selecionado</span>
      </div>
      <div>
        <div>
          <input type="number" placeholder="Duração de cada parte" />
          <select>
            <option>Segundos</option>
            <option>Minutos</option>
            <option>Hora</option>
          </select>
        </div>
      </div>
      <button className="btnTypeII">Dividir</button>
    </div>

  )
}

export default App
