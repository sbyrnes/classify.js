/**
 * Classify.js 
 * 
 * Javascript library for automated classification using Bayesian probability. 
 */
 
 // Storage for the input parameters for the model
 var numTrainingExamples = 0;
 var groupFrequencyCount = new Object();
 
 var numWords = 0;
 var wordFrequencyCount = new Object();
 
 /** Trains the classifier with a known example.
 *
 * @param input An input value with a known classification
 * @param group The group the input should be classified as belonging to
 * @returns none
 */
function train(group, input)
{
	numTrainingExamples += 1;
	incrementOrCreate(groupFrequencyCount, group);
	
	input.split(" ").forEach(function(word) {
		numWords += 1;
	incrementOrCreate(wordFrequencyCount, word);
	});
}

 /** Provides the most likely group classification for an input. 
 *
 * @param input An input value with unknown classification 
 * @returns The group the input is most likely a member of
 */
function classify(input)
{
	var topRanked = rank(input)[0]; // just take the top ranked group
	
	if(topRanked) return topRanked.group;
	
	return "No Matches";
}

 /** Provides all possible groups for an input in ranked order of probability of matching. 
 *
 * @param input An input value with unknown classification 
 * @returns An array of groups and the probability the input belongs to one of them. 
 */
function rank(input)
{
	var groups = Object.keys(groupFrequencyCount);
	var groupProb = getGroupProbabilities();
	
	var groupLikelihood = new Array();
	var counter = 0;
	groups.forEach(function(group) {
		groupLikelihood[counter] = new Object();
		groupLikelihood[counter].group = group;
		groupLikelihood[counter].probability = groupProb[group];
		
		counter++;
	});

	return groupLikelihood;
}

 /** Returns all training groups and their associated probabilities (simple frequencies). 
 *
 * @returns An object with properties names for the input groups whose values are the probability of that group. 
 */
function getGroupProbabilities()
{
	var groups = new Object();

	// get group probabilities
	Object.keys(groupFrequencyCount).forEach(function(group) {
		groups[group] = groupFrequencyCount[group] / numTrainingExamples;
	});
	
	return groups;
}

function incrementOrCreate(array, value)
{
	if(array[value]) array[value] += 1;
	else 		     array[value] = 1;
}

module.exports.train = train;
module.exports.classify = classify;
module.exports.rank = rank;

