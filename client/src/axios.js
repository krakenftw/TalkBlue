import "dotenv/config";
import { axios as baseAxios } from "axios";

export const axios = baseAxios.create({
  baseURL: process.env.API_ENDPOINT,
});
