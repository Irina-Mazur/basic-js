const CustomError = require("../extensions/custom-error");

const chainMaker = {
  array: [], 
  getLength() {   
    return this.array.length;
  },

  addLink(value) { 
    if (value === undefined) {
      value = '';
    }

    this.array.push(`( ${value} )`)
    return this
  },

  removeLink(position) {
    if (!Number.isInteger(position) || position > this.array.length || position - 1 < 0) {
      this.array = []
      throw new Error('Position value should be integer!');
    }
    this.array.splice(position - 1, 1)
    return this
  },

  reverseChain() {
    this.array.reverse();
    return this;
  },

  finishChain() {
    let finish = this.array.join('~~')
    this.array = []
    return finish;
  }

};

module.exports = chainMaker;
