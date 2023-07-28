const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const width = 600
  const height = 700
  const win = new BrowserWindow({
    width: width,
    minWidth: width,
    maxWidth: width,
    height: height,
    minHeight: height,
    maxHeight: height,
    frame: false,
    autoHideMenuBar: true
  })

  win.loadFile('app/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Mimic OS specific features
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })