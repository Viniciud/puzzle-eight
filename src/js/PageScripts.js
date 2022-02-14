var initialState = [];
var finalState = [];
var resultArray = [];

$(document).ready(function () {
  var stateValues = $(".initial");
  var finalValues = $(".final");

  stateValues.each(function () {
    initialState.push(Number.parseInt($(this).val()));
  });

  finalValues.each(function () {
    finalState.push(Number.parseInt($(this).val()));
  });

  $(".input-estado").change(function () {
    (initialState = []), (finalState = []);

    stateValues.each(function () {
      initialState.push(Number.parseInt($(this).val()));
    });

    finalValues.each(function () {
      finalState.push(Number.parseInt($(this).val()));
    });
  });

  $(".astar-search").click(function () {
    if (!ValidateStates()) {
      var data1 = new Date(),
        data2,
        el = $(this);

      el.html("Aguarde...");

      document.querySelector(".movimentos").innerHTML = "";
      document.querySelector(".nos").innerHTML = "";
      document.querySelector(".tempo").innerHTML = "";
      document.querySelector(".tipo-busca").innerHTML = "Busca A*";

      setTimeout(function () {
        result = AStarSearchInit();

        data2 = new Date();
        ShowResult(data1, data2, "Busca A*");
        buildMovements(result);

        el.html("Busca A*");
      }, 1000);
    }
  });

  $(".depth-search").click(function () {
    if (!ValidateStates()) {
      var data1 = new Date(),
        data2,
        el = $(this);

      el.html("Aguarde...");

      document.querySelector(".movimentos").innerHTML = "";
      document.querySelector(".nos").innerHTML = "";
      document.querySelector(".tempo").innerHTML = "";
      document.querySelector(".tipo-busca").innerHTML = "Busca em Profundidade";

      setTimeout(function () {
        resultado = DepthSearchInit();

        data2 = new Date();
        ShowResult(data1, data2, "Busca em Profundidade");
        buildMovements(resultado);

        el.html("Busca em Profundidade");
      }, 1000);
    }
  });
});

function ValidateStates() {
  var erro = false;

  for (var i = 0; i < 9; i++) {
    if (initialState.indexOf(i) == -1) {
      erro = true;
    }
  }

  for (var i = 0; i < 9; i++) {
    if (finalState.indexOf(i) == -1) {
      erro = true;
    }
  }

  if (erro) {
    alert(
      "Por favor insira valores válidos! Talvez tenha valores repetidos ou tenha faltado algum valor!"
    );
  }

  return erro;
}

function ShowResult(data1, data2, tipo) {
  var diff = data2.getTime() - data1.getTime();
  var msec = diff;
  var hh;
  var mm;
  var ss;

  hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  document.querySelector(".tempo").innerHTML = hh + ":" + mm + ":" + ss;
  document.querySelector(".nos").innerHTML = iteration;
  document.querySelector(".movimentos").innerHTML = level;
  document.querySelector(".tipo-busca").innerHTML = tipo;
}

function ShowMovementsTable(arr) {
  var g = 0,
    tab = "<div class='res-mov'><span>";

  for (var i = 0; i < 3; i++) {
    tab += "</span><div class='res-linha'>";

    for (var j = 0; j < 3; j++) {
      var zero = "";

      if (arr[g] == 0) {
        zero = "zero";
      }

      tab += "<div class='" + zero + "'>" + arr[g] + "</div>";
      g++;
    }

    tab += "</div>";
  }

  return tab;
}

function buildMovements(arr) {
  arrResultado = [];

  while (arr !== null) {
    arrResultado.unshift(arr[0]);

    arr = arr[3];
  }

  $(".resultado_movimentos").html("");

  for (var i = 0; i < arrResultado.length; i++) {
    var res = ShowMovementsTable(arrResultado[i]);
    $(".resultado_movimentos").append(
      res + "<div class='movement_item'>" + "Passo: " + i + "</div>"
    );
  }
}

function CompareArrays(array1, array2) {
  var equal = true;
  var size = array1.length;

  for (var i = 0; i < size; i++) {
    if (array1[i] != array2[i]) {
      equal = false;
    }
  }

  return equal;
}

function Expanded(array) {
  var size = visitedArray.length,
    equals = false;

  for (var i = 0; i < size; i++) {
    if (CompareArrays(array, visitedArray[i])) {
      return true;
    }
  }

  return equals;
}

function TheSmallest() {
  var smallest = infinite;
  var position;
  var size = nodes.length;

  for (var i = 0; i < size; i++) {
    if (nodes[i][2] < smallest && !Expanded(nodes[i][0])) {
      smallest = nodes[i][2];
      position = i;
    }
  }

  visitedArray.push(nodes[position][0]);
  return nodes[position];
}

function MovementRules(position) {
  switch (position) {
    case 0:
      return [1, 3];
    case 1:
      return [0, 4, 2];
    case 2:
      return [1, 5];
    case 3:
      return [0, 4, 6];
    case 4:
      return [1, 5, 7, 3];
    case 5:
      return [2, 4, 8];
    case 6:
      return [3, 7];
    case 7:
      return [6, 4, 8];
    case 8:
      return [5, 7];
  }
}
