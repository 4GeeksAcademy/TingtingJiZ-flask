import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const PlanetsDetails = () => {
    const { store, actions } = useContext(Context)
    const [item, setItem] = useState(store.currentPlanet.properties)

    /*     const detailsData = async () => {
            await actions.planetDetails()
        }
    
        useEffect(() => {
            detailsData()
        }, []) */

    return (
        <div className="container bg-dark mb-3 mt-5">
            <h1 className="text-center text-light mt-3">Details</h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-2 justify-content-center">
                <div className="card mx-2 my-3">
                    <img className="card-img-top mt-0" src={`https://starwars-visualguide.com/assets/img/planets/${store.currentPlanet.uid}.jpg`} alt="planets" />
                    <div className="card-body">
                        <h5 className="card-title">Name: {item.name}</h5>
                        <p className="card-text "> <strong>Climate: </strong>{item.climate}</p>
                        <p className="card-text "><strong>Diameter: </strong>{item.diameter}</p>
                        <p className="card-text "><strong>Gravity: </strong>{item.gravity}</p>
                        <p className="card-text "> <strong>Terrain: </strong>{item.terrain}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}




/* import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const PlanetsDetails = () => {
    const { store, actions } = useContext(Context)
    const [item, setItem] = useState(store.currentPlanet.properties)

    const detailsPlanet = async () => {
        await actions.planetDetails()
    }

    useEffect(() => {
        detailsPlanet()
    }, [])

    return (
        <div className="container bg-dark mb-3 mt-5">
            <h1 className="text-center text-light mt-3">Details</h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-2 justify-content-center">
                <div className="card mx-2 my-3">
                    <img className="card-img-top mt-0" src={`https://starwars-visualguide.com/assets/img/planets/${store.currentPlanet.uid}.jpg`} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">Name: {item.name}</h5>
                        <p className="card-text "> <strong>Climate: </strong>{item.climate}</p>
                        <p className="card-text "><strong>Diameter: </strong>{item.diameter}</p>
                        <p className="card-text "><strong>Orbital period: </strong>{item.orbital_period}</p>
                        <p className="card-text "> <strong>Terain: </strong>{item.terrain}</p>
                        <p className="card-text "> <strong>Population: </strong>{item.population}</p>
                        <p className="card-text "><strong>Gravity:  </strong> {item.gravity}</p>
                    </div>
                </div>
            </div>
        </div>
    )
} */


