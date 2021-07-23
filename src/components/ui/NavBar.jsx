import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<span className="navbar-brand"> Juancho </span>
			<button className="btn btn-outline-danger">
				<i className="fas fa-sign-out-alt"></i>
				<span> Salir</span>
			</button>
		</nav>
	);
};
export default NavBar;
