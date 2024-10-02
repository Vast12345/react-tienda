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

interface ProdCart {
    prodId: string;
    cantidad: number;
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
    const [prodId, setProdId] = useState('');
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cantidad, setCantidad] = useState(1);
    const [prodCartId, setProdCartId] = useState<string[]>([]);
    const [productCart, setProductCart] = useState<ProdCart[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
    }, [])

    useEffect(() => {
        console.log(productCart);
    }, [productCart])

    const addProdToCart = () => {
        console.log("Current Product IDs in Cart:", prodCartId);
        console.log("Selected Product ID:", prodId);
    
        if (prodId) {
            // Check if the product is already in the cart
            const existingProductIndex = productCart.findIndex(prod => prod.prodId === prodId);
    
            if (existingProductIndex >= 0) {
                // If it exists, update the quantity
                setProductCart(prev => {
                    const updatedCart = [...prev];
                    updatedCart[existingProductIndex].cantidad += cantidad; // Update the quantity
                    return updatedCart;
                });
            } else {
                // If it's a new product, add it to the cart
                const newProduct: ProdCart = { prodId, cantidad };
                setProductCart(prev => [...prev, newProduct]);
            }
    
            // Update the product ID list if necessary
            setProdCartId(prev => [...prev, prodId]);
    
            // Reset the selected product and quantity for user convenience
            setProdId('');
            setCantidad(1);
        } else {
            alert("Please select a product");
        }

/*         console.log(prodCartId);
        console.log(prodId);


        if (prodId && !prodCartId.includes(prodId)) {
            setProdCartId((prev) => [...prev, prodId]);
        } else {
            alert("Add a New product")
            return
        }

        const newProduct: ProdCart = {prodId, cantidad};
        console.log(newProduct);

        setProductCart((prev) => [...prev, newProduct]);
        console.log(productCart); */
    }

    const handleCreate = () => {
        if (clienteRef.current) {
            const selectedCategoriaId = clienteRef.current.value;
            setCompra((prev) => ({
                ...prev,
                cliente: { id: String(selectedCategoriaId) },
            }));
        }
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

    if (loading) {
        return <div className="notification is-info">Loading... </div>
    }
    if (error) {
        return <div className="notfication is-danger">Error: {JSON.stringify(error)}</div>
    }

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
                    <div className="field mr-2">
                        <label htmlFor="cantidad" className="label">
                            Cantidad
                        </label>
                        <div className="control">
                        <input
                            type="number"
                            id="cantidad"
                            name="cantidad"
                            value={cantidad}
                            onChange={(e) => {setCantidad(Number(e.target.value))}}
                            min={1}
                            className="input"
                            required
                        />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button" onClick={addProdToCart}>Add</button>
                    </div>
                </div>
                <div className="box is-align-items-center">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {productCart.map((productEntry) => {
                            const product = productos.find((prod) => prod.id === productEntry.prodId);
                            const cantidad = productEntry.cantidad;
                            const subtotal = product ? cantidad * parseFloat(product.precioventa) : 0; // Calculate subtotal

                            return product ? (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.nombre}</td>
                                    <td>{cantidad}</td>
                                    <td>{subtotal.toFixed(2)}</td> {/* Format subtotal to 2 decimal places */}
                                </tr>
                            ) : null;
                        })}
                        </tbody>
                    </table>
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
