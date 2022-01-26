import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
	const history = useHistory()
	const { store, actions } = useContext(Context)
	useEffect(() => {
		actions.sessionCheck(history);
		setInterval(() => {
			actions.sessionCheck(history);
		}, 30000);
	}, [])
	if (store.logged == true) {
		return (
			<div className="row text-center mt-3 mb-5">
				<h1 className="display-4">Welcome</h1>

				<p>Welcome to your dashboard</p>
				<div className="row px-4">
					<p>Here's a list of all your secrets</p>
					<ul>
						<li>JAKLiasdaLUIAsnkasdlig</li>
						<li><strong>lñasdpOAIDälNASdhk </strong></li>
						<li>ÑPOAsdpASIDHOBm</li>
					</ul>
					<button className="btn-sm btn-danger w-25 mx-auto"
						onClick={() => actions.logOut(history)}
					>Log out
					</button>

				</div>
			</div>
		);
	}
	else {
		return (
			<div className="container text-center mt-3 mb-5">
				<h1 className="display-4">Private dashboard</h1>
				<p>You need to log in first</p>
				<Link to="/">
					<span className="btn btn-primary btn-lg" href="#" role="button">
						Back to login
					</span>
				</Link>
			</div>)
	}

};

/* Single.propTypes = {
	match: PropTypes.object
}; */
