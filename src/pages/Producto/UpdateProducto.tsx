import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Producto {
  id: string;
  nombre: string;
  codigobarras: string;
  precioventa: string;
  cantidadstock: string;
  estado: boolean;
  categoria: {
    id: string;
  };
}

export default function UpdateProducto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto>({
    id: "",
    nombre: "",
    codigobarras: "",
    precioventa: "",
    cantidadstock: "",
    estado: false,
    categoria: {
      id: ""
    },
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/producto/view/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch client");
        }
        return response.json();
      })
      .then((data) => {
        setProducto(data);
        setFetchSuccess("Success");
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const HandleUpdate = () => {
    fetch(`http://localhost:8080/api/producto/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: producto?.nombre,
        codigobarras: producto?.codigobarras,
        precioventa: producto?.precioventa,
        cantidadstock: producto?.cantidadstock,
        estado: producto?.estado,
        categoria: {
            id: producto.categoria.id
        }
      }),
    })
      .then(() => {
        setTimeout(() => {
          navigate("/producto/list");
        }, 2000);
        setSuccess("Updated");
      })
      .catch((error) => setError(error.message));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (producto) {
      setProducto({ ...producto, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="box">
        <h2 className="title is-4">Update Producto</h2>
        {fetchSuccess && (
          <div>
            <p>ID: {producto?.id}</p>
            <p>Nombre: {producto?.nombre}</p>
            <p>Codigo Barra: {producto?.codigobarras}</p>
            <p>Precio: {producto?.precioventa}</p>
            <p>Stock: {producto?.cantidadstock}</p>
            <p>Estado: {producto?.estado ? "Ready" : "Not Ready"}</p>
            <p>Category ID: {producto?.categoria.id}</p>
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
                type="text"
                id="nombre"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="codigobarras" className="label">
              Código de Barras
            </label>
            <div className="control">
              <input
                type="text"
                id="codigobarras"
                name="codigobarras"
                value={producto.codigobarras}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="precioventa" className="label">
              Precio de Venta
            </label>
            <div className="control">
              <input
                type="number"
                id="precioventa"
                name="precioventa"
                value={producto.precioventa}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="cantidadstock" className="label">
              Cantidad en Stock
            </label>
            <div className="control">
              <input
                type="number"
                id="cantidadstock"
                name="cantidadstock"
                value={producto.cantidadstock}
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
                checked={producto.estado}
                onChange={(e) =>
                  setProducto({ ...producto, estado: e.target.checked })
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
