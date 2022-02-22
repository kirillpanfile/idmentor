import * as vscode from 'vscode';
import cfg from './utils/cfg';
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('idmentor.IDMentor', async function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document: vscode.TextDocument = editor.document;
			const selection: vscode.Selection = editor.selection;

			// Get the word within the selection
			const documentTextSelection: string = document.getText(selection);
			const documentIds: string[] = documentTextSelection.match(cfg.id).join('').match(/\".*?\"/g).join(' ').split(' ');
			const idMentor: string = documentIds.map(el => `let ${el.replace('"', '').slice(0, el.length - 2)} = document.getElementById(${el});\n`).join('');
			vscode.env.clipboard.writeText(idMentor);
		}
	});
	context.subscriptions.push(disposable);
}
export function deactivate() { }
