/** Textual markov chain generator. */
const _ = require('lodash');


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      const currWord = this.words[i];
      const nextWord = this.words[i + 1] || null;
      if (currWord in chains) {
        chains[currWord].push(nextWord);
      } else {
        chains[currWord] = [nextWord];
      }
    }

    return chains;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */
  getText() {
    const first = this.words[0]; //TODO: empty array edge case
    let text = [first];

    let currWord = first;

    while(currWord !== null) {
      const nextWord = _.sample(this.chains[currWord]);
      text.push(nextWord);
      currWord = nextWord;
    }

    return text.join(" ").slice(0,-1);
  }
}

module.exports = {
  MarkovMachine,
};