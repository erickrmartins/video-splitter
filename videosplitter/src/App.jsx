import { useState } from 'react'
import './App.css'

function App() {
  const [dirEntry, setDirEntry] = useState("C:\\Users\\erick\\Videos\\1.mp4");
  const [dirLeave, setDirLeave] = useState("C:\\Users\\erick\\Videos\\Cortes");
  const [duration, setDuration] = useState("");
  const [unit, setUnit] = useState("seconds");
  const [endCut, setEndCut] = useState(false);

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

  async function commitButton() {
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

    const data = {
      input: dirEntry,
      output: dirLeave,
      duration: finalDuration
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/split", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar requisição");
      }

      const result = await response.text();
      alert(result);
      setEndCut(true);
    }
    catch (error) {
      alert("Erro ao enviar requisição: " + error.message);
    }
  }

  async function goToOutputDirectory() {
    const sucess = await window.electronAPI.goToOutputDirectory(dirLeave);
    
    if (!sucess) {
      alert("Erro ao abrir o diretório de saída");
    }
    setEndCut(false);
  }

  if (!endCut) {
    return (
      <div className="ui">
        <div>
          <span>PASSO 1: SELECIONAR ARQUIVO</span>
          <div className="inputDiretorioDestino">
            <input
              type="text"
              placeholder={dirEntry}
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
              placeholder={dirLeave}
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
  else {
    return (
      <div className="ui">
        <div className="endCut">
          <div className="endCutText">
            <span className="endCutTitle">Vídeo dividido com sucesso!</span>
            <span>Processo realizado e arquivos já estão prontos no diretório de saída!</span>
          </div>
          <div className="endCutButtons">
            <button
              className="endCutBtnI"
              onClick={() => setEndCut(false)}
            >
              Voltar
            </button>
            <button
              className="endCutBtnII"
              onClick={goToOutputDirectory}
            >
              Diretório de saída
            </button>
          </div>

        </div>
      </div>
    )
  }
}

export default App
