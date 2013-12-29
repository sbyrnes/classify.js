/**
 * Classify.js 
 * 
 * Javascript library for automated classification using Bayesian probability. 
 */
 
 /** Trains the classifier with a known example.
 *
 * @param input An input value with a known classification
 * @param group The group the input should be classified as belonging to
 * @returns none
 */
function train(input, group)
{
	;
}

 /** Provides the most likely group classification for an input. 
 *
 * @param input An input value with unknown classification 
 * @returns The group the input is most likely a member of
 */
function classify(input)
{
	var group = rank(input)[0]; // just take the top ranked group
	
	if(group) return group;
	
	return "No Matches";
}

 /** Provides all possible groups for an input in ranked order of probability of matching. 
 *
 * @param input An input value with unknown classification 
 * @returns An array of groups and the probability the input belongs to one of them. 
 */
function rank(input)
{
	return [];
}

module.exports.train = train;
module.exports.classify = classify;
module.exports.rank = rank;

