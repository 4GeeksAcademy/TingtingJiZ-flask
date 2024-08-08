
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			website: "Star Wars",
			contacts: [],
			currentContact: [],
			host: "https://playground.4geeks.com/contact",
			isLogged: false,
			currentUser: null,
			alert: {visible: false, back: "danger", text: "message of the back"},

			//Star Wars
			characters: [],
			currentCharacter: {},
			planets: [],
			currentPlanet: {},
			species: [],
			currentSpecies: {},
			favourite: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getUser: async () => {
				const url = "https://playground.4geeks.com/contact/agendas/broccoli";
				const options = {
					method: "GET"
				};
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data);
				setStore({ contacts: data.contacts })
				localStorage.setItem("contacts", JSON.stringify(data));
			},

			getPost: async (name, address, phone, email) => {
				const url = `${getStore().host}/agendas/broccoli/contacts`;
				const dataToSend = {
					"name": name,
					"address": address,
					"phone": phone,
					"email": email
				}
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend),
				}

				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return;
				}
				console.log(dataToSend)
				console.log(response);
			},

			getDelete: async (contactid) => {
				const url = `${getStore().host}/agendas/broccoli/contacts/${contactid}`
				const options = {
					method: "DELETE",
				}
				const response = await fetch(url, options)
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return
				}
			},

			getUpdate: async (id, name, address, phone, email) => {
				const url = `${getStore().host}/agendas/broccoli/contacts/${id}`;
				const dataToSend = {
					"name": name,
					"address": address,
					"phone": phone,
					"email": email
				}
				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend),
				}

				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return;
				}
				console.log(dataToSend)
				console.log(response);
			},

			getCharacters: async () => {
				const uri = `${process.env.URISWAPTECH}/api/people`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json()
				console.log(data.results)
				setStore({ characters: data.results });
			},

			getDetails: async (characterid) => {
				const uri = `${process.env.URISWAPTECH}/api/people/${characterid}`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return
				}
				const data = await response.json()
				console.log(data.result);
				setStore({ currentCharacter: data.result })
			},

			getPlanets: async () => {
				const uri = `${process.env.URISWAPTECH}/api/planets`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json()
				console.log(data.results)
				setStore({ planets: data.results })
			},

			planetDetails: async (planetid) => {
				const uri = `${process.env.URISWAPTECH}/api/planets/${planetid}`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return
				}
				const data = await response.json()
				console.log(data.result);
				setStore({ currentPlanet: data.result })
			},

			getSpecies: async () => {
				const uri = `${process.env.URISWAPTECH}/api/species`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json()
				console.log(data.results)
				setStore({ species: data.results })
			},

			speciesDetails: async (speciesid) => {
				const uri = `${process.env.URISWAPTECH}/api/species/${speciesid}`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("error: ", response.status, response.statusText);
					return
				}
				const data = await response.json()
				console.log(data.result);
				setStore({ currentSpecies: data.result })
			},

/* 			removeFavourite: (name) => {
				const existingFavourites = getStore().favourite;
				const updatedFavourites = existingFavourites.filter(item => item.name !== name);
				setStore({ favourite: updatedFavourites });
			}, */
			addFavourite: (title) => {
				setStore({favourite: [...getStore().favourite, title]})
			},
			removeFavourite: (id) => {
				setStore({favourite: getStore().favourite.filter((item, i) => { return i != id; })})
			},

			setCurrentCharacter: (character) => { setStore({ setCurrentCharacter: character }) },
			setCurrentPlanet: (planet) => { setStore({ setCurrentPlanet: planet }) },
			setCurrentContact: (contact) => { setStore({ currentContact: contact }) },
			setAlert: (newAlert) => {setStore({alert: newAlert})},
			setCurrentUser: (user) => {setStore({currentUser: user})},
			setIsLogged: (isLogin) => {setStore({isLogged: isLogin})}

		}
	};
};

export default getState; 
