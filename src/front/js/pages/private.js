import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		const interval = setInterval(() => actions.sessionCheck(), 6000)
	})
	const [logged, setLogged] = useState(false);

	return (
		<div className="jumbotron">
			<h1 className="display-4">Private dashboard</h1>
			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back to login
				</span>
			</Link>
		</div>
	);

};

/* Single.propTypes = {
	match: PropTypes.object
}; */
