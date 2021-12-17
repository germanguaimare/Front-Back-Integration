import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, CardFooter } from "reactstrap"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5 " id="loginCard">
			<Card >
				<CardBody >
					<CardTitle tag="h5">
						Welcome
					</CardTitle>
					<Form inline>
						<FormGroup>
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
								onChange={(e) => { actions.captureEmail(e); }}
							/>
						</FormGroup>
						<FormGroup>
							<Label
								for="examplePassword"
								hidden
							>
								Password
							</Label>
							<Input
								id="examplePassword"
								name="password"
								placeholder="Password"
								type="password"
								onChange={(e) => { actions.capturePassword(e) }}
							/>
						</FormGroup>
						<Button
							onClick={() => {
								actions.login()
							}}>
							Login
						</Button>
					</Form>
					<CardFooter className="text-muted" id="loginFooter">
						Don&apos;t have an active user?
						<br></br>
						<Link to="/signin">
							<Button
								size="sm">
								Create user
							</Button>
						</Link>
					</CardFooter>
				</CardBody>
			</Card>
		</div>
	);
};
