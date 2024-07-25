import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Edit = (id) => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [name, setName] = useState(store.currentContact.name)
    const [address, setAddress] = useState(store.currentContact.address)
    const [phone, setPhone] = useState(store.currentContact.phone)
    const [email, setEmail] = useState(store.currentContact.email)

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (confirm('Are you sure you want to edit this contact?')) {
            // Lo que sea
            await actions.getUpdate(store.currentContact.id, name, address, phone, email)
            navigate("/contact")
        }

    }

    /*     useEffect(() => {
            actions.getUser()
        }, []) */
    return (
        <form onSubmit={handleUpdate} className="container w-50 bg-white mt-5">
            <h1 className="my-2">Edit Contact</h1>
            <div className="text-start mb-2">
                <div className="mb-3" >
                    <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                    <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="exampleInputName" placeholder="Full Name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                    <input value={phone} onChange={(event) => setPhone(event.target.value)} type="text" className="form-control" id="exampleInputPhone" placeholder="Enter Phone" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                    <input value={address} onChange={(event) => setAddress(event.target.value)} type="text" className="form-control" id="exampleInputAddress" placeholder="Enter Address" aria-describedby="emailHelp" />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    )
}