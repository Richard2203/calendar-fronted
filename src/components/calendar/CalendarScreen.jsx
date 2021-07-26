import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// el calendario proviene de una libreria instalada con
// npm i react-big-calendar, las importaciones de la linea 5 y 6 son necesarias
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-message-es';

// para mostrar el contenido del calendario debemos aplicas estilos width y height
// indicando que abarque el 100%
import './calendar_styles.css'; // importando lenguaje espaniol para las fechas

//esta libreria nos permite la manipulacion de fechas
import moment from 'moment';
import 'moment/locale/es';

import NavBar from '../ui/NavBar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import {
	eventAddNew,
	eventClearActiveEvent,
	eventSetActive,
} from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeletedEventFab from '../ui/DeletedEventFab';

moment.locale('es'); // estableciendo en espaniol la fechas

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);

	// obtiene la ultima pestaña activa o devuelve la pestaña "month"
	const [lastView, setlastView] = useState(
		localStorage.getItem('lastView') || 'month'
	);

	const onDoubleClick = (e) => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
	};

	const onViewChange = (e) => {
		setlastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		if (activeEvent) dispatch(eventClearActiveEvent());
	};

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
			{/* -events:[] recibe un array de objetos con todas las fechas a 
				 colocar en el calendario
				-messages={} recibe un objeto con la configuracion de que 
				 mensajes mostrar en el calendario (fechas,botones,etc)
				-eventPropGetter={} recibe un objeto con la configuracion de estilo
				 del evento activo
				-components={} recibe un objeto con la forma en que se mostrara 
				 cada casilla que contiene inforacion de un evento
				-onDoubleClickEvent=()=>{} recibe un callback con la accion a 
				 ejecutar tras hacer doble click
				-onSelectEvent=()=>{} recibe un callback con la accion a ejecutar
				 tras hacer un click
				-onView=()=>{} recibe un callback con la accion a ejecutar
			 	 al dar click en la barra de "meses,semanas,dias,agenda", retorna
				 un string correspondiente a la vista seleccionada
				-view='' recibe la ultima pestaña seleccionada en formato string
				-onSelectSlot={} retorna la informacion de un casilla clickeada
				 sin importar si esta o no vacia
				*/}
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onSelectSlot={onSelectSlot}
				selectable={true}
				onView={onViewChange}
				view={lastView}
				components={{
					event: CalendarEvent,
				}}
			/>

			{activeEvent && <DeletedEventFab />}
			<AddNewFab />

			<CalendarModal />
		</div>
	);
};

export default CalendarScreen;
