const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  if (options == undefined || options == null) {
    return str;
  }
  options.repeatTimes = options.repeatTimes || 1;
  options.additionRepeatTimes = options.additionRepeatTimes || 1;
  options.separator = options.separator || '+';
  options.additionSeparator = options.additionSeparator || '|';

  let result = '';
  for (let i = 0; i < options.repeatTimes; i++) {
    result += str;
    if (options.addition !== undefined) {
      for (let j = 0; j < options.additionRepeatTimes; j++) {
        result += options.addition;
        if (j !== options.additionRepeatTimes - 1) {
          result += options.additionSeparator;
        }
      }
    }
    if (i !== (options.repeatTimes - 1)) {
      result += options.separator;
    }

  }

  return result;
};
