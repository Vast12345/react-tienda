import * as React from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';

interface Cliente {
    id: number
    nombre: string
    apellido: string
    celular: number
    direccion: string
    correoelectronico: string
}

export default function SearchCliente() {
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [id, setId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const viewCliente = () => {
        setError(null);

        fetch(`http://localhost:8080/api/cliente/view/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => setCliente(data))
        .catch((error) => {
            console.error(error);
            setError(error.message);
        });
    };

    return (
        <div>
            <h1 className="title is-2 mb-4">View Cliente</h1>
            <div className="field">
                <div className="label">Enter Cliente ID</div>
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
                <button className="button is-primary mt-2" onClick={viewCliente}>
                    View Cliente
                </button>

                {error && <div className="notification is-danger mt-2">{error}</div>}
                
                {cliente && (
                    <>
                    <div className="box mt-3">
                        <p>ID: {cliente.id}</p>
                        <p>Name: {cliente.nombre}</p>
                        <p>Apellido: {cliente.apellido}</p>
                        <p>Celular: {cliente.celular}</p>
                        <p>Direccion: {cliente.direccion}</p>
                        <p>Correo: {cliente.correoelectronico}</p>
                    </div>
                    <div className="mt-4">
                        <Link to={`/cliente/update/${cliente.id}`} className="text-blue-500 hover:underline mr-4">
                        Edit
                        </Link>
                        <Link to={`/cliente/delete/${cliente.id}`} className="text-red-500 hover:underline">
                        Delete
                        </Link>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}
