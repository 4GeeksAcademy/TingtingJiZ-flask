import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Logout = () => {
    const { actions } = useContext(Context)

    const handleLogout = () => {
        localStorage.clear()
        actions.setIsLogged(false);
        actions.setCurrentUser(null);
        actions.setAlert({visible: false, back: "info", text: ""})
    }

    return (
        <button onClick={handleLogout} className="btn btn-primary mt-2">Logout</button>
    )
}