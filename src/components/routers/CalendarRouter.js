import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import CalendarScreen from '../calendar/CalendarScreen';
import LoginScreen from '../auth/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startCheking } from '../../actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const CalendarRouter = () => {
	const { checking, uid } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(startCheking());
	}, [dispatch]);

	if (checking) return <h1>Espere...</h1>;
	return (
		<Router>
			<div>
				<Switch>
					{/* si existe un uid entonces se le aplica doble negacion
						retornando un valor "true" */}
					<PublicRoute
						exact
						path="/login"
						component={LoginScreen}
						isAuthenticated={!!uid}
					/>

					<PrivateRoute
						exact
						path="/"
						component={CalendarScreen}
						isAuthenticated={!!uid}
					/>

					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	);
};

export default CalendarRouter;
