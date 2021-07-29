import moment from 'moment';

export const Events_Parse = (events = []) => {
	return events.map((event) => ({
		...event,
		// convirtiendo las fechas de tipo string a instancias de moment
		start: moment(event.start).toDate(),
		end: moment(event.end).toDate(),
	}));
};
