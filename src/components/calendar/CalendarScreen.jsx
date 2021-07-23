import React from 'react';
import NavBar from '../ui/NavBar';
// el calendario proviene de una libreria instalada con
// npm i react-big-calendar, las importaciones de la linea 5 y 6 son necesarias
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//esta libreria nos permite la manipulacion de fechas
import moment from 'moment';

// para mostrar el contenido del calendario debemos aplicas estilos width y height
// indicando que abarque el 100%
import './calendar_styles.css';

const localizer = momentLocalizer(moment);

const events = [
	{
		title: 'Cumpleaños del jefe',
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
		bgColor: '#fafafa',
	},
];

const CalendarScreen = () => {
	return (
		<div className="calendar-screen">
			<NavBar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
			/>
		</div>
	);
};

export default CalendarScreen;
