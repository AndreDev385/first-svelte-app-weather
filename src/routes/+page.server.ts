import { fail, type Actions } from '@sveltejs/kit';

import zdf from 'zod-form-data';
import { searchWeather } from '.';

export const actions: Actions = {
	search: async ({ request, fetch }) => {
		const formData = await request.formData();

		const schema = zdf.formData({
			city: zdf.text()
		});

		const result = schema.safeParse(formData);

		if (!result.success) {
			const data = {
				errors: result.error.flatten().fieldErrors
			};
			return fail(400, data);
		}

		const city = await searchWeather(result.data.city, fetch);


		return {
			data: city,
			errors: null
		};
	}
};
