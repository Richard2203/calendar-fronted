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

const login = (user) => ({
	type: types.authLogin,
	payload: user,
});
