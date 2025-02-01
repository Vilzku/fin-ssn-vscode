import * as vscode from 'vscode';
import { generateSsn } from './commands';
import {
  InvalidInputError,
  INVALID_INPUT_ERROR_TEXT,
  UNEXPECTED_ERROR_TEXT,
} from './errors';

const wrapErrorHandler = (commandFn: () => void): (() => void) => {
  return () => {
    try {
      commandFn();
    } catch (e) {
      if (e instanceof InvalidInputError) {
        vscode.window.showErrorMessage(INVALID_INPUT_ERROR_TEXT);
      } else {
        vscode.window.showErrorMessage(UNEXPECTED_ERROR_TEXT);
        console.error(e);
      }
    }
  };
};

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand(
    'fin-ssn.generateSsn',
    wrapErrorHandler(generateSsn)
  );
  context.subscriptions.push(disposable);
};

export const deactivate = () => {};
