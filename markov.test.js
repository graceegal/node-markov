const { MarkovMachine } = require("./markov");


describe("get chains", function () {

  test("return chains w/no duplicates", function () {
    let machine = new MarkovMachine("The cat in the hat.");
    expect(machine.getChains()).toEqual({
      The: ['cat'],
      cat: ['in'],
      in: ['the'],
      the: ['hat.'],
      'hat.': [null]
    });
  });

  test("return chains w/ duplicates", function () {
    let machine = new MarkovMachine(
      "The cat is in the hat. The cat is the cat. The hat is a cat."
    );
    expect(machine.getChains()).toEqual({
      The: ['cat', 'cat', 'hat'],
      cat: ['is', 'is'],
      is: ['in', 'the', 'a'],
      in: ['the'],
      the: ['hat.', 'cat.'],
      'hat.': ['The'],
      'cat.': ['The', null],
      hat: ['is'],
      a: ['cat.']
    });
  });
});

describe("get words", function() {

  test("text with no branches", function() {
    let machine = new MarkovMachine("The cat in the hat.");
    expect(machine.getText()).toEqual("The cat in the hat.");
  });

  test("text with branches returns a string", function() {
    let machine = new MarkovMachine("I would not, could not, in the rain. Not in the dark. Not on a train, Not in a car, Not in a tree.");
    let chains = machine.getChains();
    chains["not,"] = ["could", "in,"]

    //https://stackoverflow.com/questions/57970044/check-if-a-string-contains-abc-or-cde-with-jest
    expect(machine.getText()).toMatch(/not, (could|in)/);
    expect(machine.getText()).toContain("tree.");
    expect(machine.getText()).toEqual(expect.any(String));
  });

});
