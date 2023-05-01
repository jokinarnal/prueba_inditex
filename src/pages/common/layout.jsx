import React from "react";
import {
    Outlet,
    useNavigation,
} from "react-router-dom";

import { Header } from "./header.jsx";

export const Layout = () => {
	
	let navigation = useNavigation();

	return (
		<>
			<Header showLoading={navigation.state !== "idle"} />
			<Outlet />
		</>
	);
}