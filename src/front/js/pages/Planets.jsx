import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Planets = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    const handleDetails = async (uid) => {
        await actions.planetDetails(uid)
        navigate("/planets-details")
    
    }

    const planetsData = async () => {
        await actions.getPlanets();

    }

    const handleError = (event) => {
        event.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
    }

    useEffect(() => {
        planetsData()
    }, [])

    return (
        <div className="container bg-dark mb-3 mt-5">
            <h1 className="text-center text-light mt-3">Planets</h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-2 justify-content-center">
                {store.planets && store.planets.map((item) => (
                    <div key={item.uid} style={{ width: "18rem" }}>
                        <div className="card mx-2 my-3">
                            <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} onError={handleError} alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="justify-content-between d-flex">
                                    <span onClick={() => handleDetails(item.uid)} className="btn btn-primary">Details</span>
                                    <span onClick={() => actions.addFavourite(item.name)} type="button" className="btn btn-danger text-end">
                                        <i className="fa fa-heart"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}