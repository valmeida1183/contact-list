const baseUrl = 'https://localhost:7060';
const apiVersion = 'v1';

export const environment = {
  production: false,
  baseUrl,
  apiVersion,
  apiUrl: `${baseUrl}/${apiVersion}`,
};
