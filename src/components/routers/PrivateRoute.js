import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

// la prop ...rest recibe todas las demas propiedades (path,to,etc); estas propieades
// son pasadas en cascada de un componente a otro hasta llegar aqui
const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	// guardando en localStorage el path donde se encuentra el usario
	localStorage.setItem(
		'lastPath',
		rest.location.pathname + rest.location.search
	);

	return (
		// asignando las props pasadas por argumento a este componente Route
		<Route
			{...rest}
			// rest pasa a llamarse props mediante el callback
			// Al implementar un callback es posible hacer uso de sintaxis js,
			// en este caso uso del operador ternario para retornar un componente
			// u otro
			component={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
};

export default PrivateRoute;
