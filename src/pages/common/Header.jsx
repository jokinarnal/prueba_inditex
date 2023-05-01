import React from "react";
import { Link } from "react-router-dom";

export const Header = ({showLoading}) => {
	return (
		<header className="podcast-app-hdr box-shadow">
			<h1 className="hdr-tit"><Link to="/">Podcaster</Link></h1>
			{ showLoading && <div className="lds-dual-ring"></div>}
		</header>
	)}