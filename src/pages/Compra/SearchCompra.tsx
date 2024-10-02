import * as React from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';

interface Compra {
    id: string;
    fecha: string;
    mediopago: string;
    comentario: string;
    estado: boolean;
    cliente: {
      id: string;
      nombre: string;
    };
  }

export default function SearchCompra() {
    const [compra, setCompra] = useState<Compra | null>(null);
    const [id, setId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const viewCompra = () => {
        setError(null);

        fetch(`http://localhost:8080/api/compra/view/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setCompra(data)
            console.log(data)
        })
        .catch((error) => {
            console.error(error);
            setError(error.message);
        });
    };

    return (
        <div>
            <h1 className="title is-2 mb-4">View Compra</h1>
            <div className="field">
                <div className="label">Enter Compra ID</div>
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
                <button className="button is-primary mt-2" onClick={viewCompra}>
                    View Compra
                </button>

                {error && <div className="notification is-danger mt-2">{error}</div>}
                
                {compra && (
                    <>
                    <div className="box mt-3">
                        <p>ID: {compra.id}</p>
                        <p>Fecha: {compra.fecha}</p>
                        <p>Medio Pago: {compra.mediopago}</p>
                        <p>Comentario: {compra.comentario}</p>
                        <p>Estado: {compra.estado ? "Ready" : "Not Ready" }</p>
                        <p>Cliente Id: {compra.cliente.id}</p>
                        <p>Cliente Nombre: {compra.cliente.nombre}</p>
                    </div>
                    <div className="mt-4">
                        <Link to={`/compra/update/${compra.id}`} className="text-blue-500 hover:underline mr-4">
                        Edit
                        </Link>
                        <Link to={`/compra/delete/${compra.id}`} className="text-red-500 hover:underline mr-4">
                        Delete
                        </Link>
                        <Link to={`/compra/${compra.id}/checkout`} className="text-red-500 hover:underline">
                            Shop
                        </Link>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}
