function AStarSearchInit() {
  visitedArray = [];
  newArray = [];
  nodes = [];
  iteration = 0;
  level = 0;

  newArray[0] = [...initialState];
  newArray[1] = level;
  newArray[2] = ProcessAStarHeuristic(newArray[0]);
  newArray[3] = null;

  visitedArray.push([...initialState]);

  do {
    if (CompareArrays(newArray[0], finalState)) {
      level = newArray[1];

      return newArray;
    }

    newArray = AStar(newArray);

    iteration++;
  } while (iteration < totalIterations);

  return newArray;
}

function AStar(array) {
  var tempArray = [];
  var position;
  var movements;
  var size;
  var smallest;

  position = array[0].indexOf(0);
  movements = MovementRules(position);
  level = array[1];
  level++;

  size = movements.length;

  for (var i = 0; i < size; i++) {
    tempArray = [];
    tempArray[0] = array[0].slice();

    var p1 = tempArray[0][movements[i]];
    var p2 = tempArray[0][position];

    tempArray[0][position] = p1;
    tempArray[0][movements[i]] = p2;
    tempArray[1] = level;
    tempArray[2] = ProcessAStarHeuristic(tempArray[0]);
    tempArray[3] = array;

    nodes.push(tempArray);
  }

  smallest = TheSmallest();

  return smallest;
}

function ProcessAStarHeuristic(array) {
  var size = array.length;
  var weight = 0;

  for (var i = 0; i < size; i++) {
    if (array[i] != 0) {
      var pr = finalState.indexOf(array[i]);
      console.log("PEÇA ", array[i]);
      console.log("PR ", pr);
      console.log("DISTANCIA ", distanceMatrix[i][pr]);
      console.log("-----------------------------");
      weight += distanceMatrix[i][pr];
    }
  }

  return weight + level;
}
