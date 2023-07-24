const baseUrl = 'https://contact-list-api.azurewebsites.net';
const apiVersion = 'v1';

export const environment = {
  production: true,
  baseUrl,
  apiVersion,
  apiUrl: `${baseUrl}/${apiVersion}`,
};
