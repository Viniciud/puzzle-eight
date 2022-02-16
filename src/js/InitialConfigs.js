var initialState = [];
var finalState = [];
var newArray = [];
var visitedArray = [];
var nodes = [];
var infinite = 100000;
var totalIterations = 10000;
var iteration = 0;
var level = 0;
var distanceMatrix = [
  [0, 1, 2, 1, 2, 3, 2, 3, 4],
  [1, 0, 1, 2, 1, 2, 3, 2, 3],
  [2, 1, 0, 3, 2, 1, 4, 3, 2],
  [1, 2, 3, 0, 1, 2, 1, 2, 3],
  [2, 1, 2, 1, 0, 1, 2, 1, 2],
  [3, 2, 1, 2, 1, 0, 3, 2, 1],
  [2, 3, 4, 1, 2, 3, 0, 1, 2],
  [3, 2, 3, 2, 1, 2, 1, 0, 1],
  [4, 3, 2, 3, 2, 1, 2, 1, 0],
];
