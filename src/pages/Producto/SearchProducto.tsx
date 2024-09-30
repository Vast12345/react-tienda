import * as React from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';

interface Producto {
    id: string;
    nombre: string;
    codigobarras: string;
    precioventa: string;
    cantidadstock: string;
    estado: boolean;
    categoria: {
        id: string;
        descripcion: string;
    };
}

export default function SearchProducto() {
    const [producto, setProducto] = useState<Producto | null>(null);
    const [id, setId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const viewProducto = () => {
        setError(null);

        fetch(`http://localhost:8080/api/producto/view/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setProducto(data)
            console.log(data)
        })
        .catch((error) => {
            console.error(error);
            setError(error.message);
        });
    };

    return (
        <div>
            <h1 className="title is-2 mb-4">View Producto</h1>
            <div className="field">
                <div className="label">Enter Producto ID</div>
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
                <button className="button is-primary mt-2" onClick={viewProducto}>
                    View Producto
                </button>

                {error && <div className="notification is-danger mt-2">{error}</div>}
                
                {producto && (
                    <>
                    <div className="box mt-3">
                        <p>ID: {producto.id}</p>
                        <p>Nombre: {producto.nombre}</p>
                        <p>Codigo Barras: {producto.codigobarras}</p>
                        <p>Precio: {producto.precioventa}</p>
                        <p>Stock: {producto.cantidadstock}</p>
                        <p>Estado: {producto.estado ? "Ready" : "Not Ready" }</p>
                        <p>Category Id: {producto.categoria.id}</p>
                        <p>Category Name: {producto.categoria.descripcion}</p>
                    </div>
                    <div className="mt-4">
                        <Link to={`/producto/update/${producto.id}`} className="text-blue-500 hover:underline mr-4">
                        Edit
                        </Link>
                        <Link to={`/producto/delete/${producto.id}`} className="text-red-500 hover:underline">
                        Delete
                        </Link>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}
