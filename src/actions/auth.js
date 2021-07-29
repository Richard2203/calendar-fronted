import Swal from 'sweetalert2';
import { fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (userCreden) => {
	return async (dispatch) => {
		const res = await fetchSinToken('auth', userCreden, 'POST');
		const { ok, token, uid, name, msg } = await res.json();

		if (ok) {
			localStorage.setItem('token', token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(login({ uid, name }));
		} else Swal.fire('Error', msg, 'error');
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

const login = (user) => ({
	type: types.authLogin,
	payload: user,
});

const register = (user) => ({
	type: types.authStartRegister,
	payload: user,
});
