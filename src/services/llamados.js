/*
    Método post, se encarga de enviar información a la API
    se le pasan dos parámetros para poder reutilizar la función en más
    de una ejecución de código    
*/
async function postData(obj, endpoint) {
  try {
    const peticion = await fetch(`http://localhost:3000/${endpoint}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const datos = await peticion.json();
    console.log(datos);
    return datos;
  } catch (error) {
    console.error(error);
  }
}
/*
   El método get, trae información de la API y del endpoint que le demos
   
  */

async function getData(endpoint) {
  try {
    const peticion = await fetch(`http://localhost:3000/${endpoint}/`);
    const datos = peticion.json();
    return datos;
  } catch (error) {
    console.error(error);
  }
}

/*
 El método patch, actualiza la información que esté guardada en el endpoint
*/
async function patchData(obj, endpoint, id) {
  try {
    const peticion = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const datos = await peticion.json();
    console.log(datos);
    return datos;
  } catch (error) {
    console.error(error);
  }
}
async function deleteData(endpoint,id) {
  try {
    const peticion = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const datos = await peticion.json();
    console.log(datos);
    return datos;
  } catch (error) {
    console.error(error);
  }
}
export { getData, postData, patchData, deleteData };
