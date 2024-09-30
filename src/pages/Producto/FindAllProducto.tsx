import * as React from 'react';
import { useState, useEffect } from 'react';

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

export default function FindAllProducto() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8080/api/producto/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => setProductos(data))
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
            <h2 className="title is-4">Producto List</h2>
            {productos.length === 0 ? (
                <p>No Productos Found</p>
            ) : (
                <ul>
                    {productos.map((producto ) => (
                        <li key={producto.id}>
                            <p>ID: {producto.id}</p>
                            <p>Nombre: {producto.nombre}</p>
                            <p>Codigo Barras: {producto.codigobarras}</p>
                            <p>Precio: {producto.precioventa}</p>
                            <p>Stock: {producto.cantidadstock}</p>
                            <p>Estado: {producto.estado ? "Ready" : "Not Ready"}</p>
                            <p>Category ID: {producto.categoria.id}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}