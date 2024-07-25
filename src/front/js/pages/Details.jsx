import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Details = () => {
    const { store, actions } = useContext(Context)
    const [item, setItem] = useState(store.currentCharacter.properties)
 
    const detailsData = async () => {
        await actions.getDetails()
    }

    useEffect(() => {
        detailsData()
    }, []) 

    return (
        <div className="container bg-dark mb-3 mt-5">
            <h1 className="text-center text-light mt-3">Details</h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-2 justify-content-center">
                <div className="card mx-2 my-3">
                    <img className="card-img-top mt-0" src={`https://starwars-visualguide.com/assets/img/characters/${store.currentCharacter.uid}.jpg`} alt="Luke Skywalker" />
                    <div className="card-body">
                        <h5 className="card-title">Name: {item.name}</h5>
                        <p className="card-text "> <strong>Height: </strong>{item.height}</p>
                        <p className="card-text "><strong>Mass: </strong>{item.mass}</p>
                        <p className="card-text "><strong>Birth year: </strong>{item.brith_year}</p>
                        <p className="card-text "> <strong>Eye color: </strong>{item.eye_color}</p>
                        <p className="card-text "> <strong>Gender: </strong>{item.gender}</p>
                        <p className="card-text "><strong>Hair color: </strong> {item.hair_color}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}