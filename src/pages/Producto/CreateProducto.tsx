import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

interface Categoria {
    id: string;
    descripcion: string;
    estado: boolean;
}

export default function CreateProducto() {
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
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const categoriaRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/categoria/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        setCategorias(data)
    })
    .catch((error) => console.error("Error: ", error))
}, [])

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (producto) {
      setProducto({ ...producto, [e.target.name]: e.target.value });
    }
  };

  const handleCreate = () => {
    if (categoriaRef.current) {
        const selectedCategoriaId = categoriaRef.current.value;
        setProducto((prev) => ({ ...prev, categoria: { id: String(selectedCategoriaId)} }));
    }
    console.log(producto)
    fetch("http://localhost:8080/api/producto/create", {
      method: "POST",
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
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        navigate("/producto/list");
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
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
              onChange={(e) => setProducto({ ...producto, estado: e.target.checked })}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="categoriaId" className="label">
            Categoría
          </label>
          <div className="control">
            <div className="select">
              <select
                id="categoriaId"
                name="categoriaId"
                value={producto.categoria.id}
                onChange={(e) => {
                  setProducto({ ...producto, categoria: { id: e.target.value } });
                    console.log(producto)}
                }
                ref={categoriaRef}
                required
              >
                <option value={""} disabled>
                  Seleccione una categoría
                </option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.id}. {categoria.descripcion}
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