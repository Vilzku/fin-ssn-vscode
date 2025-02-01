import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { INVALID_INPUT_ERROR_TEXT } from '../errors';

suite('Extension Test Suite', () => {
  let showErrorMessageSpy: sinon.SinonSpy;

  setup(() => {
    showErrorMessageSpy = sinon.spy(vscode.window, 'showErrorMessage');
  });

  teardown(() => {
    showErrorMessageSpy.restore();
  });

  test('Generate SSN without input', async () => {
    const document = await vscode.workspace.openTextDocument();
    await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand('fin-ssn.generateSsn');
    const output = document.getText();
    assert.strictEqual(output.length, 11);
  });

  test('Invalid input error message', async () => {
    const originalText = 'abc';
    const document = await vscode.workspace.openTextDocument({
      content: originalText,
    });
    const editor = await vscode.window.showTextDocument(document);

    editor.selection = new vscode.Selection(
      new vscode.Position(0, 0),
      new vscode.Position(0, 10)
    );
    await vscode.commands.executeCommand('fin-ssn.generateSsn');

    assert.ok(
      showErrorMessageSpy.calledOnceWithExactly(INVALID_INPUT_ERROR_TEXT)
    );
    assert.strictEqual(document.getText(), originalText);
  });
});
