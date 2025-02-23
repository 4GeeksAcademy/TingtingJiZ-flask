import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context)

    /*     const handleDelete = (name) => {
            actions.removeFavourite(name)
        } */

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Offcanvas navbar large">
            <div className="container-fluid">
                <img className="navbar-brand" src="https://media.tenor.com/dJq8WjCg9ygAAAAj/star-wars-cosplay.gif" width={50} />
                <Link to="/" className="navbar-brand">{store.website}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end bg-dark" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title text-white" id="offcanvasNavbar2Label">Menu</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Characters">Characters</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Planets">Planets</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Species">Species</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Contact">Contact List</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle btn btn-secondary" to="/" data-bs-toggle="dropdown" aria-expanded="false">Favourite</Link>
                                <ul className="dropdown-menu-end dropdown-menu">
                                    {store.favourite.length > 0 ? (
                                        store.favourite.map((index, id) => (
                                        <li className="d-flex justify-content-between my-2 mx-2" key={id} >
                                            {index}
                                            <span onClick={() => actions.removeFavourite(id)} type="submit" className="text-end">
                                                <i className="fa fa-trash text-danger"></i>
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="dropdown-item">No favourites</li>
                                )}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
};
