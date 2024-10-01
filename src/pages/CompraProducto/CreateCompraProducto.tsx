import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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

interface Categoria {
    id: string;
    descripcion: string;
    estado: boolean;
}

interface CompraProducto {
    idCompra: string;
    idProducto: string;
    cantidad: number;
    estado: boolean;
}

export default function CreateCompraProducto() {
    const [compra, setCompra] = useState<Compra>({
        id: "",
        fecha: "",
        mediopago: "",
        comentario: "",
        estado: false,
        cliente: {
            id: "",
        },
    });
    const [catId, setCatId] = useState<string>();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [prodId, setProdId] = useState<string>();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [compraProducto, setComraProducto] = useState<CompraProducto>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const clienteRef = useRef<HTMLSelectElement>(null);
    const categoriaRef = useRef<HTMLSelectElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/categoria/list");
                setCategorias(response.data);
            } catch (err){
                setError(err)
            }
        }

        const fetchProducto = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/producto/list");
                setProductos(response.data);
            } catch (err) {
                setError(err);
            }
        }

        const fecthData = async () => {
            setLoading(true);
            await Promise.all([fetchCategoria(), fetchProducto()]);
            setLoading(false);
        }

        fecthData();
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (compra) {
            setCompra({ ...compra, [e.target.name]: e.target.value });
            console.log(compra)
        }
    };

    const handleCreate = () => {
        if (clienteRef.current) {
            const selectedCategoriaId = clienteRef.current.value;
            setCompra((prev) => ({
                ...prev,
                cliente: { id: String(selectedCategoriaId) },
            }));
        }
        console.log(compra);
        fetch("http://localhost:8080/api/compraproducto/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fecha: compra?.fecha,
                mediopago: compra?.mediopago,
                comentario: compra?.comentario,
                estado: compra?.estado,
                cliente: {
                    id: compra.cliente.id,
                },
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(() => {
                navigate("/compra/list");
            })
            .catch((error) => console.error("Error: ", error));
    };

    return (
        <div>
            <h1 className="title is-2">Create Compra</h1>
            <div>
                <div className="is-flex">
                    <div className="field mr-2">
                        <label htmlFor="categoriaId" className="label">
                            Categoría
                        </label>
                        <div className="control">
                            <div className="select">
                                <select
                                    id="categoriaId"
                                    name="categoriaId"
                                    value={catId}
                                    onChange={(e) => {
                                        setCatId(e.target.value);
                                    }
                                    }
                                    ref={categoriaRef}
                                    required
                                >
                                    <option value={""} disabled>
                                        Seleccione una categoría
                                    </option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.id}. {categoria.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field mr-2">
                        <label htmlFor="productoId" className="label">
                            Producto
                        </label>
                        <div className="control">
                            <div className="select">
                                <select
                                    id="productoId"
                                    name="productoId"
                                    value={prodId}
                                    onChange={(e) => {
                                        setProdId(e.target.value);
                                    }
                                    }
                                    ref={categoriaRef}
                                    required
                                >
                                    <option value={""} disabled>
                                        Seleccione una Producto
                                    </option>
                                    {productos.map((producto) => (
                                        <option key={producto.id} value={producto.id}>
                                            {producto.id}. {producto.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="cantidad" className="label">
                            Cantidad
                        </label>
                        <div className="control">
                        <input
                            type="number"
                            id="cantidad"
                            name="cantidad"
                            value={compraProducto?.cantidad}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                        </div>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="button is-danger mr-2">
                    Back
                </button>
                <button onClick={handleCreate} className="button is-primary">
                    Create
                </button>
            </div>
        </div>
    );
}
