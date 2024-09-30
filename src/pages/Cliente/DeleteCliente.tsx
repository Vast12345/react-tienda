import * as React from 'react';
import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

interface Cliente {
    id: number
    nombre: string
    apellido: string
    celular: number
    direccion: string
    correoelectronico: string
}

export default function DeleteCliente() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/cliente/view/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch client');
                }
                return response.json();
            })
            .then((data) => {
                setCliente(data);
                setFetchSuccess("Success");
            })
            .catch((err) => setError(err.message))
    }, [id]);

    const HandleDelete = () => {
        fetch(`http://localhost:8080/api/cliente/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setTimeout(() => {
                navigate("/cliente")
            }, 2000);
            setSuccess("Deleted")
        })
        .catch((error) => setError(error.message));
        
    }

    return (
        <div className="box mt-3">
            <h2 className="title is-4">Delete Cliente</h2>
            <p>Are you sure you want to delete the following?</p>
            {fetchSuccess && (
                <div>
                    <p>ID: {cliente?.id}</p>
                    <p>Nombre: {cliente?.nombre}</p>
                    <p>Apellido: {cliente?.apellido}</p>
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