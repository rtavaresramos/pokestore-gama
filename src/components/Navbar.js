import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

import { useCart } from '../hooks/cart';
import Search from './Search';

import logo from '../images/pokestore.png';

const Navbar = ({ search }) => {

    const { totalQuantItems } = useCart();

    return (

        <div className="container-fluid ">

            <nav className="navbar">

                <div className="navbar-brand">
                    <button className="logo-button" onClick={() => window.location.reload(true)}>
                        <img src={logo} alt="PokeStore" className="logo" />
                    </button>
                </div>
            
                <div className="row">

                    <div className="col-9 col-sm-8">
                        <Search search={search} />
                    </div>

                    <div className="col-3 col-sm-4">
                        <div className="navbar-cart">
                            
                            <a href="#my-cart">
                              
                                <FontAwesomeIcon icon={faTruck} />
                                <span className="badge badge-pill badge-success">
                                    {totalQuantItems}
                                </span>
                            </a>
                        </div>
                    </div>

                </div>
 
            </nav>
        </div>
    )
}

export default Navbar;