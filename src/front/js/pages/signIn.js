import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "../store/appContext";
import "../../styles/signin.css";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from "reactstrap"

export const SignIn = () => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { store, actions } = useContext(Context);
	const history = useHistory()
	return (
		<div className="container text-center mt-5 " id="signupCard">
			<Card >
				<CardBody >
					<CardTitle tag="h5">
						Sign In
					</CardTitle>
					<Form>
						<FormGroup>
							<Label
								for="name"
								hidden
							>
								Email
							</Label>
							<Input
								id="userName"
								name="name"
								placeholder="Name"
								type="text"
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
							<Label
								for="exampleEmail"
								hidden
							>
								Email
							</Label>
							<Input
								id="exampleEmail"
								name="email"
								placeholder="Email"
								type="email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
							<Label
								for="examplePassword"
								hidden
							>
								Password
							</Label>
							<Input
								id="examplePassword1"
								name="password1"
								placeholder="Password"
								type="password"
								onChange={(e) => { setPassword(e.target.value) }}
							/>
							<Label
								for="examplePassword"
								hidden
							>
								Password
							</Label>
							<Input
								id="examplePassword2"
								name="password2"
								placeholder="Password"
								type="password"

							/>
						</FormGroup>
						<Button onClick={() => {
							actions.createUser(name, email, password, history)
						}}>
							Create User
						</Button>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
};
