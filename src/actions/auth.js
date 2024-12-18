import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';
import { Logout } from './events';

export const startLogin = ({ email, password }) => {
	return async (dispatch) => {
		if (password.length <= 8)
			Swal.fire(
				'Error',
				'las contraseñas son de 8 caracteres o mas',
				'error'
			);
		else {
			const res = await fetchSinToken(
				'auth',
				{ email, password },
				'POST'
			);
			const { ok, token, uid, name, msg } = await res.json();
			if (ok) {
				localStorage.setItem('token', token);
				localStorage.setItem('token-init-date', new Date().getTime());
				dispatch(login({ uid, name }));
			} else Swal.fire('Error', msg, 'error');
		}
	};
};

export const startRegister = (name, email, password) => {
	return async (dispatch) => {
		const res = await fetchSinToken(
			'auth/new',
			{ name, email, password },
			'POST'
		);

		const { ok, name: nam, uid, token, msg } = await res.json();

		if (ok) {
			localStorage.setItem('token', token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(login({ nam, uid }));
		} else Swal.fire('Error', msg, 'error');
	};
};

export const startCheking = () => {
	return async (dispatch) => {
		// TODO: se empleo manejo de env para evitar problemas con los test, esto
		// TODO: es mala practica, solucionar
		if (!localStorage.getItem('token') && process.env.NODE_ENV !== 'test') {
			dispatch(checkingFinish());
			return;
		}

		const res = await fetchConToken('auth/renew');

		const { ok, name, uid, token } = await res.json();

		if (ok) {
			localStorage.setItem('token', token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(login({ name, uid }));
		} else dispatch(checkingFinish());
	};
};

export const startLogout = () => {
	return (dispatch) => {
		// implementando el localStorage en un action puesto que de ponerla
		// directamente en el reducer puede marcar error. La logica se debe
		// separar

		// purga todo el localStorage
		localStorage.clear();

		// aqui se purga la informacion en el reducer
		dispatch(authLogout());

		dispatch(Logout());
	};
};

export const checkingFinish = () => ({ type: types.authCheckingFinish });

export const authLogout = () => ({ type: types.authLogout });

export const login = (user) => ({
	type: types.authLogin,
	payload: user,
});
