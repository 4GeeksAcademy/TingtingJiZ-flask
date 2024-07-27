import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const SpeciesDetails = () => {
    const { store, actions } = useContext(Context)
    const [item, setItem] = useState(store.currentSpecies.properties)

    return (
        <div className="container bg-dark mb-3 mt-5">
            <h1 className="text-center text-light mt-3">Details</h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-2 justify-content-center">
                <div style={{ width: "18rem" }}>
                    <div className="card mx-2 my-3">
                        <img className="card-img-top mt-0" src={`https://starwars-visualguide.com/assets/img/species/${store.currentSpecies.uid}.jpg`} alt="species" />
                        <div className="card-body">
                            <h5 className="card-title">Classification: {item.classification}</h5>
                            <p className="card-text "> <strong>Designation: </strong>{item.designation}</p>
                            <p className="card-text "><strong>Average lifespan: </strong>{item.average_lifespan}</p>
                            <p className="card-text "><strong>Average height: </strong>{item.average_height}</p>
                            <p className="card-text "> <strong>Lenguage: </strong>{item.lenguage}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
