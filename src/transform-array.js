const CustomError = require("../extensions/custom-error");

const discardNext = "--discard-next"
const discardPrev = "--discard-prev"
const doubleNext = "--double-next"
const doublePrev = "--double-prev"

module.exports = function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error();
  };

  let modifiedArray = [];

  arr.forEach(el => modifiedArray.push(el));

  let i = 0;
  while (modifiedArray[i] !== undefined) {
    let element = modifiedArray[i];
    if (isCommand(element)) {
      executeCommand(modifiedArray, i);
    }
    if (discardPrev === element && i > 0) {
      i--;
    } else if ((discardNext === element) || ((doublePrev === element || discardPrev === element) && i == 0)) {
      i;
    } else {
      i++;
    }
  }

  return modifiedArray;
}

function executeCommand(modifiedArray, i) {
  let command = modifiedArray[i];
  modifiedArray.splice(i, 1);
  switch (command) {
    case discardNext:
      if (modifiedArray[i] !== undefined) {
        modifiedArray.splice(i, 1);
        if (modifiedArray[i] !== undefined && isPrevCommand(modifiedArray[i])) {
          modifiedArray.splice(i, 1);
        }
      }
      break;
    case discardPrev:
      if (modifiedArray[i - 1] !== undefined) {
        modifiedArray.splice(i - 1, 1);
      }
      break;
    case doubleNext:
      if (modifiedArray[i] !== undefined) {
        modifiedArray.splice(i, 0, modifiedArray[i]);
      }
      break;
    case doublePrev:
      if (modifiedArray[i - 1] !== undefined) {
        modifiedArray.splice(i - 1, 0, modifiedArray[i - 1]);
      }
      break;
  }
}

function isCommand(element) {
  if (!(typeof element === "string")) {
    return false;
  }
  let isStringCommand = false;
  switch (element) {
    case discardNext:
    case discardPrev:
    case doubleNext:
    case doublePrev:
      isStringCommand = true;
      break;
  }

  return isStringCommand;
}

function isPrevCommand(element) {
  if (!(typeof element === "string")) {
    return false;
  }
  let isStringCommand = false;
  switch (element) {
    case discardPrev:
    case doublePrev:
      isStringCommand = true;
      break;
  }

  return isStringCommand;
}
