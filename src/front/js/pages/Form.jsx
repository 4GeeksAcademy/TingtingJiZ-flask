import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Form = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const handlePost = async (event) => {
        event.preventDefault();
        if (confirm('Are you sure you want to add this contact?')) {
            // Lo que sea
            await actions.getPost(name, address, phone, email)
            navigate("/")
        }

    }

    /*     useEffect(() => {
            actions.getUser()
        }, []) */
    return (
        <form onSubmit={handlePost} className="container w-50">
            <h1 className="mt-5">Add Contact</h1>
            <div className="text-start">
                <div className="mb-3" >
                    <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                    <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="exampleInputName" placeholder="Full Name" aria-describedby="emailHelp" required />
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
                <Link to={"/contact"}>
                    <button type="submit" className="btn btn-primary">Save</button>
                </Link>
                <Link to={"/contact"}>
                    <button type="submit" className="btn btn-danger ms-2">Cancel</button>
                </Link>
            </div>
        </form>
    )
}