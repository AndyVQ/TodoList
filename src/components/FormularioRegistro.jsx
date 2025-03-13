import { useNavigate } from "react-router-dom";
import { postData } from "../services/llamados";
import "../styles/Registro.css";
import { useState } from "react"; 

function FormularioRegistro() {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  async function enviarDatos() {
    if (nombre.trim() === "" || contrasena.trim() === "") {
      alert("Rellena los espacios requeridos");
      return;
    }
    let usuario = {
      nombre: nombre,
      contrasena: contrasena,
    };
    await postData(usuario, "usuarios");
    navigate("/login");
  }

  return (
    <>
      <h2 className="titulo-registro">Registro</h2>
      <form className="formulario-registro">
        <input
          type="text"
          placeholder="Usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input-nombre"
        />
        <input 
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="input-contrasena"
        />
        <button onClick={enviarDatos} className="boton-registrarse">
          Registrarse
        </button>
        <a onClick={() => navigate("/login")} className="enlace-login">
          Iniciar sesión
        </a>
      </form>
    </>
  );
}

export default FormularioRegistro;


