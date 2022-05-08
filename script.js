/* Reglas de encriptación: 
"e" es convertido para "enter" 
"i" es convertido para "imes"
"a" es convertido para "ai"
"o" es convertido para "ober"
"u" es convertido para "ufat"
Solo letras minusculas
No se permite acentuación de palabras
*/

/* Reglas de desencriptación: 
"enter" es convertido para "e" 
"imes" es convertido para "i"
"ai" es convertido para "a"
"ober" es convertido para "o"
"ufat" es convertido para "u"
Solo letras minusculas
No se permite acentuación de palabras */

var botonEncriptar = document.querySelector("#btn-encriptar");
var botonDesencriptar = document.querySelector("#btn-desencriptar"); 
var botonCopiar = document.querySelector("#btn-copy");
var botonBorrar = document.querySelector("#btn-borrar")
var texto_encriptado = document.querySelector("#msg");
var texto = document.querySelector("#input-texto").focus();
const caract_validos = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMÑOPQRSTUVWXYZ1234567890.,!?¡¿ ';
const codigo = {"e": "enter", "i": "imes", "a": "ai", "o": "ober", "u": "ufat"};
const caract_invalidos1 = /[`~@#$%^&*()_+<>:"{}\/;'[\]]/;
const caract_invalidos2 = /[#￥（——）：；“”‘、，|《。》、【】[\]]/;

//Función que valida el texto y si no cumple con las caracteristicas específicas, tira msg error:

function validar(texto){
    var texto = document.querySelector("#input-texto").value.toLowerCase();
	//const caract_invalidos1 = /[`~@#$%^&*()_+<>:"{}\/;'[\]]/;
    //const caract_invalidos2 = /[#￥（——）：；“”‘、，|《。》、【】[\]]/;
    if (texto.length == 0 || texto == null){ 
        //Cambio el valor de placehonder              
        document.getElementsByName("input-texto")[0].placeholder="El campo no puede estar vacío";
    }
    else if(caract_invalidos1.test(texto) || caract_invalidos2.test(texto)){
            document.getElementsByName("input-copy")[0].placeholder= "¡Error! No se aceptan acentos ni caracteres especiales";
            return false;
    }
    else{
	    return true;
	}
}

//Función para bloquear las teclas de caracteres especiales:

document.querySelector("#input-texto").addEventListener("keypress", bloqueoDeTeclasCaractEsp);

function bloqueoDeTeclasCaractEsp(event) {
    //const caract_validos = 'abcdefghijklmnñopqrstuvwxyz1234567890.,!?¡¿ ';
    if(caract_validos.indexOf(event.key) == -1){ // colocar la cadena de caracteres permitidos
        event.preventDefault();
    }
}

//Función para encriptar el texto con el código a implementar:

function encriptar(texto){//solo letras y numeros
    if(validar(texto) == true){
        var texto = document.querySelector("#input-texto").value.toLowerCase();
        var texto_encriptado = "";        
        for (const obj in codigo) {
            texto_encriptado = texto.replaceAll(obj,codigo[obj]);
            texto = texto_encriptado.trim();
          
        }
    }    
    return texto_encriptado;     
}   
 
// Evento al hacer click en el botón encriptar:

botonEncriptar.addEventListener("click",function(event){
    event.preventDefault()//metodo preventDefault para q no se cargue y quede en blanco despues por defecto
    var texto = document.querySelector("#input-texto").value.toLowerCase() ; 

    if(validar(texto) == true){
        bloqueoDeTeclasCaractEsp(event); //Para No dejar cliquear caracteres invalidos  
        var texto_encriptado = encriptar(texto);
        var resultado = document.querySelector("#msg");
        resultado.value = texto_encriptado;
    }
     
});

//Función para desencriptar texto encriptado:

function desencriptar(texto) {   
  var texto_desencriptado = " ";
  for (const obj in codigo) {
      texto_desencriptado = texto.replaceAll(codigo[obj],obj);
      texto = texto_desencriptado.trim();   
  }
  return texto_desencriptado;

}

//Función para borrar texto del input (funciona perfecto pero decidí usar otro método más simple):

/*function borrar(){
    var texto = document.querySelector("#msg").value;
    var tam = texto.length;
    for(i = 0; i < tam; i++) {
        if(texto[i]){
            (document.querySelector("#msg").value = "");
            texto.value = "";
        }
      }
      return texto;
}*/

//Evento al clickear botón copiar:

botonCopiar.addEventListener("click",function(event){
  event.preventDefault()//metodo preventDefault para q no se cargue y quede en blanco despues por defecto
        texto = document.querySelector("#msg").value;
        if (texto.length === 0){
            document.getElementsByName("input-copy")[0].placeholder=("El campo está vacío");   
        }
        else{
            //Uso clipboard para copiar en el portapapeles     
            navigator.clipboard.writeText(texto);
            document.querySelector("#msg").value = ("");
            document.getElementsByName("input-copy")[0].placeholder="El Texto fue copiado con éxito";
           
        } 
});

//Evento al clickear botón desencriptar:

botonDesencriptar.addEventListener("click",function(event){
  event.preventDefault()//metodo preventDefault para q no se cargue y quede en blanco despues por defecto
    var texto = document.querySelector("#input-texto").value.toLowerCase();
    if (validar(texto) == true){
        bloqueoDeTeclasCaractEsp(event) //No deja cliquear caracteres invalidos    
        let texto_desencriptado = desencriptar(texto); 
        let resultado = document.querySelector("#msg");
        resultado.value = texto_desencriptado ;
    }
});

//Evento al cliquear el botón borrar:

botonBorrar.addEventListener("click",function(event){
    event.preventDefault()//metodo preventDefault para q no se cargue y quede en blanco despues por defecto
    document.getElementsByName("input-copy")[0].placeholder=("");
    document.querySelector("#input-texto").value = ("");
    document.querySelector("#msg").value = ("");
  });

