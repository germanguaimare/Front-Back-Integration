import React, { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
// import { Context } from "../store/appContext";

export const Private = () => {
	//const { store, actions } = useContext(Context);
	//const params = useParams();
	const [tokenInfo, setTokenInfo] = useState({ created_at: "", token: "" });
	useEffect(() => setTokenInfo(JSON.parse(sessionStorage.getItem("tokeninfo"))), [])
	let tokenTime = tokenInfo.created_at;
	let currentTime = new Date()
	useEffect(() => console.log(tokenTime))
	useEffect(() => console.log(currentTime))
	let message
	if (tokenInfo == undefined) {
		message = "You need to log in first"
	}
	else {
		message = "You are correctly logged in"
	}
	return (
		<div className="jumbotron">
			<h1 className="display-4">Private dashboard</h1>
			<p>{message}</p>

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
