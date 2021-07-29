import Swal from 'sweetalert2';
import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import { Events_Parse } from '../helpers/Events_Parse';

export const eventStartAddNew = (event) => {
	return async (dispatch, getState) => {
		const { name, uid } = getState().auth;

		try {
			const resp = await fetchConToken('events', event, 'POST');
			const body = await resp.json();

			if (body.ok) {
				// agregando la propieadad "id" al objeto "event"
				event.id = body.evento.id;

				// agregando la propiedad "user" al objeto "event"
				event.user = { _id: uid, name };

				// guardando el "event" en Redux
				dispatch(eventAddNew(event));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

const eventAddNew = (event) => ({
	type: types.eventAddNew,
	payload: event,
});

export const eventSetActive = (event) => ({
	type: types.eventSetActive,
	payload: event,
});

export const eventClearActiveEvent = () => ({
	type: types.eventClearActiveEvent,
});

export const eventStartUpdated = (event) => {
	return async (dispatch) => {
		try {
			const resp = await fetchConToken(
				`events/${event.id}`,
				event,
				'PUT'
			);
			const body = await resp.json();

			if (body.ok) dispatch(eventUpdated(event));
			else Swal.fire('error', body.msg, 'error');
		} catch (error) {
			console.log(error);
		}
	};
};

const eventUpdated = (event) => ({
	type: types.eventUpdated,
	payload: event,
});

export const eventStartDelete = () => {
	return async (dispatch, getState) => {
		const { id } = getState().calendar.activeEvent;
		try {
			const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');

			const body = await resp.json();

			if (body.ok) dispatch(eventDeleted());
			else Swal.fire('error', body.msg, 'error');
		} catch (error) {
			console.log(error);
		}
	};
};

const eventDeleted = () => ({
	type: types.eventDeleted,
});

export const eventStartLoading = () => {
	return async (dispatch) => {
		try {
			const resp = await fetchConToken('events');
			const { events } = await resp.json();

			// obteniendo los events retornados de la peticion fetch
			const ArrayEvents = Events_Parse(events);

			dispatch(eventLoaded(ArrayEvents));
		} catch (error) {
			console.log(error);
		}
	};
};

const eventLoaded = (events) => ({ type: types.eventLoaded, payload: events });

export const Logout = () => ({ type: types.eventLogout });
