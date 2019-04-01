const vscode = require("vscode");
const path = require("path");
const config = require("./constants");
class ItemLucky extends vscode.TreeItem {
    constructor(label, collapsibleState, command, iconPath) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;

        this.contextValue = "";
        this.iconPath = iconPath;
    }
}

module.exports = class TreeProvider {
    constructor(workspace, context) {
        this.workspaceRoot = workspace;
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.isRefresh = false;
    }

    refresh() {
        this.isRefresh = true;
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(item) {
        return item;
    }

    getChildren() {
        const result = [];
        result.push(this.newLuckyItem(config.code.install));
        result.push(this.newLuckyItem(config.code.start_dev));
        result.push(this.newLuckyItem(config.code.build_pro));

        return result;
    }


    newLuckyItem(item) {
        const {
            label,
            extension,
            icon
        } = item;

        let darkIcon = path.join(__dirname, "..", "icon", icon);
        let lightIcon = path.join(__dirname, "..", "icon", icon);


        return new ItemLucky(label, vscode.TreeItemCollapsibleState.None, {
            title:label,
            command:extension,
            arguments: []
        }, {
            dark: darkIcon,
            light: lightIcon
        })
    }
}