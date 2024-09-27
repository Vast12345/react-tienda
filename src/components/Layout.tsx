import React, { ReactNode } from 'react';

import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-vh-100">
            <nav className="navbar is-white">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item has-text-weight-bold is-size-4">
                            Cliente CRUD
                        </Link>
                    </div>
                    <div className="navbar-menu">
                        <div className='navbar-end'>
                            <Link to="/create" className="navbar-item has-text-grey is-size-6">
                                Create Cliente
                            </Link>
                        </div>
                    </div>
                </div>
            </nav >
        <main className="container py-6">{children}</main>
    </div >
  )
}