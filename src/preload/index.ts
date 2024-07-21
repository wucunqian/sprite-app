import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// 渲染器的定制api
const api = {};

// 使用' contextBridge ' api只在启用上下文隔离时向渲染器暴露 Electron api，否则只添加到DOM全局变量中
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
