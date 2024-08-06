import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleEmail = (event) => { setEmail(event.target.value); };
    const handlePassword = (event) => { setPassword(event.target.value); };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = { email, password };
        const uri = process.env.BACKEND_URL + '/api/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            if (response.status == 401) {
                const data = await response.json()
                let alert = {
                    visible: true,
                    back: 'danger',
                    text: data.message
                }
                actions.setAlert(alert)
            }
            return
        }
        const data = await response.json()
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.results));
        actions.setCurrentUser(data.results);
        actions.setIsLogged(true)
        actions.setAlert({ visible: true, back: 'info', text: data.message })
        navigate('/')
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-3 display-5">Iniciar sesión</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mt-3 h6">
                                    <label htmlFor="email" className="mb-1">Correo electrónico:</label>
                                    <input type="email" className="form-control" id="email"
                                        value={email} onChange={handleEmail} required />
                                </div>
                                <div className="form-group mt-3 h6">
                                    <label htmlFor="password" className="mb-1">Contraseña:</label>
                                    <input type="password" className="form-control" id="password"
                                        value={password} onChange={handlePassword} required />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary mt-5">Iniciar sesión</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}