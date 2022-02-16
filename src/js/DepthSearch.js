var found = null;

function DepthSearchInit() {
  visitedArray = [];
  newArray = [];
  nodes = [];
  iteration = 0;
  level = 0;

  newArray[0] = [...initialState];
  newArray[1] = level;
  newArray[2] = null;
  newArray[3] = null;

  nodes.push(newArray);

  do {
    found = Depth(nodes[0]);
    console.log("FOUND ", found);
    nodes.shift();
    iteration++;
  } while (found == null);

  console.log("FOUND");
  return found;
}

function Depth(array) {
  var position;
  var movements;
  var size;
  var tempArray;

  position = array[0].indexOf(0);
  movements = MovementRules(position);
  level = array[1];
  level++;

  size = movements.length;

  for (var i = 0; i < size; i++) {
    console.log("POSITION ", position);
    console.log("MOVEMENTS ", movements);
    tempArray = [];
    tempArray[0] = array[0].slice();
    console.log("TEMP ARRAY ", tempArray[0]);

    var p1 = tempArray[0][movements[i]];
    var p2 = tempArray[0][position];
    console.log("P1 ", p1);
    console.log("P2 ", p2);
    console.log("Movements[i] ", movements[i]);

    tempArray[0][position] = p1;
    tempArray[0][movements[i]] = p2;
    tempArray[1] = level;
    tempArray[2] = null;
    tempArray[3] = array;

    console.log("TEMP ARRAY [0][POSITION] ", tempArray[0][position]);
    console.log("TEMP ARRAY [0][movements[i] ", tempArray[0][movements[i]]);
    console.log("TEMP ARRAY [1]", tempArray[1]);
    console.log("TEMP ARRAY [2]", tempArray[2]);
    console.log("TEMP ARRAY [3]", tempArray[3]);
    console.log("-----------------");

    if (CompareArrays(tempArray[0], finalState)) {
      return tempArray;
    }

    nodes.push(tempArray);
  }

  return null;
}
