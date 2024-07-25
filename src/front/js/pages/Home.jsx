import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Characters } from "./Characters.jsx";
import { Form } from "./Form.jsx";
import { Carousel } from "./Carousel.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Carousel/>
		</div>
	);
};
