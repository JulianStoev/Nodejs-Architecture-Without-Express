export const SERVER_HOST = process.env.HOST || 'localhost';
export const SERVER_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;