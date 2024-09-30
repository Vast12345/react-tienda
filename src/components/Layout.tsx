import React from 'react';

import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-vh-100">
            <nav className="navbar is-white">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item has-text-weight-bold is-size-4">
                            Tienda
                        </Link>
                    </div>
                    <div className="navbar-menu">
                        <div className='navbar-end'>
                            <Link to="/cliente" className="navbar-item has-text-grey is-size-6">
                                Cliente
                            </Link>
                            <Link to="/categoria" className='navbar-item has-text-grey is-size-6'>
                                Categoria
                            </Link>
                            <Link to="/producto" className='navbar-item has-text-grey is-size-6'>
                                Producto
                            </Link>
                            <Link to={"/compra"} className='navbar-item has-text-grey is-size-6'>
                                Compra
                            </Link>
                        </div>
                    </div>
                </div>
            </nav >
        <main className="container mt-2">{children}</main>
    </div >
  )
}