const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			logged: false
		},
		actions: {
			successLogin: (result) => {
				let store = getStore()
				sessionStorage.setItem('token', result.token);

			},
			sessionCheck: (history) => {
				console.log("Estoy chequeando el token")
				let store = getStore()
				let activeToken = sessionStorage.getItem('token')
				var myHeaders = new Headers();
				myHeaders.append("Authorization", "Bearer " + activeToken);

				var requestOptions = {
					method: 'GET',
					headers: myHeaders,
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/private", requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log(result)
						if (result == "You accesed your private dashboard") {
							setStore({ logged: true })
						}
						else {
							setStore({ logged: false });
							history.push("/")
							sessionStorage.removeItem("token");
						}
					})
					.catch(error => console.log(error));

			},
			createUser: (name, user, password, history) => {
				let store = getStore()
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					"name": name,
					"email": user,
					"password": password
				});

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch("https://3001-plum-camel-3sp7ar85.ws-us29.gitpod.io/api/users", requestOptions)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						if (result == "A new account has been created") {
							alert("You have created a new account")
							history.push("/")
						}
						else {
							alert("There was a problem creating your account")
						}
					})
					.catch(error => console.log('error', error));
			},
			login: (email, password, history) => {
				let store = getStore()
				let action = getActions()
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					"email": email,
					"password": password
				});

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch("https://3001-plum-camel-3sp7ar85.ws-us29.gitpod.io/api/login", requestOptions)
					.then(response => response.json())
					//.then(result => console.log(result))
					.then(result => {
						if (result.token != undefined) {
							setStore({ logged: true })
							sessionStorage.setItem('token', result.token)
							alert("You have logged in")
							history.push("/private")
						}
						else {
							alert("Wrong email or password. Try again.")
						}
					})
					.catch(error => console.log('error', error));
			},
			logOut: (history) => {
				alert("You logged out. Goodbye.")
				setStore({ logged: false });
				sessionStorage.removeItem("token");
				history.push("/")

			}
		}
	};
};

export default getState;
