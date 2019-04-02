## lucky npm

> 此插件的主要功能是方面使用 npm install,npm run dev,npm run build命令；搭配vue脚手架 [Vue+webpack+vuex+router](https://github.com/MrGaoGang/lucky_vue)更加舒适哦

效果图：

![image](https://github.com/MrGaoGang/lucky_start/blob/master/images/show.png?raw=true)


### 一、环境搭建
    1、npm install -g yo generator-code  安装脚手架;
    2、yo code  创建项目


![image](https://github.com/MrGaoGang/lucky_start/blob/master/images/create.png?raw=true)
    本人选择的是：javascript


> 创建好之后系统会自动生成一个 package.json 和 extension.js 文件；

### 二、package.json 配置

### 三、常用 API

> 这里主要介绍一下 extension 中的一些常用命令。官方 API 请见: [vscode api](https://code.visualstudio.com/api/references/vscode-api)

#### 1. 命令

- 命令注册

```javascript
//注册命令
vscode.commands.registerCommand('lucky.hello', () => {

});

//注册之后必须在package.json中配置:
{
    "contributes": {
        "commands": [{
            "command": "lucky.hello",
            "title": "Hello World"
        }]
    }
}

//
```

- 命令执行

```javascript
//vscode.open为vscode自带命令（也可以使用自己的命令），可以用来打开一个页面
vscode.commands.executeCommand(
  "vscode.open",
  vscode.Uri.parse(`https://code.visualstudio.com/updates/`)
);
```

- 获取所有命令

```js
vscode.commands.getCommands(false);
//会返回所有命令 接收一个参数:是否显示系统自带的内部命令,此处Wiefalse
```

#### 2. 显示

```js
vscode.window.showInformationMessage("我是info信息！");
vscode.window.showErrorMessage("我是错误信息！");

//带回调的提示
vscode.window
  .showInformationMessage("是否要做什么.....？", "是", "否", "不再提示")
  .then(result => {
    if (result === "是") {
    } else if (result === "不再提示") {
      // 其它操作
    }
  });
```

#### 3. window

- 创建一个终端并输入命令

```js
let terminalA = vscode.window.createTerminal({ name: "我是终端的名字" });
terminalA.show(true);
terminalA.sendText("npm start"); //输入命令
```

- 显示一个输入框，让用户输入一个字符串

```js
/**
 * 打开输入框以询问用户输入。
undefined如果输入框被取消（例如按ESC），则返回值。否则，返回的值将是用户键入的字符串，如果用户没有输入任何内容，则返回值为空，但是单击“确定”将输入框解除。
 * */
const result = vscode.window.showInputBox({
  prompt: "请输入版本号，",
  value: "默认值",
  placeHolder: "提示",
  valueSelection: [len, len]
});
result.then(inputValue => {
  // 是按下ESC键
  if (typeof _versionName === "undefined") return;
  //按下enter键
});
```

- 创建树状视图

```js

 vscode.window.registerTreeDataProvider('viewId', treeProvider);
 //viewId对应package.json中id
   "contributes": {
    "views": {
      "explorer": [
        {
          "id": "viewId",
          "name": "NPM Tools"
        }
      ]
    },
}
//treeProvider请见此插件源码。
```
