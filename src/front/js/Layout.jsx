import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
//import custom component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
//import custom pages
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Form } from "./pages/Form.jsx";
import { Edit } from "./pages/Edit.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Details } from "./pages/Details.jsx";
import { Planets } from "./pages/Planets.jsx";
import { PlanetsDetails } from "./pages/PlanetsDetails.jsx";
import { Species } from "./pages/Species.jsx";
import { SpeciesDetails } from "./pages/SpeciesDetails.jsx"

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<Form />} path="/form" />
                        <Route element={<Edit />} path="/edit" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<Details />} path="/details" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<PlanetsDetails />} path="/planets-details" />
                        <Route element={<Species />} path="/species" />
                        <Route element={<SpeciesDetails/>} path="/species-details" />
                        <Route element={<Error404 />} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
