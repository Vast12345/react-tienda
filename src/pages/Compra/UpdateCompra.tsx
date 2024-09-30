import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Compra {
  id: string;
  fecha: string;
  mediopago: string;
  comentario: string;
  estado: boolean;
  cliente: {
    id: string;
  };
}

export default function UpdateCompra() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [compra, setCompra] = useState<Compra>({
    id: "",
    fecha: "",
    mediopago: "",
    comentario: "",
    estado: false,
    cliente: {
      id: "",
    },
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/compra/view/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch client");
        }
        return response.json();
      })
      .then((data) => {
        setCompra(data);
        setFetchSuccess("Success");
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const HandleUpdate = () => {
    fetch(`http://localhost:8080/api/compra/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha: compra?.fecha,
        mediopago: compra?.mediopago,
        comentario: compra?.comentario,
        estado: compra?.estado,
        cliente: {
          id: compra.cliente.id,
        },
      }),
    })
      .then(() => {
        setTimeout(() => {
          navigate("/compra/list");
        }, 2000);
        setSuccess("Updated");
      })
      .catch((error) => setError(error.message));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (compra) {
      setCompra({ ...compra, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="box">
        <h2 className="title is-4">Update Compra</h2>
        {fetchSuccess && (
          <div>
            <p>ID: {compra.id}</p>
            <p>Fecha: {compra.fecha}</p>
            <p>Medio Pago: {compra.mediopago}</p>
            <p>Comentario: {compra.comentario}</p>
            <p>Estado: {compra.estado ? "Ready" : "Not Ready"}</p>
            <p>Cliente Id: {compra.cliente.id}</p>
          </div>
        )}
      </div>
      <div>
        <h1 className="title is-2">Create Producto</h1>
        <div>
          <div className="field">
            <label htmlFor="nombre" className="label">
              Nombre
            </label>
            <div className="control">
              <input
                type="datetime-local"
                id="fecha"
                name="fecha"
                value={compra.fecha}
                defaultValue={""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="mediopago" className="label">
              Medio Pago
            </label>
            <div className="control">
              <input
                type="text"
                id="mediopago"
                name="mediopago"
                value={compra.mediopago}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="comentario" className="label">
              Comentario
            </label>
            <div className="control">
              <input
                type="text"
                id="comentario"
                name="comentario"
                value={compra.comentario}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="estado" className="label">
              Estado
            </label>
            <div className="control">
              <input
                type="checkbox"
                id="estado"
                name="estado"
                checked={compra.estado}
                onChange={(e) =>
                  setCompra({ ...compra, estado: e.target.checked })
                }
              />
            </div>
          </div>
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
