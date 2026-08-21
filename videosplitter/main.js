import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
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

app.whenReady().then(() => {
    ipcMain.handle("select-video", async () => {
        const result = await dialog.showOpenDialog({
            properties: ["openFile"],
            filters: [
                {
                    name: "Video Extension",
                    extensions: ["mp4", "mkv", "avi", "mov", "webm"]
                }
            ]
        });

        if (result.canceled) {
            return null;
        }

        return result.filePaths[0];
    });

    ipcMain.handle("select-directory", async () => {
        const result = await dialog.showOpenDialog({
            properties: ["openDirectory"],
        });

        if (result.canceled) {
            return null;
        }

        return result.filePaths[0];

    });

    ipcMain.handle("open-output-directory", async (event, outputPath) => {
        const errorMessage = await shell.openPath(path.normalize(outputPath));

        if (errorMessage) {
            console.error("Erro ao abrir o diretório:", errorMessage);
            return false;
        }

        return true;
    });

    createWindow();
}); 