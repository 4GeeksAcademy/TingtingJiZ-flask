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
			website: "Contact List",
			contacts: [],
			currentContact: null,
			host: "https://playground.4geeks.com/contact"
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

			getPost: async ( name, address, phone, email) => {
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

			setCurrentContact: (contact) => { setStore({ currentContact: contact }) },

		}
	};
};

export default getState; 
