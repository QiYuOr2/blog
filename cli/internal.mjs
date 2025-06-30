import { minimist } from "zx";

function readArgv() {
  const argv = minimist(process.argv.slice(2));

  return {
    action: argv._[1],
    actionArgs: argv._.slice(2),
  };
}

export function setup(options) {
  const { actions } = options;
  const { action, actionArgs } = readArgv();
  const selectedAction = actions.flat().find((a) => a.actionName === action);

  if (!selectedAction) {
    console.log("Action not found");
    return;
  }

  selectedAction.handler(actionArgs);
}

export function createAction(actionName, handler) {
  if (Array.isArray(actionName)) {
    return actionName.map((name) => createAction(name, handler));
  }

  return {
    actionName,
    handler,
  };
}

