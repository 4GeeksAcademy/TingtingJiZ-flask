import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context)

/*     const handleDelete = (name) => {
        actions.removeFavourite(name)
    } */

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <img className="navbar-brand" src="https://media.tenor.com/dJq8WjCg9ygAAAAj/star-wars-cosplay.gif" width={50} />
                <Link to="/" className="navbar-brand">{store.website}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                            </li>
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
                                <Link className="nav-link dropdown-toggle" to="/" data-bs-toggle="dropdown" aria-expanded="false">Favourite</Link>
                                <ul className="dropdown-menu-end dropdown-menu">
                                    {store.favourite.map((index, id)=> (
                                    <li className="d-flex justify-content-between my-2 mx-2" key={id} >
                                        {index}
                                        <span onClick={() => actions.removeFavourite(id)} type="submit" className="text-end">
                                            <i className="fa fa-trash text-danger"></i>
                                        </span>
                                    </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};



/* 		<nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">{store.website}</span>
                </Link>
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">{store.website}</span>
                </Link>
                <div className="ml-auto">
                    <Link to="/form">
                        <button className="btn btn-success">Add Contact</button>
                    </Link>
                </div>
            </div>
        </nav> */


