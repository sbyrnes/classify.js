/**
 * Classify.js
 *
 * Javascript library for automated classification using Bayesian probability.
 */

 // Storage for the input parameters for the model
 var Classifier = function()
 {
   this.numTrainingExamples = 0;
   this.groupFrequencyCount = new Object();

   this.numWords = 0;
   this.wordFrequencyCount = new Object();
   this.groupWordTotal = new Object();
   this.groupWordFrequencyCount = new Object();
 }

 /** Trains the classifier with a known example.
 *
 * @param input An input value with a known classification
 * @param group The group the input should be classified as belonging to
 * @returns none
 */
Classifier.prototype.train = function(group, input)
{
  var self = this;

  self.numTrainingExamples += 1;

  incrementOrCreate(self.groupFrequencyCount, group);

  // We only want to see words once per training example
  var seenWord = new Object();

  // For each word in the input, increment all the counters
  input.split(" ").forEach(function(word) {
    // Clean non-alphanumeric characters from the input
    var cleanWord = word.replace(/\W/g, '');

    if(!seenWord[cleanWord])
    {
      self.numWords += 1;

  		incrementOrCreate(self.wordFrequencyCount, cleanWord);
      incrementOrCreate(self.groupWordTotal, group);
      incrementOrCreateGroup(self.groupWordFrequencyCount, group, cleanWord);

      seenWord[cleanWord] = true;
    }
	});
}

 /** Provides the most likely group classification for an input.
 *
 * @param input An input value with unknown classification
 * @returns The group the input is most likely a member of
 */
Classifier.prototype.classify = function(input)
{
	var topRanked = this.rank(input)[0]; // just take the top ranked group

	if(topRanked) return topRanked.group;

	return "No Matches";
}

 /** Provides all possible groups for an input in ranked order of probability of matching.
 *
 * @param input An input value with unknown classification
 * @returns An array of groups and the probability the input belongs to one of them.
 */
Classifier.prototype.rank = function(input)
{
  var self = this;

	var groups = Object.keys(self.groupFrequencyCount);
	var groupProb = self.getGroupProbabilities();

	var groupLikelihood = new Array();
	var counter = 0;
	groups.forEach(function(group) {
		groupLikelihood[counter] = new Object();
		groupLikelihood[counter].group = group;

    // Start with the overall probability of this group
    groupLikelihood[counter].probability = Math.log(groupProb[group]);

    // Note that we use logs of probability so we can add them later. Multiplying the
    // floating point values together will result in the values getting too small to track.

		counter++;
	});

	input.split(" ").forEach(function(word) {
		for(var i = 0; i < groupLikelihood.length; i++)
		{
			var group = groupLikelihood[i].group;
      var groupWordFreqCount = self.groupWordFrequencyCount[group];
			if(groupWordFreqCount[word])
			{
        // Add to the freqency of occurrence of this word in this group.
				groupLikelihood[i].probability += Math.log(groupWordFreqCount[word]/self.groupFrequencyCount[group]);

        // TODO: This should work, but right now not so much
        // Divide the prob by the overall probability of the word in all examples which.
        // Note that this does not affect the results as it is the same for all groups,
        // but it makes the probability more accurate.
        // groupLikelihood[i].probability -= Math.log(self.wordFrequencyCount[word]/self.numWords);
			}
		}
	});

  groupLikelihood.sort(function(a,b){return a.probability < b.probability});

  // Since we used logs to keep the floating point numbers reasonable, we need to move back into probability space
  groupLikelihood.forEach(function (data) {
    data.probability = Math.pow(10, data.probability);
  });

	return groupLikelihood;
}

 /** Returns all training groups and their associated probabilities (simple frequencies).
 *
 * @returns An object with properties names for the input groups whose values are the probability of that group.
 */
Classifier.prototype.getGroupProbabilities = function()
{
  var self = this;

	var groups = new Object();

	// get group probabilities
	Object.keys(self.groupFrequencyCount).forEach(function(group) {
		groups[group] = self.groupFrequencyCount[group] / self.numTrainingExamples;
	});

	return groups;
}

/**
 * Returns number of unique groups seen in the training data.
 */
Classifier.prototype.getNumGroups = function()
{
	return Object.keys(this.groupFrequencyCount).length;
}

/**
 * Looks for a field with the given value in the object and if found increments it. Otherwise, creates it with a value of 1.
 */
function incrementOrCreate(object, value)
{
	if(object[value]) object[value] += 1;
	else 		         object[value] = 1;
}

/**
 * Looks for a field with the given group and value in the object and if found increments it. Otherwise, creates it with a value of 1.
 */
function incrementOrCreateGroup(object, group, value)
{
  if(!object[group]) object[group] = new Object();

  var myGroup = object[group];

  if(myGroup[value]) myGroup[value] += 1;
  else 		          myGroup[value] = 1;
}

module.exports = Classifier;
