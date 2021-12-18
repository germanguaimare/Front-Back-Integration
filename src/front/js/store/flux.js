const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			email: "",
			username: "",
			password: "",
			token: "",
		},
		actions: {
			succesLogin: (result) => {
				let store = getStore()
				sessionStorage.setItem('token', result.token);
				//setStore({ token: sessionStorage.getItem('token') });
				//console.log(store.token)
			},
			sessionCheck: () => {
				//let store = getStore()
				let activeToken = sessionStorage.getItem('token')
				var myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${activeToken}`);

				var requestOptions = {
					method: 'GET',
					headers: myHeaders,
					redirect: 'follow'
				};

				fetch("https://3001-plum-camel-3sp7ar85.ws-us23.gitpod.io/api/private", requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log('error', error));
			},
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
				let action = getActions()
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
					//.then(result => sessionStorage.setItem('token', result.token))
					.then(result => action.succesLogin(result))
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
