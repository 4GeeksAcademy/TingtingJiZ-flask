import React, { useContext, useEffect } from "react";

import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Contact = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate();

  const handleEdit = (person) => {
    actions.setCurrentContact(person);
    navigate("/edit");
  }
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      // Lo que sea
      actions.getDelete(id)
      actions.getUser()
    }
  }

  useEffect(() => {
    actions.getUser()
  }, [])

  return (
    <div className="contact container-fluid w-100">
      <div className="text-end mt-3 mx-1">
        <Link to="/form">
          <button className="btn btn-success">Add Contact</button>
        </Link>
      </div>
      {store.contacts.map((item) => (
        <div key={item.id} className="card row row-3 row-md-6 row-xl-2 my-3 mx-1">
          <div className="text-start d-flex my-2 mx-2">
            <img src="https://placehold.co/150" className="img-fluid rounded-circle my-2 mx-4" alt="..." />
            <div className="card-body ">
              <h2 className="card-title">{item.name}</h2>
              <p className="card-text"><i className="fas fa-map-marker-alt"></i> {item.address}</p>
              <p className="card-text"><i className="fas fa-phone-alt"></i> {item.phone}</p>
              <p className="card-text"><i className="fas fa-envelope"></i> {item.email}</p>
            </div>
            <div>
              <span onClick={() => handleEdit(item)} className="my-2 mx-2 " type="submit"><i className="text-primary fas fa-pencil-alt"></i></span>
              <span onClick={() => handleDelete(item.id)} className="my-2 mx-2" type="submit"><i className="text-danger fas fa-trash"></i></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}