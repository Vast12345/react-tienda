import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
}

export default function CreateCompra() {
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
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const clienteRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/cliente/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (compra) {
      setCompra({ ...compra, [e.target.name]: e.target.value });
      console.log(compra)
    }
  };

  const handleCreate = () => {
    if (clienteRef.current) {
      const selectedCategoriaId = clienteRef.current.value;
      setCompra((prev) => ({
        ...prev,
        cliente: { id: String(selectedCategoriaId) },
      }));
    }
    console.log(compra);
    fetch("http://localhost:8080/api/compra/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha: compra?.fecha,
        mediopago: compra?.mediopago,
        comentario: compra?.comentario,
        estado: false,
        cliente: {
          id: compra.cliente.id,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        navigate("/compra/list");
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <div>
      <h1 className="title is-2">Create Compra</h1>
      <div>
        <div className="field">
          <label htmlFor="fecha" className="label">
            Fecha
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
        <div className="field">
          <label htmlFor="clienteId" className="label">
            Cliente
          </label>
          <div className="control">
            <div className="select">
              <select
                id="clienteId"
                name="clienteId"
                value={compra.cliente.id}
                onChange={(e) => {
                  setCompra({ ...compra, cliente: { id: e.target.value } });
                  console.log(compra);
                }}
                ref={clienteRef}
                required
              >
                <option value={""} disabled>
                  Seleccione una cliente
                </option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.id}. {cliente.nombre} {cliente.apellido}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button onClick={handleCreate} className="button is-primary">
          Create
        </button>
      </div>
    </div>
  );
}
