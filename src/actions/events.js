import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';

export const eventStartAddNew = (event) => {
	return async (dispatch, getState) => {
		const { name, uid } = getState().auth;

		try {
			const resp = await fetchConToken('events', event, 'POST');
			const body = await resp.json();

			console.log(body);
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

export const eventUpdated = (event) => ({
	type: types.eventUpdated,
	payload: event,
});

export const eventDeleted = () => ({
	type: types.eventDeleted,
});
