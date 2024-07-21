import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

function createWindow(): void {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      // 使用字节码来保护预加载脚本
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR为基于电子-vite cli的渲染器。加载用于开发的远程URL或用于生产的本地html文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// 这个方法将在Electron完成初始化并准备创建浏览器窗口时调用。某些api只能在此事件发生后使用
app.whenReady().then(() => {
  // 设置windows应用的用户模型id
  electronApp.setAppUserModelId('com.electron');

  // 在开发中默认使用F12打开或关闭DevTools，而在生产中忽略 commandcontrol + R
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // 在macOS上，当点击dock图标而没有打开其他窗口时，在应用程序中重新创建一个窗口是很常见的
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//当所有窗口都关闭时退出，除了macOS。在那里，这很常见,让应用程序及其菜单栏保持活动状态，直到用户退出,显式地使用Cmd + Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// 在这个文件中，你可以包括你的应用程序的特定主进程的其余部分代码。您也可以将它们放在单独的文件中，并在这里要求它们。