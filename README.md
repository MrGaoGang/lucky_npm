## lucky npm

> 此插件的主要功能是方面使用 npm install,npm run dev,npm run build 命令；搭配 vue 脚手架 [Vue+webpack+vuex+router](https://github.com/MrGaoGang/lucky_vue)更加舒适哦

效果图：

![image](https://github.com/MrGaoGang/lucky_start/blob/master/images/show.png?raw=true)

### 一、环境搭建

    1、npm install -g yo generator-code  安装脚手架;
    2、yo code  创建项目

![image](https://github.com/MrGaoGang/lucky_start/blob/master/images/create.png?raw=true)
本人选择的是：javascript

> 创建好之后系统会自动生成一个 package.json 和 extension.js 文件；

### 二、package.json 配置

```json
{
  "name": "lucky-npm", //插件名称
  "displayName": "lucky npm",
  "description": "",
  "version": "1.0.1",
  "publisher": "mrgao",
  "engines": {
    "vscode": "^1.32.0"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/MrGaoGang/lucky_start.git"
  },
  "categories": [
    //分类
    "Other"
  ],
  "icon": "icon/logo.png", //logo
  "activationEvents": [
    //激活方式
    "workspaceContains:package.json",
    "onCommand:lucky.gao.extension.install",
    "onCommand:lucky.gao.extension.start_dev",
    "onCommand:lucky.gao.extension.build_pro"
  ],
  "main": "./extension.js", //入口文件
  "contributes": {
    "snippets": [
      //自定义一些代码模板（可以尝试输入fetch）
      {
        "language": "javascript",
        "path": "./src/snippet/snippet.json"
      }
    ],
    "views": {
      //视图
      "explorer": [
        {
          //在资源管理器中的视图，id为mrgao_luckys，名字为LUCKY NPM
          "id": "mrgao_luckys",
          "name": "LUCKY NPM"
        }
      ]
    },
    "commands": [
      //有哪些命令
      {
        "command": "lucky.gao.extension.install",
        "title": "安装依赖(install)"
      },
      {
        "command": "lucky.gao.extension.start_dev",
        "title": "启动测试环境(dev)"
      },
      {
        "command": "lucky.gao.extension.build_pro",
        "title": "构建生产版本(pro)"
      }
    ],
    "menus": {
      //菜单，是否右键显示菜单，其中group为分类,
      "editor/context": [
        {
          "when": "editorFocus",
          "command": "lucky.gao.extension.install",
          "group": "6_luck"
        },
        {
          "when": "editorFocus",
          "command": "lucky.gao.extension.start_dev",
          "group": "6_luck"
        },
        {
          "when": "editorFocus",
          "command": "lucky.gao.extension.build_pro",
          "group": "6_luck"
        }
      ]
    }
  },
  "scripts": {
    "postinstall": "node ./node_modules/vscode/bin/install",
    "test": "node ./node_modules/vscode/bin/test"
  },
  "devDependencies": {
    "typescript": "^3.3.1",
    "vscode": "^1.1.28",
    "eslint": "^5.13.0",
    "@types/node": "^10.12.21",
    "@types/mocha": "^2.2.42"
  }
}
```

#### 1. activationEvents 介绍

> 激活插件的方式

- onLanguage 激活
  > 发出此激活事件，只要解析为某种语言的文件被打开，就会激活感兴趣的扩展。

```json
 "activationEvents"：[
     " onLanguage：python "
]
```

可以使用数组中的单独 onLanguage 条目声明多种语言 activationEvents。

```json
"activationEvents"：[
     " onLanguage：json "，
     " onLanguage：markdown "，
     " onLanguage：typescript "
]
```

- onCommand 加载方式
  > 发出此激活事件，并且只要调用命令，就会激活当前扩展：

```json
 " activationEvents "：[
     " onCommand：extension.sayHello "
]
```

- onDebug 加载方式
  > 并在启动调试会话之前激活当前扩展：

```json
 " activationEvents "：[
     " onDebug "
]
```

    onDebugInitialConfigurations
    onDebugResolve

这是两个更细粒度的 onDebug 激活事件：

> onDebugInitialConfigurations 在调用 provideDebugConfigurations 方法之前触发 DebugConfigurationProvider。
> onDebugResolve:type 在调用指定类型的 resolveDebugConfiguration 方法之前触发 DebugConfigurationProvider。
> 经验法则：如果调试扩展的激活是轻量级的，请使用 onDebug。如果它是重量级的，则使用 onDebugInitialConfigurations 和/或 onDebugResolve 取决于是否 DebugConfigurationProvider 实施相应的方法 provideDebugConfigurations 和/或 resolveDebugConfiguration。有关这些方法的更多详细信息，请参阅使用 DebugConfigurationProvider。

- workspaceContains 激活方式
  每当打开文件夹并且文件夹包含至少一个与 模式匹配的文件时，就会激活此激活事件并激活当前扩展。

```json
 " activationEvents "：[
     " workspaceContains：** /。editorconfig "
]
```

- onFileSystem 激活方式
  > 发出此激活事件，只要读取特定方案中的文件或文件夹，就会激活感兴趣的扩展。这通常是 file-scheme，但是对于自定义文件系统提供程序，有更多的方案可以实现，例如 ftp 或 ssh。

```json
 " activationEvents "：[
     " onFileSystem：sftp "
]
```

- onView 激活方式
  > 发出此激活事件，只要展开指定 ID 的视图，就会激活当前扩展：

```json
 " activationEvents "：[
     " onView：nodeDependencies "
]
```

- onUri 激活方式
  > 发出此激活事件，只要打开该扩展的系统范围的 Uri，就会激活感兴趣的扩展。Uri 计划固定为 vscode 或 vscode-insiders。Uri 权限必须是扩展的标识符。Uri 的其余部分是任意的。

```json
 " activationEvents "：[
     " onUri "
]
```

如果 vscode.git 扩展名定义 onUri 为激活事件，则会在以下任何一个 Uris 中打开它：

vscode://vscode.git/init
vscode://vscode.git/clone?url=https%3A%2F%2Fgithub.com%2FMicrosoft%2Fvscode-vsce.git
vscode-insiders://vscode.git/init （对于 VS Code Insiders）

- onWebviewPanel 激活方式
  每当 VS Code 需要使用匹配恢复 webview 时，将发出此激活事件并激活当前扩展 viewType。

例如，onWebviewPanel 的声明如下：

```json
" activationEvents "：[
" onWebviewPanel：catCoding "
]
```

当 VS Code 需要使用 viewType 恢复 webview 时，将导致扩展被激活：catCoding。viewType 在调用中设置 window.createWebviewPanel，您需要有另一个激活事件（例如，onCommand）来初始激活您的扩展并创建 webview。

- \* 激活方式

> 该\*激活事件发出后，每当 VS 代码启动感兴趣的扩展将被激活。为确保良好的最终用户体验，请仅在您的用户使用其他激活事件组合时才在扩展中使用此激活事件。

```json
 " activationEvents "：[
     " * "
]
```

### contributes介绍

详情请见 [contributes介绍](https://code.visualstudio.com/api/references/contribution-points)


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
vscode.window.setStatusBarMessage("设置状态栏的消息");

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
undefined如果输入框被取消（例如按ESC），则返回值。否则，返回的值将是用户键入的字符串，如果用户没有输入任何内容，则返回值为空，但是单击"确定"将输入框解除。
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

- 打开文档

```
vscode.workspace.openTextDocument(vscode.Uri.file("文件路径)).then(
    document => vscode.window.showTextDocument(document)
)

```

### 4、环境

- vscode.env.appName //当前编辑器的名称
- vscode.env.appRoot //打开的根目录
- vscode.env.language //用户的语言环境
