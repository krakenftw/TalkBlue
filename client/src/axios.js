import "dotenv/config";

export const axios = axios.create({
  baseURL: process.env.API_ENDPOINT,
});
