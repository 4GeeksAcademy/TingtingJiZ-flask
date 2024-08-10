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
        fetchData()
    }, [])

    return (
        <div className="container bg-dark mb-3 mt-5">
            <h1 className="text-center text-light mt-3">Characters</h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-2 justify-content-center">
                {store.characters && store.characters.map((item) => (
                    <div key={item.uid} style={{ width: "18rem" }}>
                        <div className="card mx-2 my-3">
                            <img className="card-img-top mt-0" src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} onError={handleError} alt="Luke Skywalker" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="justify-content-between d-flex">
                                    <span href="#" onClick={() => handleDetails(item.uid)} className="btn btn-primary">Details</span>
                                    <span onClick={() => addFavouriteApi(item.name)} type="button" className="btn btn-danger">
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

{/* <img class="card-img-top" src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} alt="Luke Skywalker"></img> */ }