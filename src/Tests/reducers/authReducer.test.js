import { authLogout, checkingFinish, login } from '../../actions/auth';
import { authReducer } from '../../reducers/authReducer';

describe('Pruebas en el authReducer', () => {
	const initState = { checking: true };

	beforeEach(() => {
		authReducer(initState, '');
	});

	test('debe realizar retorno por defecto', () => {
		expect(authReducer(initState, '')).toEqual(initState);
	});

	test('debe realizar authLogin', () => {
		const user = { name: 'paquito', uid: '1234567' };
		expect(authReducer(initState, login(user))).toEqual({
			checking: false,
			...user,
		});
	});

	test('debe realizar authLogout', () => {
		expect(authReducer(initState, authLogout())).toEqual({
			checking: false,
		});
	});

	test('debe realizar authCheckingFinish', () => {
		expect(authReducer(initState, checkingFinish())).toEqual({
			checking: false,
		});
	});
});
