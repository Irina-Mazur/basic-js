module.exports = class DepthCalculator {
  calculateDepth(array) {
    let depth = 0;
    if (Array.isArray(array) && array.length == 0) {
      return ++depth;
    }

    let elementsOnNextDepth = [];
    let isArraysOnCurrentDepth = false;

    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        isArraysOnCurrentDepth = true;
        if (array[i].length != 0) {
          array[i].forEach(element => {
            elementsOnNextDepth.push(element);
          });
        }
      }
    };

    depth = this.calculateDepth(elementsOnNextDepth);

    depth = (isArraysOnCurrentDepth) ? ++depth : depth;
    return depth;
  }
};