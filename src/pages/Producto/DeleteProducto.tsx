import * as React from 'react';
import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

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

export default function DeleteProducto() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/producto/view/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch client');
                }
                return response.json();
            })
            .then((data) => {
                setProducto(data);
                setFetchSuccess("Success");
            })
            .catch((err) => setError(err.message))
    }, [id]);

    const HandleDelete = () => {
        fetch(`http://localhost:8080/api/producto/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setTimeout(() => {
                navigate("/producto/list")
            }, 2000);
            setSuccess("Deleted")
        })
        .catch((error) => setError(error.message));
        
    }

    return (
        <div className="box mt-3">
            <h2 className="title is-4">Delete Producto</h2>
            <p>Are you sure you want to delete the following?</p>
            {fetchSuccess && (
                <div>
                    <p>ID: {producto?.id}</p>
                    <p>Nombre: {producto?.nombre}</p>
                    <p>Codigo Barra: {producto?.codigobarras}</p>
                    <p>Precio: {producto?.precioventa}</p>
                    <p>Stock: {producto?.cantidadstock}</p>
                    <p>Estado: {producto?.estado ? "Ready" : "Not Ready"}</p>
                    <p>Category ID: {producto?.categoria.id}</p>
                </div>
            )}
            <div className="container is-flex mt-3">
                <div className="control">
                    <button onClick={HandleDelete} className='button is-danger mr-3'>Delete</button>
                </div>
                <div className="control">
                    <button onClick={() => navigate(-1)} className='button'>Cancel</button>
                </div>
            </div>
            {success && <div className="notification is-success mt-2">{success}</div>}

            {error && <div className="notification is-danger mt-2">{error}</div>}
        </div>
    )
}