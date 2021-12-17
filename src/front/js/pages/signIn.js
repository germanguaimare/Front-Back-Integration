import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/signin.css";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from "reactstrap"

export const SignIn = () => {
	const { store, actions } = useContext(Context);

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
									actions.captureName(e);
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
									actions.captureEmail(e);
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
								onChange={(e) => { actions.capturePassword(e) }}
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
							actions.createUser()
						}}>
							Create User
						</Button>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
};
