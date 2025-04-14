import { Authorization } from "./env.js";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: Authorization,
  },
};
