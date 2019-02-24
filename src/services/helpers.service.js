const makeIdResults = {}
export const makeId = (len = 6) => {
  const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let text = ''
  do {
    text = ''
    for (let i = 0; i < len; i++) {
      text += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
  } while(true === makeIdResults[text]) {
    makeIdResults[text] = true
  }
  return text
}