//Inicializamos nuestro arreglo de personas con dos objetos
const personas = [
  {
    nombre: "Juan Perez",
    edad: 18,
    email: "JuanPerez@gmail.com"
  },
  {
    nombre: "Maria Loza",
    edad: 21,
    email: "MariaLoza@gmail.com"
  },
];

function agregarPersona() {
  //Obtenemos el elemento para mostrar un error del nombre
  const msgErrorNombre = document.querySelector("#msg-error-nombre");
  //borramos el contenido del elemento
  msgErrorNombre.innerHTML = "";

  //Obtenemos el elemento para mostrar un error de la edad
  const msgErrorEdad = document.querySelector("#msg-error-edad");
  //borramos el contenido del elemento
  msgErrorEdad.innerHTML = "";

  const msgErrorCorreo = document.getElementById("msg-error-email"); //obtenemos el elemento para mostrar el posible mensaje de error en el correo
  msgErrorCorreo.textContent = ""; //mantenemos vacio el contenido del elemento provisionalmente
  //Obtenemos el input donde se ingresa el nombre
  const inputNombre = document.querySelector("#input-nombre");

  //Obtenemos el input donde se ingresa la edad
  const inputEdad = document.querySelector("#input-edad");

  const inputEmail = document.getElementById("input-correo"); //obtenemos el input donde se ingresa el correo

  //Creamos una variable que indica si el formulario tiene error
  //Inicialmente suponemos que el fomulario NO tiene error
  let hayError = false;

  //Obtenemos el valor del input y le quitamos los espacios del inicio y el final
  const nombre = inputNombre.value.trim();

  const correo = inputEmail.value; //obtenemos el valor del inputEmail
  //Validamos que si el valor del nombre esta vacio
  if (nombre === "") {
    //De ser asi, colocamos el mensaje de error al contenido del elemento para mostrar el error
    msgErrorNombre.innerHTML = "Debe ingresar un nombre";
    //Le asigamos el valor true indicando que el formulario tiene error
    hayError = true;
  }

  //Obtenemos el valor del input y obtenemos el valor convertido a un valor numérico
  let edad = inputEdad.valueAsNumber;
  //Validamos si el valor ingresado NO corresponde a un valor numerico
  if (isNaN(edad)) {
    //De ser asi, colocamos el mensaje de error al contenido del elemento para mostrar el error
    msgErrorEdad.innerHTML = "Debe ingresar una edad";
    //Le asigamos el valor true indicando que el formulario tiene error
    hayError = true;
  } else if (!Number.isInteger(edad) || edad < 0) {
    //Verificamos si la edad es un valor entero o menor que cero
    //De ser asi, colocamos el mensaje de error al contenido del elemento para mostrar el error
    msgErrorEdad.innerHTML = "Debe ingresar una edad válida";
    //Le asigamos el valor true indicando que el formulario tiene error
    hayError = true;
  }

  if(correo === ""){
    msgErrorCorreo.textContent = "Debe ingresar un email";
    hayError = true;

  } else if(!esEmailValido(correo)){
    msgErrorCorreo.textContent = "Debe ingresar un email valido";
    hayError = true;
  }

  

  //Si el formulario tiene algun error (valores invalidos)
  if (hayError) {
    //Es lo mismo que escribir hayError === true
    //Salimos del método por que no hay nada mas que hacer
    return;
  }

  //Si llegamos aqui significa que todos los valores ingresados son válidos

  //Creamos un nuevo objeto con los valores ingresados
  const nuevaPersona = {
    nombre: nombre,
    edad: edad,
    email: correo
  };

  //Ingresamos el nuevo objeto persona dentro del arreglo
  personas.push(nuevaPersona);
  //Limpiamos los inputs
  inputNombre.value = "";
  inputEdad.value = "";
  inputEmail.value = "";

  //Actualizamos la tabla de personas para reflejar los cambios en el arreglo
  actualizarLista();
}


function esEmailValido(email){
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

//Esta funcion recibirá el indice del arreglo donde se encuentra el nombre a eliminar
function eliminar(i) {
  //Lanzamos un cuadro de confirmacion para confirmar la eliminación
  //La variable respuesta guardará si el usuario seleccionó SI o NO (SI=true, NO=false)
  const respuesta = confirm("¿Esta seguro que desea eliminar el nombre?");
  if (respuesta === false) {
    //Si la respuesta es no, no hay nada que hacer.
    return;
  }

  //Si la respuesta es SI, eliminamos la persona que se encuentra en el indice del arreglo
  //que se pasó por parametro a la funcion
  personas.splice(i, 1);
  //Actualizamos la tabla de personas para reflejar los cambios en el arreglo
  actualizarLista();
}

function actualizarLista() {
  //Obtenemos el elemento <tbody> donde se listarán las personas
  const listaNombresHtml = document.getElementById("lista-nombres");
  //Si el arreglo esta vacio
  if (personas.length === 0) {
    //El conenido de la tabla será un mensaje que indique que no hay personas registrados
    listaNombresHtml.innerHTML = `
            <tr>
                <td colspan="4">No hay personas registradas</td>
            </tr>`;
    return;
  }

  //En caso que el arreglo tenga elementos, crearemos una variable que almacenará
  //el contenido de las filas donde cada fila mostrará un nombre
  let html = "";
  //Este es una estructura foreach la cual permite iterar una colección de elementos.
  //En este caso vamos a iterar el arreglo de nombres, para lo cual por cada iteración
  //la variable i almacenará el indice del arreglo
  for (let i in personas) {
    //Obtenemos el objeto que se encuentra en la posición del arreglo que actualmente se esta iterando
    const persona = personas[i];

    //Vamos a concatenar una fila por cada persona del arreglo.
    //La fila contiene tres celdas,
    //La primera contiene un boton el cual llama a la funcion eliminar
    //pasandole como parametro la posición del arreglo que actualmente se esta iterando.
    //La segunda celda contiene el nombre de la persona que actualmente se esta iterando
    //La tercer celda contiene la edad de la persona que actualmente se esta iterando
    html +=
      `<tr>
         <td>
           <input class="btn-delete" type="button" onclick="eliminar(${i})" value="Eliminar">
          </td>` +
         "<td>" +
            persona.nombre +
          "</td>"+
          "<td>" +
            persona.edad +
          "</td>"+
           "<td>"  +
      persona.email +
      "</td></tr>";
  }

  //Al final se colocará el html que se generó dentro del contenido del <tbody>
  listaNombresHtml.innerHTML = html;
}
