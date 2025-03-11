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
      alert("LLENE LA MICA");
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
      <h2>Registro</h2>
      <form className="FormularioRegistro">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button onClick={enviarDatos}>Registrarse</button>
        <a onClick={() => navigate("/login")}>Ir a Login</a>
      </form>
    </>
  );
}
export default FormularioRegistro;
