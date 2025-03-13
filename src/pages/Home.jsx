import { useEffect, useState } from "react";
import { deleteData, getData, patchData, postData } from "../services/llamados";
import "../styles/home.css";

function Home() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [recarga, setRecarga] = useState(false);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    async function traerTareas() {
      const tareasGuardadas = await getData("tareas");
      setTareas(tareasGuardadas);
    }
    async function contadorTareas() {
      const tareasCompletadas = await getData("tareas");
      const filtro = tareasCompletadas.filter(
        (tarea) => tarea.completada === true
      );
      setContador(filtro.length);
    }
    contadorTareas();
    traerTareas();
  }, [recarga, tareas]);

  const agregarTarea = async (e) => {
    e.preventDefault();
    if (tarea.trim() === "") {
      alert("Agregue una tarea");
      return;
    }
    const nuevaTarea = {
      tarea,
      completada: false,
    };
    await postData(nuevaTarea, "tareas");
    setTarea("");
    setRecarga(!recarga);
  };

  const editarTarea = async (id, nuevaTarea) => {
    const tareaEditar = {
      tarea: nuevaTarea,
    };
    await patchData(tareaEditar, "tareas", id);
  };

  const eliminarTarea = async (id) => {
    await deleteData("tareas", id);
  };

  const marcarComoCompletada = async (id, index) => {
    await patchData({ completada: !tareas[index].completada }, "tareas", id);
    setRecarga(!recarga);
  };

  return (
    <>
      <h1 className="titulo-principal">Lista de Tareas</h1>
      <h2 className="contador-tareas">{contador}</h2>
      <input
        type="text"
        placeholder="Escribe tarea"
        className="input-agregar-tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
      />
      <button onClick={agregarTarea} className="boton-agregar-tarea">
        Agregar Tarea
      </button>

      <ul className="lista-tareas">
        {tareas.map((tarea, index) => (
          <li key={tarea.id} className="item-tarea">
            <span
              className="texto-tarea"
              style={{
                textDecoration: tarea.completada ? "line-through" : "none",
              }}
            >
              {tarea.tarea}
            </span>
            <button
              className="boton-editar"
              onClick={() => editarTarea(tarea.id, prompt("Nueva tarea:"))}
            >
              Editar
            </button>
            <button
              className="boton-eliminar"
              onClick={() => eliminarTarea(tarea.id)}
            >
              Eliminar
            </button>
            <button
              className="boton-marcar-completada"
              onClick={() => marcarComoCompletada(tarea.id, index)}
            >
              {tarea.completada ? "Desmarcar" : "Completar"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;

