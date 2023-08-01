const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {

  //Create Window
  const width = 550
  const height = 700
  const win = new BrowserWindow({
    width: width,
    minWidth: width,
    maxWidth: width,
    height: height,
    minHeight: height,
    maxHeight: height,
    frame: false,
    autoHideMenuBar: true,
    contextIsolation: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  //IPC Events
  ipcMain.on('close', () => win.close())
  ipcMain.on('minimize', () => win.minimize())

  //Load File
  win.loadFile('app/index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })