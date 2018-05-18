//Declaración de variables

//Arrays de cartones,jugadores,numeros...

var array_numeros = [];
var nombre_jugadores = ["Rafa","Andrés","Pedro","Alberto","Marta","Lucia","Alicia",
                    "Lorena","Laura","Ignacio","Tomás","Cristian","Javier","Francisco",
                    "Mateo","Verónica","Pepi","María","Luis"];
var nombre_ganadores = [];
var total_cartones_cpu = [];
var num_salido = [];
var num_carton = [];

//Variables para controlar el funcionamiento del juego

var num_ganadores = 0;
var cantado_bingo = false;

// Valores de los "sliders"

// num_jug solo incluye a los jugadores de la CPU. Por lo que puede haber entre 4 y 19.
// ya que el mínimo de jugadores es 5 y el máximo 20.
// A la hora de realizar cálculos para repartir el premio, si tenemos en cuenta a todos los jugadores.

var slider_jug = document.getElementById("slider_num_jug");
var num_jug = document.getElementById("num_jug");
num_jug.innerHTML = slider_jug.value;
var jugadores = num_jug.innerHTML;

slider_jug.oninput = function(){
    num_jug.innerHTML = this.value;
    jugadores = num_jug.innerHTML;
}

var slider_eur = document.getElementById("slider_eur");
var euros = document.getElementById("euros");
euros.innerHTML = slider_eur.value;
var euros_apostados = euros.innerHTML;

slider_eur.oninput = function(){
    euros.innerHTML = this.value;
    euros_apostados = euros.innerHTML;

}

var slider_speed = document.getElementById("slider_speed");
var speed = document.getElementById("speed");
speed.innerHTML = slider_speed.value;

var tiempo_espera = speed.innerHTML;
slider_speed.oninput = function(){
    speed.innerHTML = this.value;
    tiempo_espera = speed.innerHTML;
}


//Variables para los modales y su funcionamiento
var modal = document.getElementById('modal_incorrecto');
var modal_win = document.getElementById('modal_correcto');
var modal_cpu = document.getElementById('modal_cpu');
var modal_fin = document.getElementById('modal_fin');

//Variables para cerrar los modales
var closeModalIncorrecto = $(".close_inc");
var closeModalCorrecto =  $(".close_cor");
var closeModalFin = $(".close_fin");

closeModalIncorrecto.click(function(){
    modal.style.display = "none";
})

closeModalCorrecto.click(function(){
    modal_win.style.display = "none";
})

closeModalFin.click(function(){
    modal_fin.style.display = "none";
})


function modalIncorrecto() {
    modal.style.display = "block";
}

function modalcorrecto(){
    modal_win.style.display = "block";
}

function modalCpu(){
    modal_cpu.style.display = "block";
}

function modalFin(){
    modal_fin.style.display = "block";
}

/**
 * Con esta función damos la alternativa a cerrar los modales sin pinchar en la "X",
 *  solo tendríamos que pulsar en la pantalla y se cerraría una vez estén abiertos.
 *  Esto no pasa con el modal_cpu, ya que forzamos a pulsar "Si" o "No" para continuar el juego.
 */

window.onclick = function(event) {
    if (event.target == modal)
    {
        modal.style.display = "none";
    }
    if (event.target == modal_win)
    {
        modal_win.style.display = "none";
    }
    if (event.target == modal_fin)
    {
        modal_fin.style.display = "none";
    }
}


