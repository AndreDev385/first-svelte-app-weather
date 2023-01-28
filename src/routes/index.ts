export interface CityWeather {
	city: string;
	country: string;
	feelsLike: number;
	humidity: number;
	temperature: number;
	condition: {
		code: number;
		icon: string;
		text: string;
	};
}

export const searchWeather = async (city = 'London', fetch: (url: string) => Promise<Response>) => {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=7b1143da67964c46a6d125139232501&q=${city}&aqi=yes`
		);
		const data = await response.json();
		const cityWeather: CityWeather = {
			city: data.location.name,
			country: data.location.country,
			feelsLike: data.current.feelslike_c,
			humidity: data.current.humidity,
			temperature: data.current.temp_c,
			condition: {
				code: data.current.condition.code,
				icon: data.current.condition.icon,
				text: data.current.condition.text
			}
		};
		return cityWeather;
	} catch (error) {
		throw new Error(`${error}`);
	}
};
