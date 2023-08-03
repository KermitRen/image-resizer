const { app, BrowserWindow, ipcMain, shell } = require('electron')
const resizeImg = require('resize-img')
const path = require('path')
const fs = require('fs')
const os = require('os')

function createWindow() {

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
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  })

  //IPC Events
  ipcMain.on('close', () => win.close())
  ipcMain.on('minimize', () => win.minimize())
  ipcMain.on('resize-image', (e, options) => createResizedImage(options))

  //Load File
  win.loadFile('app/index.html')
}

async function createResizedImage({imgPath, width, height}) {
    try {

      // Create the resized image
      const newPath = await resizeImg(fs.readFileSync(imgPath), {
        width: width,
        height: height
      })

      //Create destination folder
      const dest = path.join(os.homedir(), 'image-resizer')
      if(!fs.existsSync(dest)) {
        fs.mkdirSync(dest)
      }

      //Write file to folder
      const pathSegments = path.basename(imgPath).split(".")
      const fileName = pathSegments[0] + "_" + width + "x" + height + "." + pathSegments[1]
      fs.writeFileSync(path.join(dest, fileName), newPath)
      shell.openPath(dest)

    } catch (error) {
      console.error(error)
    }
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})