const { contextBridge, ipcRenderer } = require('electron')
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld('electronAPI', {
  close: () => ipcRenderer.send('close'),
  minimize: () => ipcRenderer.send('minimize'),
  toast: (options) => Toastify(options).showToast(), 
  sendImage: (options) => ipcRenderer.send('resize-image', options)
})