import * as React from 'react';
import { useState, useEffect } from 'react';

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

export default function FindAllCompra() {
    const [compras, setCompras] = useState<Compra[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8080/api/compra/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => setCompras(data))
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
            <h2 className="title is-4">Compra List</h2>
            {compras.length === 0 ? (
                <p>No Compras Found</p>
            ) : (
                <ul>
                    {compras.map((compra ) => (
                        <li key={compra.id}>
                            <p>ID: {compra.id}</p>
                            <p>Fecha: {compra.fecha}</p>
                            <p>Medio Pago: {compra.mediopago}</p>
                            <p>Comentario: {compra.comentario}</p>
                            <p>Estado: {compra.estado ? "Ready" : "Not Ready"}</p>
                            <p>Cliente ID: {compra.cliente.id}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}