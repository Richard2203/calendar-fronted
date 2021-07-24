import React from 'react';
import { Provider } from 'react-redux';
import CalendarRouter from './components/routers/CalendarRouter';
import { store } from './store/store';

const CalendarApp = () => {
	return (
		<Provider store={store}>
			<CalendarRouter />
		</Provider>
	);
};

export default CalendarApp;
