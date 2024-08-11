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

    const addFavouriteApi = async(favourite) =>{
        const token = localStorage.getItem('token');
        // Imprimir el token en la consola
        console.log(token);
        const dataToSend = {
            "item": favourite,
        };
        // 1. fetch al /api/login enviando en el body el dataToSend
        const uri = process.env.BACKEND_URL + '/api/favourites'
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        console.log(dataToSend, localStorage.getItem('access_token'));
        const response = await fetch(uri, options)
        if (!response.ok) {
            // Tratamos el error
            console.log('Error: ', response.status, response.statusText);
            if (response.status == 401) {
                const data = await response.json()
                // let alert = {
                //     visible: true,
                //     back: 'danger',
                //     text: data.message
                // }
                // actions.setAlert(alert)
                console.log("Error: " + response.status + response.statusText)
            }
            else if(response.status == 409){
                console.log("El favorito ya existe");
            }
            return
        }
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
                                    <span onClick={() => addFavouriteApi(item.name)} type="button" className="btn btn-danger text-end">
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