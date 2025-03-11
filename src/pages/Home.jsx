import { useEffect, useState } from "react";
import { getData, postData } from "../services/llamados";

function Home() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [recarga, setRecarga] = useState(false);
  useEffect(() => {
    async function traerTareas() {
      const tareasGuardadas = await getData("tareas");
      setTareas(tareasGuardadas);
    }
    console.log(tareas);
    traerTareas();
    
  }, [recarga]);

  const addTask = async (e) => {
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

  const editarTarea = (id, nuevaTarea) => {
    const nuevasTareas = tareas.map((t) =>
      t.id === id ? { ...t, tarea: nuevaTarea } : t
    );
    setTareas(nuevasTareas);
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter((t) => t.id !== id);
    setTareas(nuevasTareas);
  };

  const marcarComoCompletada = (id) => {
    const nuevasTareas = tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    setTareas(nuevasTareas);
  };

  return (
    <>
      <h1>To do list</h1>
      <input
        type="text"
        placeholder="escribe tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
      />
      <button onClick={addTask}>Agregar Tarea</button>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <span
              style={{
                textDecoration: tarea.completada ? "line-through" : "none",
              }}
            >
              {tarea.tarea}
            </span>
            <button
              onClick={() => editarTarea(tarea.id, prompt("Nueva tarea:"))}
            >
              Editar
            </button>
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
            <button onClick={() => marcarComoCompletada(tarea.id)}>
              {tarea.completada ? "Desenmarcar" : "Completar"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
