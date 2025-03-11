import { useState } from "react";
import { getData } from "../services/llamados";
import { useNavigate } from "react-router-dom";

export function FormularioLogin() {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate()
  async function validarUsuario(e) {
    e.preventDefault();
    const datos = await getData("usuarios");
    const usuarioValido = datos.find(
      (dato) => dato.nombre === nombre && dato.contrasena === contrasena
    );

    if (usuarioValido) {
      navigate("/home")
    }
  }

  return (
    <>
      <h2>Iniciar Sesion</h2>
      <form className="FormularioLogin">
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
        <button onClick={validarUsuario}>Iniciar sesion</button>
        <a onClick={() => navigate("/signin")}>Ir a Registro</a>
      </form>
    </>
  );
}
