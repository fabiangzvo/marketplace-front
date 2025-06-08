import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      message,
      response: { status = 500, data: { message: mainMessage } } = {},
    } = error;

    const messageError = { status, message: mainMessage || message, ok: false };

    if (!messageError.status && !messageError.message)
      return { status: 500, error: { message: "Request error", ok: false } };

    console.error("Intercept: ", messageError);

    return messageError;
  },
);

export default api;
