import React from 'react';
import NavBar from '../ui/NavBar';
// el calendario proviene de una libreria instalada con
// npm i react-big-calendar, las importaciones de la linea 5 y 6 son necesarias
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//esta libreria nos permite la manipulacion de fechas
import moment from 'moment';

import { messages } from '../../helpers/calendar-message-es';
// para mostrar el contenido del calendario debemos aplicas estilos width y height
// indicando que abarque el 100%
import './calendar_styles.css'; // importando lenguaje espaniol para las fechas
import 'moment/locale/es';

moment.locale('es'); // estableciendo en espaniol la fechas

const localizer = momentLocalizer(moment);

const events = [
	{
		title: 'Cumpleaños del jefe',
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
		bgColor: '#fafafa',
		notes: 'Comprarle un regalo',
	},
];

const CalendarScreen = () => {
	// este metodo sera pasado a la propieadad "eventPropGetter"
	// y el retorno de estilos seran los estilos que aplique a un evento
	// en particular
	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: '#367CF7',
			borderRadius: '0px',
			opacity: 0.7,
			display: 'block',
			color: 'white',
		};
		return { style };
	};

	return (
		<div className="calendar-screen">
			<NavBar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				eventPropGetter={eventStyleGetter}
			/>
		</div>
	);
};

export default CalendarScreen;
