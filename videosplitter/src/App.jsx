import { useState } from 'react'
import './App.css'


function App() {
  const [dirEntry, setDirEntry] = useState("C:\\Users\\erick\\Videos");
  const [dirLeave, setDirLeave] = useState("C:\\Users\\erick\\Documents\\Cortes");
  const [duration, setDuration] = useState("");
  const [unit, setUnit] = useState("minutes");

  async function selectVideo() {
    const path = await window.electronAPI.selectVideo();

    if (!path) {
      return;
    }

    setDirEntry(path);
  }

  async function selectDirectory() {
    const path = await window.electronAPI.selectDirectory();

    if (!path) {
      return;
    }

    setDirLeave(path);
  }

  function getDurationinSeconds() {
    const value = Number(duration);

    if (unit == "minutes") {
      return value * 60;
    }

    return value;
  }

  function commitButton() {
    if (!dirEntry) {
      alert("Necessário selecionar um arquivo");
      return;
    }

    if (!dirLeave) {
      alert("Necessário selecionar um diretório destino");
      return;
    }

    if (!duration) {
      alert("Necessário selecionar uma duração");
      return;
    }

    const finalDuration = getDurationinSeconds();
  }

  return (
    <div className="ui">
      <div>
        <span>PASSO 1: SELECIONAR ARQUIVO</span>
        <div className="inputDiretorioDestino">
          <input
            type="text"
            placeholder="C:/User/Docs/Entrada"
            value={dirEntry}
            onChange={(event) => setDirEntry(event.target.value)}
          />
          <button
            className="btnTypeI"
            onClick={selectVideo}
          >
            Procurar
          </button>
        </div>
      </div>
      <div>
        <span>PASSO 2: SELECIONAR DIRETÓRIO DESTINO</span>
        <div className="inputDiretorioDestino">
          <input
            type="text"
            placeholder="C:/User/Docs/Saída"
            value={dirLeave}
            onChange={(event) => setDirLeave(event.target.value)}
          />
          <button
            className="btnTypeI"
            onClick={selectDirectory}
          >
            Procurar
          </button>
        </div>
      </div>
      <div>
        <span>PASSO 3: SELECIONAR DURAÇÃO DAS PARTES</span>
        <div className="inputDuracao">
          <input
            type="number"
            placeholder="Duração de cada parte"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
          <select
            value={unit}
            onChange={(event) => setUnit(event.target.value)}
          >
            <option value="seconds">Segundos</option>
            <option value="minutes">Minutos</option>
          </select>
        </div>
      </div>
      <button
        className="btnTypeII"
        onClick={commitButton}
      >
        Dividir
      </button>
    </div>
  )
}

export default App
