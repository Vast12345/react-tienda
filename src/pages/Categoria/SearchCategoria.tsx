import * as React from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';

interface Categoria {
    id: string
    descripcion: string
    estado: boolean
}

export default function SearchCategoria() {
    const [categoria, setCategoria] = useState<Categoria | null>(null);
    const [id, setId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const viewCategoria = () => {
        setError(null);

        fetch(`http://localhost:8080/api/categoria/view/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => setCategoria(data))
        .catch((error) => {
            console.error(error);
            setError(error.message);
        });
    };

    return (
        <div>
            <h1 className="title is-2 mb-4">View Categoria</h1>
            <div className="field">
                <div className="label">Enter Categoria ID</div>
                <div className="control">
                    <input 
                    type="text" 
                    className="input"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder='Enter Id'
                    required
                    />
                </div>
                <button className="button is-primary mt-2" onClick={viewCategoria}>
                    View Categoria
                </button>

                {error && <div className="notification is-danger mt-2">{error}</div>}
                
                {categoria && (
                    <>
                    <div className="box mt-3">
                        <p>ID: {categoria.id}</p>
                        <p>Descripcion: {categoria.descripcion}</p>
                        <p>Estado: {categoria.estado ? "Ready" : "Not Ready" }</p>
                    </div>
                    <div className="mt-4">
                        <Link to={`/categoria/update/${categoria.id}`} className="text-blue-500 hover:underline mr-4">
                        Edit
                        </Link>
                        <Link to={`/categoria/delete/${categoria.id}`} className="text-red-500 hover:underline">
                        Delete
                        </Link>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}
