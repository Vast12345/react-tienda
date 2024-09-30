import React from 'react';

import { Link, Outlet } from 'react-router-dom';

export default function EntityLayout({entityName}) {
    return (
        <div className=''>
            <div className="container">
                <div className="buttons is-justify-content-center">
                    <Link to="create" className="button is-grey is-light">
                        Create {entityName}
                    </Link>
                    <Link to="search" className='button is-grey is-light'>
                        Search {entityName}
                    </Link>
                    <Link to="list" className='button is-grey is-light'>
                        List All {entityName}
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}