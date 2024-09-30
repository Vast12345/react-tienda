import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  celular: string;
  direccion: string;
  correoelectronico: string;
}

export default function CreateCliente() {
  const [cliente, setCliente] = useState<Cliente>({
    id: "",
    nombre: "",
    apellido: "",
    celular: "",
    direccion: "",
    correoelectronico: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (cliente) {
      setCliente({ ...cliente, [e.target.name]: e.target.value });
    }
  };

  const handleCreate = () => {
    fetch("http://localhost:8080/api/cliente/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: cliente?.nombre,
        apellido: cliente?.apellido,
        celular: cliente?.celular,
        direccion: cliente?.direccion,
        correoelectronico: cliente?.correoelectronico
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        navigate("/create/list");
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <div>
      <h1 className="title is-2">Create Cliente</h1>
      <div>
        <div className="field">
          <label htmlFor="nombre" className="label">
            Name
          </label>
          <div className="control">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={cliente?.nombre}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="apellido" className="label">
            Apellido
          </label>
          <div className="control">
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={cliente?.apellido}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="celular" className="label">
            Celular
          </label>
          <div className="control">
            <input
              type="text"
              id="celular"
              name="celular"
              value={cliente?.celular}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="direccion" className="label">
            Direccion
          </label>
          <div className="control">
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={cliente?.direccion}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="correoelectronico" className="label">
            Correo
          </label>
          <div className="control">
            <input
              type="text"
              id="correoelectronico"
              name="correoelectronico"
              value={cliente?.correoelectronico}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        <button onClick={handleCreate} className="button is-primary">
          Create
        </button>
      </div>
    </div>
  );
}