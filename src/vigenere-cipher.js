const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(directMachine = true) {
    this.directMachine = directMachine
    this.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  }

  encrypt(message, key) {
    if (!message || !key) throw Error

    let messageUppercase = message.toUpperCase()
    let keyUpperCase = this.createKey(messageUppercase, key)
    let encryptedMessage = ''

    for (let i = 0; i < message.length; i++) {
      if (this.indexAlphabet(messageUppercase[i]) == -1)
        encryptedMessage += messageUppercase[i]
      else
        encryptedMessage += this.alphabet[
          ((this.indexAlphabet(messageUppercase[i]) +
            this.indexAlphabet(keyUpperCase[i])) % 26)
        ]
    }

    return this.directMachine ? encryptedMessage : encryptedMessage.split('').reverse().join('')
  }

  decrypt(message, key) {
    if (!message || !key) throw Error

    let messageUppercase = message.toUpperCase()
    let keyUpperCase = this.createKey(messageUppercase, key)
    let unencryptedMessage = ''

    for (let i = 0; i < message.length; i++) {
      if (this.indexAlphabet(messageUppercase[i]) == -1)
        unencryptedMessage += messageUppercase[i]
      else {
        let code = this.indexAlphabet(messageUppercase[i]) -
          this.indexAlphabet(keyUpperCase[i])
        if (code < 0) code = 26 + code;
        unencryptedMessage += this.alphabet[code]
      }
    }

    return this.directMachine ? unencryptedMessage : unencryptedMessage.split('').reverse().join('')
  }

  createKey(message, key) {
    let keyUpperCase = ''

    let index = 0
    for (let i = 0; i < message.length; i++) {
      if (this.indexAlphabet(message[i]) == -1) {
        keyUpperCase += message[i]
        index++
      } else {
        keyUpperCase += key[(i - index) % key.length]
      }
    }
    return keyUpperCase.toUpperCase()
  }

  indexAlphabet(letter) {
    return this.alphabet.indexOf(letter)
  }
}

module.exports = VigenereCipheringMachine;
