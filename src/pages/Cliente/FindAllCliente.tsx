import * as React from 'react';
import { useState, useEffect } from 'react';

interface Cliente {
    id: number
    nombre: string
    apellido: string
    celular: number
    direccion: string
    correoelectronico: string
}

export default function FindAllCliente() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8080/api/cliente/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => setClientes(data))
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
            <h2 className="title is-4">Client List</h2>
            {clientes.length === 0 ? (
                <p>No Clients Found</p>
            ) : (
                <ul>
                    {clientes.map((cliente ) => (
                        <li key={cliente.id}>
                            <p>ID: {cliente.id}</p>
                            <p>Name: {cliente.nombre}</p>
                            <p>Apellido: {cliente.apellido}</p>
                            <p>Celular: {cliente.celular}</p>
                            <p>Direccion: {cliente.direccion}</p>
                            <p>Correo: {cliente.correoelectronico}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}