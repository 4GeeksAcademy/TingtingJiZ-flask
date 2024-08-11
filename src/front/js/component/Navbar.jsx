import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



export const Navbar = () => {
    const { store, actions } = useContext(Context)
	const navigate = useNavigate()
	const userLogin = store.isLoged
	const token = localStorage.getItem('token');


   /*  const remotefavorite = async (id) => {
		actions.removeFavorite(id);
	} */

    const removeFavourites = async (item) => {
		const uri = process.env.BACKEND_URL + 'api/favourites';
		console.log(uri);
		const options = {
			method: 'DELETE',
			body: JSON.stringify({"item": item}),
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		};
		const response = await fetch(uri, options);
		if(!response.ok){
			console.log('Error', response.status, response.statusText);
		}
		if(response == 201){
			console.log("All alright");
			
		}
		console.log('Favourite deleted correctly');
		favourite();
	}

	const favourite = async () => {
		const uri = process.env.BACKEND_URL + 'api/favourites';
		console.log(uri);
		const options = {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		};
		console.log(userLogin);
			console.log("Hay login"+store.isLoged);
			try {
				const response = await fetch(uri, options);
				if (response.status == 422) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				actions.setFavourites(data.result);
				console.log(data);
			} catch (error) {
				console.log('Eroor fecth', error);
				return;
			}
		favourite();
	}
	useEffect(() => {
		if(userLogin){
			favourite();
		}
	}, [userLogin]);

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
                                <Link className="nav-link dropdown-toggle btn btn-secondary" to="/" data-bs-toggle="dropdown" aria-expanded="false">Favourite<span className="badge text-bg-secondary">{store.favourites.length}</span></Link>
                                <ul className="dropdown-menu-end dropdown-menu">
                                    {store.favourites.length > 0 ? (
                                        store.favourites.map((fav, index) => (
                                            <li className="d-flex justify-content-between my-2 mx-2" key={index} >
                                                {fav.item}
                                                <span onClick={() => removeFavourites(fav.item)} type="submit" className="text-end">
                                                    <i className="fa fa-trash text-danger"></i>
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="dropdown-item">No favourites</li>
                                    )}
                                </ul>
                            </li>
                            {store.isLogged ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Logout">Logout</Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Signup">Signup</Link>
                                    </li>

                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
};
