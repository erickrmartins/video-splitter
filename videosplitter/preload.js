const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    selectVideo: () => {
        return ipcRenderer.invoke("select-video");
    },

    selectDirectory: () => {
        return ipcRenderer.invoke("select-directory");
    },

    goToOutputDirectory: (outputPath) => ipcRenderer.invoke("open-output-directory", outputPath)
});