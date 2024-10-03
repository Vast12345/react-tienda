import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

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
    const { compraId } = useParams();
    const [catId, setCatId] = useState<string>();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [prodId, setProdId] = useState('');
    const [productos, setProductos] = useState<Producto[]>([]);
    const [filteredProdcutos, setFilteredProductos] = useState<Producto[]>([]);
    const [productCart, setProductCart] = useState<ProdCart[]>([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState(null);
    const categoriaRef = useRef<HTMLSelectElement>(null);
    const cantidadRef = useRef<HTMLInputElement>(null);
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
        if(catId) {
            setFilteredProductos(productos.filter(producto => Number(producto.categoria.id) === Number(catId)));
        } else {
            setFilteredProductos(productos);
        }
    }, [catId, productos])

    const addProdToCart = () => {
        if (prodId) {
            const existingProductIndex = productCart.findIndex(prod => prod.prodId === prodId);

            if (existingProductIndex >= 0) {
                alert("Choose a new Product");
            } else {
                const cantidad = Number(cantidadRef.current?.value);
                const newProduct: ProdCart = { prodId, cantidad };
                setProductCart(prev => [...prev, newProduct]);
            }
            setProdId('');
        } else {
            alert("Please select a product");
        }
    }

    const handleDelete = (id) => {
        setProductCart((prevProdCart) => prevProdCart.filter((product) => product.prodId !== String(id)));
    }

    const handleCreate = () => {
        setLoading(true);
        productCart.forEach(async (productEntry) => {
            const product = productos.find((prod) => {
                return Number(prod.id) === Number(productEntry.prodId);
            });
            const subtotal = product ? productEntry.cantidad * parseFloat(product.precioventa) : 0;
            console.log("Compra ID: ", Number(compraId), " Product Id: ", Number(productEntry.prodId), " Cantidad: ", productEntry.cantidad, " Total: ", subtotal);
            try {
                const response = await axios.post('http://localhost:8080/api/compraproducto/create', {
                    id: {
                        idcompra: Number(compraId),
                        idproducto: Number(productEntry.prodId)
                    },
                    cantidad: productEntry.cantidad,
                    total: subtotal,
                    estado: true
                })
                console.log(response);
            } catch(err) {
                setError(err.message);
            }
        })
        setLoading(false);
        setTimeout(() => {
            navigate("/compra/list");
          }, 2000);
        setSuccess("Success");
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
                                    onChange={(e) => {setCatId(e.target.value);}}
                                    ref={categoriaRef}
                                    required
                                >
                                    <option value={""}>
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
                                    {filteredProdcutos.map((producto) => (
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
                            ref={cantidadRef}
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
                                <th>Product Price</th>
                                <th>Cantidad</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {productCart.map((productEntry) => {
                            const product = productos.find((prod) => {
                                return Number(prod.id) === Number(productEntry.prodId);
                            });
                            const subtotal = product ? productEntry.cantidad * parseFloat(product.precioventa) : 0;

                            return product ? (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.nombre}</td>
                                    <td>${product.precioventa}</td>
                                    <td>{productEntry.cantidad}</td>
                                    <td>${subtotal.toFixed(2)}</td>
                                    <td><button className="button is-danger" onClick={() => handleDelete(product.id)}>X</button></td>
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
            {success && <div className="notification is-success mt-5">{success}</div>}
        </div>
    );
}
