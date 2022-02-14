function iniciarBuscaGulosa() {
  visitedArray = [];
  nodes = [];
  iteration = 0;
  level = 0;

  newArray = [];
  newArray[0] = [...estadoInicial];
  newArray[1] = level;
  newArray[2] = calculaHeuristica(newArray[0]);
  newArray[3] = null;

  visitedArray.push([...estadoInicial]);

  do {
    if (comparaArray(newArray[0], estadoFinal)) {
      level = newArray[1];

      return newArray;
    }

    newArray = gulosa(newArray);

    iteration++;
  } while (iteration < iteracoesTotal);

  return newArray;
}

function gulosa(arr) {
  var position, movimentos, tam, arrTem, menor;

  position = arr[0].indexOf(0);
  movimentos = regraMovimento(position);
  level = arr[1];
  level++;

  tam = movimentos.length;

  for (var i = 0; i < tam; i++) {
    arrTem = [];
    arrTem[0] = arr[0].slice();

    var p1 = arrTem[0][movimentos[i]];
    var p2 = arrTem[0][position];

    arrTem[0][position] = p1;
    arrTem[0][movimentos[i]] = p2;
    arrTem[1] = level;
    arrTem[2] = calculaHeuristica(arrTem[0]);
    arrTem[3] = arr;

    nodes.push(arrTem);
  }

  menor = retornaMenor();

  return menor;
}

function calculaHeuristica(arr) {
  var tam = arr.length;
  var peso = 0;

  for (var i = 0; i < tam; i++) {
    if (arr[i]) {
      var pr = estadoFinal.indexOf(arr[i]);
      peso += matrizDistancia[i][pr];
    }
  }

  return peso;
}
