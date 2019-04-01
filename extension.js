// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const config = require("./src/constants");
const TreeProvider = require("./src/TreeProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lucky-start" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let install = vscode.commands.registerCommand(config.code.install.extension, function () {
		let terminal = vscode.window.createTerminal({
			name: config.pluginName
		});
		terminal.show(true);
		terminal.sendText(config.code.install.command);
	});

	context.subscriptions.push(install);

	let start = vscode.commands.registerCommand(config.code.start_dev.extension, function () {
		let terminal = vscode.window.createTerminal({
			name: config.pluginName
		});
		terminal.show(true);
		terminal.sendText(config.code.start_dev.command);
	});

	
	context.subscriptions.push(start);

	let build = vscode.commands.registerCommand(config.code.build_pro.extension, function () {
		let terminal = vscode.window.createTerminal({
			name: config.pluginName
		});
		terminal.show(true);
		terminal.sendText(config.code.build_pro.command);
	});

	context.subscriptions.push(build);

	let provider = new TreeProvider(vscode.workspace.rootPath, context);
	vscode.window.registerTreeDataProvider("mrgao_luckys", provider);



}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}