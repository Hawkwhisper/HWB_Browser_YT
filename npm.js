const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
app.commandLine.appendSwitch('force-color-profile=srgb');


const Menus = require('./_menus');
const path = require('path')

ipcMain.handle('win-minimize', async(event, ...args) => {
    var win = null;
    BrowserWindow.getAllWindows().map(w => { if (w.webContents.id == event.sender.id) win = w; });
    win.minimize();
    return null;
});

ipcMain.handle('win-maximize', async(event, ...args) => {
    var win = null;
    BrowserWindow.getAllWindows().map(w => { if (w.webContents.id == event.sender.id) win = w; });
    win.isMaximized() ? win.unmaximize() : win.maximize();
    return null;
});

ipcMain.handle('win-close', async(event, ...args) => {
    var win = null;
    BrowserWindow.getAllWindows().map(w => { if (w.webContents.id == event.sender.id) win = w; });
    win.close();
    return null;
});

ipcMain.handle('open-proj', async(event, ...args) => {
    var win = null;
    BrowserWindow.getAllWindows().map(w => { if (w.webContents.id == event.sender.id) win = w; });
    dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    }).then(d => {
        win.webContents.send(`proj`, d);
    });
    return null;
});

ipcMain.handle('modal', async(event, options) => {
    var win = null;
    BrowserWindow.getAllWindows().map(w => { if (w.webContents.id == event.sender.id) win = w; });
});

var Windows = {
    default: null
};

function createNewWindow(name, src, settings, menu = Menus.default.ary) {
    // Create the browser window.
    const _defaults = {
        width: 800,
        height: 600,
        webPreferences: {
            allowRunningInsecureContent: true,
            nodeIntegration: true,
            contextIsolation: false,
        }
    }
    for (let i in settings) _defaults[i] = settings[i];

    Windows[name] = new BrowserWindow(_defaults);
    Windows[name].loadFile(src)
    Windows[name].webContents.openDevTools()
    Windows[name].setMenu(Menu.buildFromTemplate(menu))
}

const createDefaultWindow = () => {
    createNewWindow('default', '_app/index.html', {
        width: 1280,
        height: 720,
        transparent: true,
        frame: false,
    });
}

app.whenReady().then(() => {
    createDefaultWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createDefaultWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})