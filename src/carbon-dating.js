const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

module.exports = function dateSample(sampleActivity) {
  if (typeof sampleActivity != 'string') {
    return false;
  }

  const calculatedSampleActivity = parseFloat(sampleActivity);

  if (!calculatedSampleActivity || calculatedSampleActivity <= 0 || calculatedSampleActivity > MODERN_ACTIVITY)
    return false;

  let k = 0.693 / HALF_LIFE_PERIOD;
  let age = Math.log(MODERN_ACTIVITY / sampleActivity) / k;
  return Math.ceil(age);
};
