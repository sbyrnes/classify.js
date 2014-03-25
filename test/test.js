/**
 * Tests for the Classify.js classifier library.
 */
var Classifier = require('../classify.js');


// Test cleaning the input
exports['test cleanInput'] = function(beforeExit, assert){
  var classifier = new Classifier();
  var group = classifier.train("GROUP", "Ver}}{\\y no'is;y input.");

  assert.equal(3, Object.keys(classifier.wordFrequencyCount).length);
  assert.equal(1, classifier.wordFrequencyCount["Very"]);
  assert.equal(1, classifier.wordFrequencyCount["noisy"]);
  assert.equal(1, classifier.wordFrequencyCount["input"]);
};

// Test no training inputs
exports['test rank#noTrainingExamples'] = function(beforeExit, assert){
  var classifier = new Classifier();
	var group = classifier.rank("Something that should be GROUP-B");

    assert.equal(0, group.length);
};

// Test rank with training inputs
exports['test rank#withTraining'] = function(beforeExit, assert){
  var classifier = new Classifier();

	classifier.train("GROUP-A", "Some input that belongs in GROUP-A");
	classifier.train("GROUP-A", "Some more input that belongs in GROUP-A");
  classifier.train("GROUP-A", "Another GROUP-A");
	classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");
  classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");

	var rankedGroups = classifier.rank("Some other input that belongs in GROUP-B");

  assert.equal(2, rankedGroups.length);
  assert.equal("GROUP-B", rankedGroups[0].group);
  assert.equal("GROUP-A", rankedGroups[1].group);
};

// Test no training inputs
exports['test classify#noTrainingExamples'] = function(beforeExit, assert){
  var classifier = new Classifier();

	var group = classifier.classify("Something that should be GROUP-B");

    assert.equal("No Matches", group);
};

// Test classify with training inputs
exports['test classify#withTraining'] = function(beforeExit, assert){
  var classifier = new Classifier();

  classifier.train("GROUP-A", "Some input that belongs in GROUP-A");
  classifier.train("GROUP-A", "Some more input that belongs in GROUP-A");
  classifier.train("GROUP-A", "Another GROUP-A");
  classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");
  classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");

	var group = classifier.classify("Something that should be GROUP-B");

  assert.equal("GROUP-B", group);
};

// Test training from files
exports['test classify#fromFiles'] = function(beforeExit, assert){
  var classifier = new Classifier();

  classifier.trainFromFile("GROUP-A", "test/sample/sample1.txt");
  classifier.trainFromFile("GROUP-A", "test/sample/sample2.txt");
  classifier.trainFromFile("GROUP-A", "test/sample/sample3.txt");
  classifier.trainFromFile("GROUP-B", "test/sample/sample4.txt");
  classifier.trainFromFile("GROUP-B", "test/sample/sample5.txt");

  var group = classifier.classify("Something that should be GROUP-B");

  assert.equal("GROUP-B", group);
};
