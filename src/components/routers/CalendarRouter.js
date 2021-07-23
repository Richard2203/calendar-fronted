import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import CalendarScreen from '../calendar/CalendarScreen';
import LoginScreen from '../auth/LoginScreen';

const CalendarRouter = () => {
	return (
		<div>
			<Router>
				<div>
					<Switch>
						<Route exact path="/">
							<CalendarScreen />
						</Route>
						<Route exact path="/login">
							<LoginScreen />
						</Route>
						<Redirect to="/" />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default CalendarRouter;
