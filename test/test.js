/**
 * Tests for the Classify.js classifier library.
 */
var Classifier = require('../classify.js');

// Test no training inputs
exports['test classify#noTrainingExamples'] = function(beforeExit, assert){
	var group = Classifier.classify("Something that should be GROUP-B");
	
    assert.equal("No Matches", group); 
};

// Test classify with training inputs
exports['test classify#withTraining'] = function(beforeExit, assert){
	Classifier.train("GROUP-A", "Some input that belongs in GROUP-A");
	Classifier.train("GROUP-A", "Some more input that belongs in GROUP-A");
	Classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");
	
	var group = Classifier.classify("Something that should be GROUP-B");
	
    assert.equal("GROUP-B", group); 
};

// Test no training inputs
exports['test rank#noTrainingExamples'] = function(beforeExit, assert){
	var group = Classifier.rank("Something that should be GROUP-B");
	
    assert.equal([], group); 
};

// Test rank with training inputs
exports['test rank#withTraining'] = function(beforeExit, assert){
	Classifier.train("GROUP-A", "Some input that belongs in GROUP-A");
	Classifier.train("GROUP-A", "Some more input that belongs in GROUP-A");
	Classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");
	
	var rankedGroups = Classifier.rank("Something that should be GROUP-B");
	
    assert.equal(2, rankedGroups.length); 
    assert.equal("GROUP-B", rankedGroups[0].group);
    assert.equal("GROUP-A", rankedGroups[1].group);  
};


