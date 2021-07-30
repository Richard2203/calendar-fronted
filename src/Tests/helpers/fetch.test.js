import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe('Pruebas en el helper fetch', () => {
	let token;

	test('fetchSinToken debe de funcionar correctamente', async () => {
		const resp = await fetchSinToken(
			'auth',
			{
				email: 'paquita@gmail.com',
				password: '1234567890',
			},
			'POST'
		);

		const body = await resp.json();

		token = body.token;

		expect(resp instanceof Response).toBe(true);
		expect(body.ok).toBe(true);
	});

	test('fetchConToken debe de funcionar correctamente', async () => {
		localStorage.setItem('token', token);

		const resp = await fetchConToken(
			'events/123456789012345678901234',
			{},
			'DELETE'
		);
		const body = await resp.json();

		expect(body.msg).toBe('No existe evento con ese ID');
	});
});
