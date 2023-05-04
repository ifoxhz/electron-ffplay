import { app, BrowserWindow, globalShortcut } from 'electron'

app.commandLine.appendSwitch('disable-site-isolation-trials');
app.allowRendererProcessReuse = false;

let mainWindow
// let splashScreen

const rootURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}`

const ffi = require('ffi-napi')
const ref = require('ref-napi')
/* const Union = require('ref-union-napi')
const Struct = require('ref-struct-napi')
const refArray = require('ref-array-napi') */
  
let Kooda = new ffi.Library(('/usr/local/lib/libestor_sdk_src.dylib'), {
  'jskStart': [ref.types.int, ['string', ref.types.int16]],
  'jskWaitOnline': [ref.types.void, []],
  'jskGetNodeId': [ref.types.int, ['int64 *']],
  'jskSetLoggerLevel': [ref.types.void, ['int']],
  'jskJoinNetworkAndWaitReady': [ref.types.int, ['string']],
  'jskSyncTcpClient': ['pointer', []],
  'jskSetAssociateNetwork2': ['int', ['string', 'string']],
  'jskSetUserPin': ['int', ['string', 'string', 'string', 'string']],
  'jskSyncTcpConnect': ['int', ['string', 'pointer']],
  'jskSyncCloseConfirm': [ref.types.void, ['pointer', 'int']],
  'etsmeEcdsaMkKeyPair': ['string', ['pointer', 'int']],
  'jskStop': [ref.types.int, []],
  'jskDistClean': [ref.types.int, []],
  'jskSyncClose': [ref.types.int, ['pointer']],
  'etsmeInitEtsutils': [ref.types.void, [ref.types.long, 'string', 'string', 'string', 'string']],
  'jskSetSession': [ref.types.void, ['pointer']],
  'jskRun': [ref.types.void, ['pointer']],
  'jskRegisterCallback': [ref.types.void, ['int', 'pointer', 'pointer', 'pointer']],
  'jskEtsmeSend': ['int', ['string', 'pointer', 'int', 'pointer', 'pointer', 'int', 'pointer']],
  'jskSetLoggerFunction': [ref.types.void, ['pointer']],
  'etsmeSetAccessToken': [ref.types.void, ['string']],
  'etsmeSetRefreshToken': [ref.types.void, ['string']],
  'jskSetEventCallback': [ref.types.void, ['pointer', 'string', 'pointer']],
  'etsmeLog': [ref.types.void, ['string']],
  'etsmeInitLogger': ['pointer', ['string']],
  // 'jskSyncNative': [ref.types.bool, ['pointer']],
  'jskHasNativePath': [ref.types.bool, ['pointer', 'string', 'string', 'string']],
  'jskURLRewrite': [ref.types.int, ['string', 'string', 'int']]
});

console.log('dfdkfj55555555555', Kooda)

// app.commandLine.appendSwitch("ignore-gpu-blacklist");
// app.commandLine.appendSwitch("register-pepper-plugins", 'ppapi_mpv.dll;application/x-mpvjs');

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 698,
    useContentSize: true,
    width: 1200,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      webSecurity: false,
      nativeWindowOpen: true,
      contextIsolation: false
      // plugins: true
    },
    frame: false,
    autoHideMenuBar: true
  })

  mainWindow.once('ready-to-show', () => {
    // if (splashScreen) {
    // splashScreen.isDestroyed() || splashScreen.close();
    // splashScreen = null;
    // }
    mainWindow.show()
  })

  mainWindow.loadURL(rootURL + '/index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    mainWindow.webContents.toggleDevTools()
  })

  const gotTheLock = app.requestSingleInstanceLock()
  
  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // 当运行第二个实例时,将会聚焦到myWindow这个窗口
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }

  createWindow()
  /*
  splashScreen = new BrowserWindow({
    height: 600,
    width: 800,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    center: true,
    webPreferences: {
      webSecurity: false
    }
  })

  splashScreen.once('ready-to-show', () => {
    splashScreen.show()
  })

  splashScreen.loadURL(process.env.NODE_ENV === 'development' ? `file://${__dirname}/../splash.html` : `file://${__dirname}/splash.html`)
  */
})

app.on('will-quit', function () {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