$(function() {
    presentacionInicial();
    var numeros = document.getElementsByClassName("numeros"); 

    array_numeros = [
        [1,2,3,4,5,6,7,8,9],
        [10,11,12,13,14,15,16,17,18,19],
        [20,21,22,23,24,25,26,27,28,29],
        [30,31,32,33,34,35,36,37,38,39],
        [40,41,42,43,44,45,46,47,48,49],
        [50,51,52,53,54,55,56,57,58,59],
        [60,61,62,63,64,65,66,67,68,69],
        [70,71,72,73,74,75,76,77,78,79],
        [80,81,82,83,84,85,86,87,88,89,90]
        ];

    var btn_generar_carton = $("#generar_carton");

    /**
     * Cuando pulsemos sobre el botón de generar cartón, automáticamente empezaremos la partida, para eso primero
     * se nos generará un cartón para nosotros, y otro para los jugadores de la CPU y comenzará el juego.
     */

    btn_generar_carton.click(function()
    {
        rellenaCarton();
        generarCartonesCPU();
        empiezaPartida();
        $('#btn_bingo').removeAttr("disabled");

    })

    var btn_bingo = $("#btn_bingo");

    /**
     * Este botón comprueba si tenemos bingo, devolviendo true si es correcto o false si no lo es.
     */
    btn_bingo.click(function()
    {
        if(cantarBingo())
        {
            cantado_bingo = true;

        } else
        {
            cantado_bingo = false;
        }

    })

    
    var btn_si = $("#btn_si");

    /**
     * Esta función coge los botones del Modal, una vez la máquina ha cantado bingo, y nos permite elegir
     * si queremos comprobar nuestro cartón o no, una vez elijamos, si tenemos bingo nosotros también nos
     * felicitará con un Modal, y si no lo tenemos nos lo dirá y finalmente aparecerá el premio para el ganador
     * o los ganadores.
     */

    btn_si.click(function()
    {
        modal_cpu.style.display = "none";
        if(!cantarBingo())
        {
        finalPartida();
        }
    })

    var btn_no = $("#btn_no");
    btn_no.click(function()
    {
        modal_cpu.style.display = "none";
        finalPartida();
    })


    /**
     * Con esta función reiniciamos el array, ya que de aquí sacamos (y eliminamos) los números para rellenar
     * los cartones. De esta forma si queremos seguir jugando tras la primera partida, podemos volver a coger
     * de entre los 90 números disponibles, sin importar que hayan salido en partidas o cartones anteriores.
     */
function resetearArrays(){
     array_numeros = [
        [1,2,3,4,5,6,7,8,9],
        [10,11,12,13,14,15,16,17,18,19],
        [20,21,22,23,24,25,26,27,28,29],
        [30,31,32,33,34,35,36,37,38,39],
        [40,41,42,43,44,45,46,47,48,49],
        [50,51,52,53,54,55,56,57,58,59],
        [60,61,62,63,64,65,66,67,68,69],
        [70,71,72,73,74,75,76,77,78,79],
        [80,81,82,83,84,85,86,87,88,89,90]
                        ];
}

/**
 * Esta función rellena el recuadro inferior a la izquierda con los 90 números, para posteriormente 
 * "iluminarlos" cuando salgan en la partida.
 */
function noventanumeros(){
    for(let i=1;i<=90;i++){
        var nodo_span = document.createElement("span");
        nodo_span.setAttribute("id",i);
        nodo_span.setAttribute("style","border: 1px solid grey");
        var lista_numeros = document.createTextNode(i);
        nodo_span.appendChild(lista_numeros);
        numeros[0].appendChild(nodo_span);
        }            
}
        
/**
 * Esta función rellenara nuestro cartón de forma aleatoria impidiendo que haya una columna sin numeros.
 * 
 * Para comprobar esto, vamos a hacer que donde en la primera fila hay números, en la tercera fila
 * hay un hueco vacio (con excepción de una casilla que se rellenará al azar entre vacio o número)
 * de esta forma, nunca coincidirán espacios vacios en la primera y tercera fila, por lo que ya es imposible
 * que hayan tres espacios vacios, de esta forma no controlaremos la segunda fila para nada.
 */
function rellenaCarton(){
    var vacios_1vuelta = [];
    resetearArrays();
    for(let j=1;j<=3;j++)  {
    var vacios = 4;
    var rellenos = 5;
    for(var i=1;i<=9;i++){
        if(j==1 || j==2){
            var num_azar = random(1,9);
            if(num_azar>5 && vacios!=0){
                num_carton.push(0);
                vacios--;
                if(j==1)
                {
                    vacios_1vuelta.push(i);
                }
               
            }
            else{
                if(rellenos!=0){
                    var numero = random(0,array_numeros[i-1].length-1);
                    num_carton.push(array_numeros[i-1][numero]);
                    array_numeros[i-1].splice(numero,1);
                    rellenos--;
                }
                else{
                    num_carton.push(0);
                    vacios--;
                    if(j==1)
                    {
                        vacios_1vuelta.push(i);
                    }
                    }
                } 
        }

        if(j==3)
        {
            if (i!=vacios_1vuelta[0] && i!=vacios_1vuelta[1] && i!=vacios_1vuelta[2] && i!=vacios_1vuelta[3]){  
                if(vacios!=0)
                {
                    num_carton.push(0);
                    vacios--;
                }
                else
                {
                var numero = random(0,array_numeros[i-1].length-1);
                num_carton.push(array_numeros[i-1][numero]);
                array_numeros[i-1].splice(numero,1);
                rellenos--;
                }
            }
            else
            {
                var numero = random(0,array_numeros[i-1].length-1);
                num_carton.push(array_numeros[i-1][numero]);
                array_numeros[i-1].splice(numero,1);
                rellenos--;
            }
            
        }
    }
    }
    dibujaCarton(); 
    marcar_desmarcar();
   
}
    
/**
 * Esta función sirve para marcar o desmarcar las casillas de nuestro cartón. Para ello, vemos si tienen
 * la clase "imagen", es decir, que estén "vacias", en ese caso no podremos hacer click en ellas y cambiar
 * su color de fondo. Si no tienen la clase imagen, comprobamos si ya han sido pulsadas, si ya tienen
 * la clase "marcado", es decir, ya han sido pulsadas, le quitamos la clase, y si no lo han sido, se la ponemos.
 */
function marcar_desmarcar(){
    var casilla = $(".carton div");
    casilla.click(function(){
        
        if(!$(this).children().hasClass("imagen")){
            if($(this).hasClass("marcado")){
                $(this).removeClass();
            }
            else{
                $(this).addClass("marcado");
            }
        }
    });
}

/**
 * Esta función calcula un número aleatorio entre dos rangos, incluyendo ambos en el resultado.
 */
function random(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //ambos inclusive
    }
    
        
/**
 * Esta función mostrará el cartón en el documento HTML con la estructura siguiente
 * <div> 
 *  <span> Num cartón </span>
 *  </div>
 */
function dibujaCarton(){
    var carton = $(".carton");
    carton.children().remove();
    for(let i=0;i<num_carton.length;i++){
        var div_carton = document.createElement("div");
        var span_carton = document.createElement("span");
        if(num_carton[i]!=0){
            var numero_dibujado = document.createTextNode(num_carton[i]);
            span_carton.appendChild(numero_dibujado);
            div_carton.appendChild(span_carton);
            carton[0].appendChild(div_carton);
        }
        else
        {
            span_carton.setAttribute("class","imagen");
            var img_vacia = document.createElement("img");
            img_vacia.src="./imagenes/lucky-bingo-2.png"
            span_carton.appendChild(img_vacia);
            div_carton.appendChild(span_carton);
            carton[0].appendChild(div_carton);
        }
                }
            }


noventanumeros();

//Scripts relacionados con el juego


/**
 * Esta función da inicio a la partida, si venimos de jugar una partida, será necesario
 * que la variable de cantado_bingo vuelva a false, ya que de otra forma el "timer" con el que 
 * las bolas salen aleatoriamente no avanzaría.
 */

function empiezaPartida()
{
    cantado_bingo=false;
    deshabilitarBotones();
    timerBolas();
}

/**
 * Esta función llamará a la función que saca los números aleatoriamente, a no ser que
 * hayan salido ya los 90 números, o que la función que comprueba si la CPU tiene bingo devuelva
 * verdadero, o que hayamos cantado bingo y este sea correcto.
 * 
 * La variable tiempo_espera determina cada cuanto tiempo se ejecuta esta función, se puede cambiar desde
 * el slider de forma gráfica.
 */
function timerBolas() {
    if(num_salido.length==90 || comprobarBingoCPU() || cantado_bingo==true){
        return;   
    }
    else{
        sacarBola();
        setTimeout(timerBolas, tiempo_espera);
    }
}

/**
 * Esta función saca mediante Ajax un número aleatorio del 1 al 90, 
 * si el número está repetido sacará otro, hasta que encuentre un número que no ha salido,
 * entonces lo almacenará en el array de números que ya han salido, y se ejecutarán las funciones
 * que controlan la interfaz gráfica, tapando el número en la esquina inferior izquierda.
 */
function sacarBola(){

    var num_ajax = $.ajax({
        url:"./ajax/random.php"
    });

    num_ajax.done(function(num_bombo){
        if (estaRepetido(num_bombo)){
            sacarBola();
            return; 
        }
        num_salido.push(parseInt(num_bombo));
        $(".circle").text(num_bombo);
        taparNumeros(num_bombo); 
    })

}

/**
 * Esta función comprueba si ya ha salido el número que hemos sacado aleatoriamente. 
 */
function estaRepetido(numero){
    for (let u=0;u<=num_salido.length;u++)
    {
        if(numero==num_salido[u]){
            return true;
        }
    }
    return false;
}

/**
 * 
 * Esta función cambia el fondo del numero que pasamos por parámetro en la tabla de los 90
 * números, para llevar un control de los números que ya han salido. 
 */

function taparNumeros(num){
    $("#"+num).css("background-color","yellow");
}

/**
 * Esta función pone en el color original todos los números de la tabla de los 90 números, se ejecuta
 * cuando queremos resetear el juego.
 */
function destaparNumeros(){
    for(let i=1;i<=90;i++){
        $("#"+i).css("background-color","orange");
    }
}

/**
 * Esta función comprueba si la CPU tiene bingo, se ejecuta cada vez que sale una bola nueva,
 * y para el bingo en caso de que devuelva true.
 */
function comprobarBingoCPU(){
    for(let i=0;i<total_cartones_cpu.length;i++)
    {
        var aciertos_cpu = 0;
        for (let j=0;j<=14;j++)
        {
            if(num_salido.includes(total_cartones_cpu[i][j]))
            {
                aciertos_cpu++;
            }
        }
        if(aciertos_cpu==15)
        {
            modalCpu();
            num_ganadores++;
            nombre_ganadores.push(nombre_jugadores[i]);
        }     
    }
    if(num_ganadores==0){
        return false;
    }else
    {        return true;
    }
}

/**
 * Esta función calcula la cantidad del premio acorde a la siguiente fórmula:
 *  premio = ( Jugadores * Apuesta * 80% ) / Numero_Ganadores
 *  Yo tengo que aumentar en 1 el número de jugadores, ya que en el slider solo indico 
 *  el número de jugadores de la CPU que creo, sin contar al propio usuario.
 */

function calculaPremio()
{
    var premio = 0;
    var float_jugadores = parseFloat(jugadores);
    var float_euros = parseFloat(euros_apostados);
    var float_num_ganadores = parseFloat(num_ganadores);
    premio = (( float_jugadores + 1 ) * float_euros * 0.8 ) / float_num_ganadores ;
    return premio.toFixed(2);
}

/**
 * Esta función devuelve un string con los nombres de los ganadores de la partida.
 */
function listaGanadores(){

    var string_ganadores = " ";

    if(nombre_ganadores.length==1){
        for(let z=0;z<nombre_ganadores.length;z++){
            string_ganadores += nombre_ganadores[z];
        }
    }
    else
    {
        for(let k=0;k<nombre_ganadores.length;k++){
            if(k!=nombre_ganadores.length-1){
                string_ganadores += nombre_ganadores[k] + ",";
            }
            else{
                string_ganadores += nombre_ganadores[k];
            }
        }
    }

    return string_ganadores;
}

/**
 * Esta función muestra los ganadores y los premios, además de encargarse del reseteo del juego
 * por si queremos jugar otra partida.
 */
function finalPartida(){
    var premio_jugador = calculaPremio();
    var lista_ganadores = listaGanadores();
    $('.modal_fin div.modal-content div.modal-body h2').text('El bingo lo ha ganado : ' + lista_ganadores);
    $('.modal_fin div.modal-content div.modal-body h3').text('El premio es de ' + premio_jugador + '€');
    modalFin();
    num_ganadores = 0;
    nombre_ganadores = [];
    resetearArrays();
    total_cartones_cpu = [];
    num_salido = [];
    num_carton = [];

    destaparNumeros();
    $(".circle").text('');
    $('#btn_bingo').attr("disabled","disabled");
    $('#slider_num_jug').removeAttr("disabled");
    $('#slider_eur').removeAttr("disabled");
    $('#generar_carton').removeAttr("disabled");
    presentacionInicial();
}

/**
 * Con esta función comprobamos si tenemos bingo al pulsar el botón ¡Bingo!
 */

function cantarBingo()
{
        let aciertos = 0;
        for (let j=0;j<=26;j++)
        {
            if(num_salido.includes(num_carton[j]))
            {
                aciertos++;
            }
        }
        if(aciertos==15)
        {
            nombre_ganadores.push("Tú");
            num_ganadores++;
            modalcorrecto();
            finalPartida();
            return true;
        }
        else{
            modalIncorrecto();
            return false;
        }
    
}

/**
 * 
 * En esta función agrupamos botones que se deshabilitarán al mismo tiempo cuando empieza el juego, 
 * como son los botones de empezar partida, y los slider de jugadores y apuesta, ya que no se 
 * pueden cambiar una vez ha empezado el juego.
 */

function deshabilitarBotones(){
    $('#slider_num_jug').attr("disabled","disabled");
    $('#slider_eur').attr("disabled","disabled");
    $('#generar_carton').attr("disabled","disabled");
}


/**
 * Con esta función borramos si hubiese algún carton antes para dejarlo en el estado inicial,
 *  y posteriormente lo rellenamos con las imágenes por defecto, para que necesitemos volver a darle a 
 *  jugar para cargar un nuevo cartón.
 */

function presentacionInicial(){
    var carton_inicio = $(".carton");
    carton_inicio.children().remove();
    var texto = '<div><span><img src="./imagenes/lucky-bingo-2.png"></span></div>';

    for (let z=1;z<=27;z++){
        carton_inicio.append(texto);
    }
}

/**
 * Esta función genera tantos cartones de CPU como le hemos indicado mediante el slider.
 */
function generarCartonesCPU(){
    var carton_cpu = [];

    var vacios_1vuelta = [];
    
    for(let n=1;n<=num_jug.innerHTML;n++){
        resetearArrays();
        for(let j=1;j<=3;j++) {
        var vacios = 4;
        var rellenos = 5;
        for(var i=1;i<=9;i++){
            if(j==1 || j==2){
                var num_azar = random(1,9);
                if(num_azar>5 && vacios!=0){

                    vacios--;
                    if(j==1)
                    {
                        vacios_1vuelta.push(i);
                    }
                   
                }
                else{
                    if(rellenos!=0){
                        var numero = random(0,array_numeros[i-1].length-1);
                        carton_cpu.push(array_numeros[i-1][numero]);
                        array_numeros[i-1].splice(numero,1);
                        rellenos--;
                    }
                    else{
                        vacios--;
                        if(j==1)
                        {
                            vacios_1vuelta.push(i);
                        }
                        }
                    } 
            }
    
            if(j==3)
            {
                if (i!=vacios_1vuelta[0] && i!=vacios_1vuelta[1] && i!=vacios_1vuelta[2] && i!=vacios_1vuelta[3]){
      
                    if(vacios!=0){
                        vacios--;
                    }
                    else
                    {
                    var numero = random(0,array_numeros[i-1].length-1);
                    carton_cpu.push(array_numeros[i-1][numero]);
                    array_numeros[i-1].splice(numero,1);
                    rellenos--;
                    }
                }
                else
                {
                    var numero = random(0,array_numeros[i-1].length-1);
                    carton_cpu.push(array_numeros[i-1][numero]);
                    array_numeros[i-1].splice(numero,1);
                    rellenos--;
                }
                
            }
        }
    }
    total_cartones_cpu.push(carton_cpu)
    carton_cpu = [];
    }
}


});
    
