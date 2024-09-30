import * as React from 'react';
import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

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
export default function DeleteCompra() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [compra, setCompra] = useState<Compra | null>(null);
    const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/compra/view/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch client');
                }
                return response.json();
            })
            .then((data) => {
                setCompra(data);
                setFetchSuccess("Success");
            })
            .catch((err) => setError(err.message))
    }, [id]);

    const HandleDelete = () => {
        fetch(`http://localhost:8080/api/compra/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setTimeout(() => {
                navigate("/compra/list")
            }, 2000);
            setSuccess("Deleted")
        })
        .catch((error) => setError(error.message));
        
    }

    return (
        <div className="box mt-3">
            <h2 className="title is-4">Delete compra</h2>
            <p>Are you sure you want to delete the following?</p>
            {fetchSuccess && (
                <div>
                    <p>ID: {compra?.id}</p>
                    <p>Fecha: {compra?.fecha}</p>
                    <p>Medio Pago: {compra?.mediopago}</p>
                    <p>Comentario: {compra?.comentario}</p>
                    <p>Estado: {compra?.estado ? "Ready" : "Not Ready"}</p>
                    <p>Cliente ID: {compra?.cliente.id}</p>
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