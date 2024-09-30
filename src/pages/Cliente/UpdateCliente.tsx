import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  celular: number;
  direccion: string;
  correoelectronico: string;
}

export default function UpdateCliente() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/cliente/view/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch client");
        }
        return response.json();
      })
      .then((data) => {
        setCliente(data);
        setFetchSuccess("Success");
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const HandleUpdate = () => {
    fetch(`http://localhost:8080/api/cliente/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: cliente?.nombre,
        apellido: cliente?.apellido,
        celular: cliente?.celular,
        direccion: cliente?.direccion,
        correoelectronico: cliente?.correoelectronico
      })
    })
      .then(() => {
        setTimeout(() => {
          navigate("/cliente");
        }, 2000);
        setSuccess("Updated");
      })
      .catch((error) => setError(error.message));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (cliente) {
      setCliente({ ...cliente, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="box">
        <h2 className="title is-4">Update Cliente</h2>
        {fetchSuccess && (
          <div>
            <p>ID: {cliente?.id}</p>
            <p>Name: {cliente?.nombre}</p>
            <p>Apellido: {cliente?.apellido}</p>
            <p>Celular: {cliente?.celular}</p>
            <p>Direccion: {cliente?.direccion}</p>
            <p>Correo: {cliente?.correoelectronico}</p>
          </div>
        )}
      </div>
      <div>
        <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
            <input
                className="input"
                type="text"
                name="nombre"
                value={cliente?.nombre || ""}
                onChange={handleChange}
            />
            </div>
        </div>
        <div className="field">
            <label className="label">Apellido</label>
            <div className="control">
            <input
                className="input"
                type="text"
                name="apellido"
                value={cliente?.apellido || ""}
                onChange={handleChange}
            />
            </div>
        </div>
        <div className="field">
            <label className="label">Celular</label>
            <div className="control">
            <input
                className="input"
                type="number"
                name="celular"
                value={cliente?.celular || ""}
                onChange={handleChange}
            />
            </div>
        </div>
        <div className="field">
            <label className="label">Direccion</label>
            <div className="control">
            <input
                className="input"
                type="text"
                name="direccion"
                value={cliente?.direccion || ""}
                onChange={handleChange}
            />
            </div>
        </div>
        <div className="field">
            <label className="label">Correo Electronico</label>
            <div className="control">
            <input
                className="input"
                type="email"
                name="correoelectronico"
                value={cliente?.correoelectronico || ""}
                onChange={handleChange}
            />
            </div>
        </div>
            <div className="control mt-4">
                <button onClick={HandleUpdate} className="button is-primary">
                Update
                </button>
            </div>
        </div>
        {success && <div className="notification is-success mt-2">{success}</div>}
        {error && <div className="notification is-danger mt-2"> {error}</div>}
    </>
  );
}
