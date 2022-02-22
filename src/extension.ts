import * as vscode from 'vscode';
import * as textBuilder from './utils/textBuilder'
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('idmentor.IDMentor', async function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document: vscode.TextDocument = editor.document;
			const selection: vscode.Selection = editor.selection;
			const documentTextSelection: string = document.getText(selection);
			const ids: string = textBuilder.getID(documentTextSelection);
			const classes: string = textBuilder.getClass(documentTextSelection);
			vscode.env.clipboard.writeText(ids.concat(classes));
		}
	});
	context.subscriptions.push(disposable);
}
export function deactivate() { }
