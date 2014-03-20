classify.js WORK IN PROGRESS
===========

Naieve Bayesian Classifier in pure javascript.

Description
---------
Classify.js is a Naieve Bayesian classifier for javascript applications. After training it will examples, it can classify new inputs into the groups you defined in the training set. 

An example use of such a classifier is an email spam filter, where the text of incoming emails is classified as either spam or not spam. 

Installation
---------

    npm install classify.js

Usage 
---------
    
To use Classify.js, require the classify.js module and follow the 2 steps below.
<!-- language: lang-js -->
    var Classifier = require('classify.js');

#### STEP 1. Train your classifier.

Provide a series of training examples that specify the classification group and the input that matches that group. You should provide as many examples per group as possible. Note that all inputs for a given group should use exactly the same group name. 

    Classifier.train("GROUP-A", "Some input that belongs in GROUP-A");
    Classifier.train("GROUP-A", "Some other input that belongs in GROUP-A");
    Classifier.train("GROUP-B", "Some input that belongs in GROUP-B");

#### STEP 2. Classify.

To classify, simply provide an input and the return value will be the name of the group that best matches the input. 

    var group = Classifier.classify("Some input that should be GROUP-B");

    // group = 'GROUP-B'

Advanced 
---------

The classifier works by calculating the probability that a given input matches the patterns seen in the training examples. The classification group that has the highest probability of matching the input is considered the classification of the input. 

However, in some cases it might be useful to retrieve the rank order of all possible groups along with their probabilities. This can be helpful when creating tools such as auto-complete text boxes on websites. To retrieve a rank ordered list of the groups for a given input (along with probabilities) you can do the following. 

    var groupList = Classifier.rankGroups("Some input that should be GROUP-B");
    
    // groupList = [ { group: 'GROUP-B', probability: -0.75 }, { group: 'GROUP-A', probability: -0.45 } ]
    
Note that the probabilities listed should not be considered accurate on their own, they are only useful in comparison to one another. They are not actual probabilities since in many cases the numeric values of the probabilities would be too small and instead are the logarithm of the calculated probability weights. 

For example, if a group has a probability of 0.8 that does not mean it's 80% likely, it means that it is four times more likely than something with a probability of 0.2. This is due to the nature of Naieve Bayesian statistics, where the form of the distribution is not known. 

About Bayesian Statistics 
---------
Bayesian classifiers utilize a statistical tool known as Bayes' Theorem while allows you to calculate the conditional probability of two events based on other evidence. The Theorem is written as:

P(A|B) = P(B|A) P(A) / P(B)

The probability of A given B is equal to the probability of B given A times the probability of A divided by the probability of B. In the case of this classifier, this formula is used to compute the probability of a given classification group (A) given an input (B). 

'Naieve Bayes' refers to the fact that classifier has no prior knowledge of the inputs before the training begins. While this is a very general tool, it is often the case that adjusting the model based on information known about the groups ahead of time can produce better results. 

One of the draw backs to this method is that the probabilities computed are not always reliable. This is because the distribution is not known ahead of time and the model is so simple it may learn incorrect distributions. 
