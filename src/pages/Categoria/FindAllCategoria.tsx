import * as React from 'react';
import { useState, useEffect } from 'react';

interface Categoria {
    id: string
    descripcion: string
    estado: boolean
}

export default function FindAllCategoria() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8080/api/categoria/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => setCategorias(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    }, [])

    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="box mt-3">
            <h2 className="title is-4">Categoria List</h2>
            {categorias.length === 0 ? (
                <p>No Categorias Found</p>
            ) : (
                <ul>
                    {categorias.map((categoria ) => (
                        <li key={categoria.id}>
                            <p>ID: {categoria.id}</p>
                            <p>Descripcion: {categoria.descripcion}</p>
                            <p>Estado: {categoria.estado ? "Ready" : "Not Ready"}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}