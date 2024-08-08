import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Logout = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        actions.setIsLogged(false);
        actions.setCurrentUser(null);
        actions.setAlert({visible: false, back: "info", text: ""})
        navigate("/")
    }

    return (
        <button onClick={handleLogout} className="btn btn-primary mt-2">Logout</button>
    )
}