// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('taskclick.runTask', async (uri: vscode.Uri) => {
        const folderPath = uri.fsPath;

        // Running the dotnet task using the current folder
        vscode.window.showInformationMessage(`Running task in folder: ${folderPath}`);

        // Start the task
        const task = new vscode.Task(
            { type: 'shell' },
            vscode.TaskScope.Workspace,
            'Run Dotnet Task',
            'dotnet',
            new vscode.ShellExecution(`dotnet run --launch-profile https`, { cwd: folderPath })
        );

        // Execute the task
        await vscode.tasks.executeTask(task);
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
