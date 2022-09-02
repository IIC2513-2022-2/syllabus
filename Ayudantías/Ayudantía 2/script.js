
// Función que genera un numero al azar entre 0 y <num> (sin incluir este último)
function generateRandom(num) {
    return Math.floor(Math.random() * num)
}

// Función que selecciona una celda al azar
function selectRandomBlock() {
    return document.getElementsByClassName('cell')[generateRandom(9)]
}

// Función que le cambia el color de fondo al elemento <cell> entregado
function changeColor(cell) {
    // Array de diferentes colores
    let colors = ["white", "red", "yellow", "green", "blue", "purple"]

    // Dividimos por 2 el valor dentro de la celda hasta llegar a 1 para ver que potencia de 2 es el número
    // Obtenemos el numero dentro de la celda
    number = cell.innerHTML

    // Iteramos dividiendo en 2 hasta que el valor sea 1, de forma que
    // - Si <number> era 0, entonces no se itera e <i> queda con valor 0
    // - Si <number> era 2, entonces se itera una vez con lo que <number> llega a 1 e <i> queda en 1
    // - Si <number> era 4, entonces se itera dos veces con lo que <number> llega a 1 e <i> queda en 2
    // Así sucesivamente, podemos encontrar que potencia de 2 es el valor de <number>
    i = 0
    while (number != 1 && number != 0) {
        i += 1
        number = number / 2
    }

    // Cambiammos el color de la celda de forma que el indice en el array de <colors> es igual a la potencia de <number>
    cell.style.backgroundColor = colors[i];
}

function generateNumber() {

    // Nos aseguramos que no todas las celdas esten vacías
    //Obtenemos un Object Collection con todos los elementos que tengan la clase "cell"
    let cells = document.getElementsByClassName('cell')

    // Iteramos por el Object Collection <cells> y si encontramos alguna que tenga valor 0, cambiamos el valor de <empty> a true
    let empty = false
    for (let i = 0; i < 9; i += 1) {
        if (cells[i].innerHTML == 0) {
            empty = true;
        }
    }

    // Si es que existe alguna celda con valor 0 dentro, seleccionamos una al azar para cambiarle los atributos
    if (empty) {

        // Obtenemos una celda al azar con la función declarada anteriormente "selectRandomBlock()"
        var cell = selectRandomBlock();

        // Si es que la celda no contiene el valor 0 dentro, entonces buscamos obtenemos otra celda al azar hasta que toque alguna que tenga el valor 0
        while (cell.innerHTML != 0) {
            var cell = selectRandomBlock();
        }

        // Generamos un número al azar que puede ser 1, 2 o 3 y elevamos 2 a ese número
        let number = 2 ** (generateRandom(3) + 1);
        // Cambiamos el valor de la celda seleccionada por la potencia de 2 obtenida
        cell.innerHTML = number;

        // Cambiamos el color según el valor con la función declarada anteriormente "changeColor()"
        changeColor(cell);

    } else {
        // Si es que no quedan celdas con valor 0, cambiamos el mensaje para avisarle al jugador
        document.getElementbyId("message").innerHTML = "No quedan celdas vacías";
    }

}

function sumCells() {

    // Obtenemos los elementos inputs en los que el jugador escribe
    let input_cell_1 = document.getElementById("cella");
    let input_cell_2 = document.getElementById("cellb");

    // Obtenemos las celdas según el valor que el jugador escribio con .value
    var cell_1 = document.getElementById(input_cell_1.value);
    var cell_2 = document.getElementById(input_cell_2.value);

    // Si es que <cell_1> y <cell_2> no son nulas, entonces al ponerlas como condición entregan true
    // Con esto, revisamos que las celdas que obtuvimos no sean nulas
    if (cell_1 && cell_2) {

        // Si es que el valor dentro de las celdas es igual
        if (cell_1.innerHTML == cell_2.innerHTML) {

            // Cambiamos el valor de la lo que está dentro de la primera celda por su doble
            cell_2.innerHTML = cell_2.innerHTML * 2;
            // Y cambiamos el valor de lo que está dentro de la segunda celda por 0
            cell_1.innerHTML = 0;

            // Cambiamos el color de ambas celdas con la función definida anteriormente "changeColor()"
            changeColor(cell_1);
            changeColor(cell_2);
        } else {
            // Si es que el valor dentro de las celdas no es el mismo, le entregamos el mensaje al jugador
            document.getElementById("message").innerHTML = "Las celdas no tienen el mismo valor";
        }
    } else {
        // Si es que el input no entrega una celda, le entregamos el mensaje al jugador
        document.getElementById("message").innerHTML = "Alguna de las celdas no existe";
    }

}