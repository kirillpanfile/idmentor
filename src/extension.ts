import * as vscode from 'vscode';
const fs = require('fs');
const path = require('path');
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('idmentor.IDMentor', async function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			const data = document.getText(selection);
			let result = data.match(/id="[A-za-z0-9-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+"/g).join('').match(/\".*?\"/g).join(' ').split(' ');
			let copy: string = result.map(el => `let ${el.replace('"', '').slice(0, el.length - 2)} = document.getElementById(${el});\n`).join('');
			vscode.env.clipboard.writeText(copy);
		}
	});
	context.subscriptions.push(disposable);
}
export function deactivate() { }
