import { useState } from "react";
import { getData } from "../services/llamados";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export function FormularioLogin() {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  async function validarUsuario(e) {
    e.preventDefault();
    alert("Rellena los espacios requeridos");
    const datos = await getData("usuarios");
    const usuarioValido = datos.find(
      (dato) => dato.nombre === nombre && dato.contrasena === contrasena
      
    );

    if (usuarioValido) {
      navigate("/home");
    }
  }

  return (
    <>
      <h2 className="titulo-login">Iniciar Sesión </h2>
      <form className="formulario-login">
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
        <button onClick={validarUsuario} className="boton-iniciar-sesion">
          Iniciar sesión
        </button>
        <a onClick={() => navigate("/signin")} className="enlace-registro">
         Registrarse
        </a>
      </form>
    </>
  );
}
