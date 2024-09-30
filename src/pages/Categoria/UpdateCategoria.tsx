import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Categoria {
    id: string
    descripcion: string
    estado: boolean
}

export default function UpdateCategoria() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria>({
    id: "",
    descripcion: "",
    estado: false,
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/categoria/view/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch client");
        }
        return response.json();
      })
      .then((data) => {
        setCategoria(data);
        setFetchSuccess("Success");
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const HandleUpdate = () => {
    fetch(`http://localhost:8080/api/categoria/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descripcion: categoria?.descripcion,
        estado: categoria?.estado
      })
    })
      .then(() => {
        setTimeout(() => {
          navigate("/categoria");
        }, 2000);
        setSuccess("Updated");
      })
      .catch((error) => setError(error.message));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (categoria) {
      setCategoria({ ...categoria, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="box">
        <h2 className="title is-4">Update Categoria</h2>
        {fetchSuccess && (
          <div>
            <p>ID: {categoria?.id}</p>
            <p>Descripcion: {categoria?.descripcion}</p>
            <p>Estado: {categoria?.estado ? "Ready" : "Not Ready"}</p>
          </div>
        )}
      </div>
      <div>
        <div className="field">
            <label className="label">Descripcion</label>
            <div className="control">
            <input
                className="input"
                type="text"
                name="descripcion"
                value={categoria?.descripcion || ""}
                onChange={handleChange}
            />
            </div>
        </div>
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
