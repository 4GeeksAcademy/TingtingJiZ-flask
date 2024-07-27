import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const handleDetails = async (uid) => {
        await actions.getDetails(uid)
        navigate("/details")
    }

    const fetchData = async () => {
        await actions.getCharacters();

    }
    const handleError = (event) => {
        event.targer.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
    }

/*     const handleAdd = async(name) => {
        await actions.addFavourite(name)
    } */

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container bg-dark mb-3 mt-5">
            <h1 className="text-center text-light mt-3">Characters</h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-2 justify-content-center">
                {store.characters && store.characters.map((item) => (
                    <div  key={item.uid} style={{width: "18rem"}}>
                    <div className="card mx-2 my-3">
                        <img className="card-img-top mt-0" src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} onError={handleError} alt="Luke Skywalker" />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className="justify-content-between d-flex">
                            <span href="#" onClick={() => handleDetails(item.uid)} className="btn btn-primary">Details</span>
                            <span onClick={() => actions.addFavourite(item.name)} type="button" className="btn btn-danger">
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

