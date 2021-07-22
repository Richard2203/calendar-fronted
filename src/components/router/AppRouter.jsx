import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import CalendarApp from '../../CalendarApp';
import LoginScreen from '../auth/LoginScreen';

const AppRouter = () => {
	return (
		<Router>
			<div>
				<h2>App Router</h2>
				<Switch>
					<Route exact path="/login">
						<LoginScreen />
					</Route>
					<Route exact path="/">
						<CalendarApp />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
