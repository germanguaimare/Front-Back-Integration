const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			logged: false,
			email: "",
			username: "",
			password: "",
			token: "",
		},
		actions: {
			createUser: () => {
				let store = getStore()
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					"name": store.username,
					"email": store.email,
					"password": store.password
				});

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch("https://3001-plum-camel-3sp7ar85.ws-us23.gitpod.io/api/users", requestOptions)
					.then(response => response.text())
					.then(result => (console.log(result)))
					.catch(error => console.log('error', error));
			},
			login: () => {
				let store = getStore()
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					"email": store.email,
					"password": store.password
				});

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch("https://3001-plum-camel-3sp7ar85.ws-us23.gitpod.io/api/login", requestOptions)
					.then(response => response.json())
					.then(result => sessionStorage.setItem('tokeninfo', JSON.stringify({ created_at: new Date(), token: result.token })))
					.catch(error => console.log('error', error));
			},
			captureName: (e) => {
				setStore({ username: e.target.value });
			},

			captureEmail: (e) => {
				setStore({ email: e.target.value });
			},
			capturePassword: (e) => {
				setStore({ password: e.target.value });
			}
		}
	};
};

export default getState;
