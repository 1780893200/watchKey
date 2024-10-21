const { app, BrowserWindow } = require('electron');
const { uIOhook, UiohookKey }  = require('uiohook-napi');

app.whenReady().then(() => {
  createWindow();
  initWatchKey();

  // 在没有窗口可用的情况下激活应用时会打开新的窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
})

app.on('window-all-closed', () => {
  // 在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序
  // process.platform == 'darwin' 是macos系统
  if (process.platform !== 'darwin') app.quit()
})

// 创建浏览器窗口
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('./core/pages/index.html').then(r => {
    console.log("成功打开程序")
  })
}

// 监听键盘按键
const initWatchKey = ()=>{
  // 开启监听键盘事件
  uIOhook.start();
  uIOhook.on('keydown', (e) => {
    const keycode = e.keycode
    let key = null;
    for(let item in UiohookKey){
      if(UiohookKey[item] === keycode){
        key = item;
        break; // 找到就跳出循环(结束当前作用域循环)
        // continue 跳出当前循环，继续下一次循环
      }
    }
    console.log('Hello!',keycode,key,new Date().getTime())
  })
}