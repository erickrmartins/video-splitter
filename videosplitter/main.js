import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {

    const window = new BrowserWindow({

        width: 1000,

        height: 700,

        webPreferences: {

            preload: path.join(__dirname, "preload.js")

        }

    });

    window.loadURL("http://localhost:5173");

}

app.whenReady().then(createWindow);