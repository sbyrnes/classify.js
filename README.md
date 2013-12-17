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
Classifier.train("GROUP-A", "Some input that belongs in GROUP-A");
Classifier.train("GROUP-A", "Some other input that belongs in GROUP-A");
Classifier.train("GROUP-B", "Some input that belongs in GROUP-B");

#### STEP 2. Classify.
var group = Classifier.classify("Some input that should be GROUP-B");

// group = 'GROUP-B'




