import * as vscode from 'vscode';
import runGenerate from './generator';

export const generateSsn = (): void => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const inputText = editor.document.getText(selection);
    const ssn = runGenerate(inputText);
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, ssn);
    });
  }
};
