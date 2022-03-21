/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
function getConfig(): {} {
    const config = vscode.workspace.getConfiguration("IDMentor");
    const requests = {
        "ID": config.settings.requests,
        "Class": config.settings.requests,
    };
    return {
        settings: {
            requests
        }

    };
};
export default getConfig();