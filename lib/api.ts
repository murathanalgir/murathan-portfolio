
import axios from 'axios';

const apiKey = process.env.WEATHER_API;
const baseUrl = 'http://api.weatherstack.com/current';

export async function getCurrentWeather() {
  const location = 'Istanbul';
  const response = await axios.get(baseUrl, {
    params: {
      access_key: apiKey,
      query: location,
      units: 'm',
    },
  });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((response.data as any).error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error((response.data as any).error.info);
  }
  return response.data.current;
}
