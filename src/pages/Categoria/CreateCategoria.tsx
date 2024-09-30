import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Categoria {
  id: string;
  descripcion: string;
  estado: boolean;
}

export default function CreateCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({
    id: "",
    descripcion: "",
    estado: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (categoria) {
      setCategoria({ ...categoria, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    fetch("http://localhost:8080/api/categoria/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descripcion: categoria?.descripcion,
        estado: categoria?.estado,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        navigate("/categoria/list");
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <div>
      <h1 className="title is-2">Create categoria</h1>
        <div className="field">
          <label htmlFor="descripcion" className="label">
            Descripcion
          </label>
          <div className="control">
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={categoria?.descripcion}
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
          <div className="control is-flex">
            <input
              type="checkbox"
              id="estado"
              name="estado"
              checked={categoria?.estado}
              onChange={(e) => setCategoria({ ...categoria, estado: e.target.checked })}
            />
            <p className="ml-1 has-text-white">Ready</p>
          </div>
        </div>
        <button onClick={handleSubmit} type="submit" className="button is-primary">
          Create
        </button>
    </div>
  );
}
