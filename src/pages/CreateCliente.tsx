import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCliente() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    direccion: "",
    correoelectronico: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    fetch("http://localhost:8080/api/cliente/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        apellido: formData.apellido,
        celular: formData.celular,
        direccion: formData.direccion,
        correoelectronico: formData.correoelectronico
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <div>
      <h1 className="title is-2">Create Cliente</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="nombre" className="label">
            Name
          </label>
          <div className="control">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
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
              value={formData.apellido}
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
              value={formData.celular}
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
              value={formData.direccion}
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
              value={formData.correoelectronico}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        <button type="submit" className="button is-primary">
          Create
        </button>
      </form>
    </div>
  );
}
