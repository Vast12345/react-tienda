import * as React from 'react';
import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

interface Categoria {
    id: string
    descripcion: string
    estado: boolean
}

export default function DeleteCategoria() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState<Categoria | null>(null);
    const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/categoria/view/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch client');
                }
                return response.json();
            })
            .then((data) => {
                setCategoria(data);
                setFetchSuccess("Success");
            })
            .catch((err) => setError(err.message))
    }, [id]);

    const HandleDelete = () => {
        fetch(`http://localhost:8080/api/categoria/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setTimeout(() => {
                navigate("/categoria")
            }, 2000);
            setSuccess("Deleted")
        })
        .catch((error) => setError(error.message));
        
    }

    return (
        <div className="box mt-3">
            <h2 className="title is-4">Delete Categoria</h2>
            <p>Are you sure you want to delete the following?</p>
            {fetchSuccess && (
                <div>
                    <p>ID: {categoria?.id}</p>
                    <p>Descripcion: {categoria?.descripcion}</p>
                    <p>Estado: {categoria?.estado ? "Ready" : "Not Ready"}</p>
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