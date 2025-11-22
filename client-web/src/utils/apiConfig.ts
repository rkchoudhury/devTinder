const BASE_URL_DEV = "http://localhost:7000";

const BASE_URL_PROD = "/api";

// TODO: Find a better way to manage it
// May be using .env file
const BASE_URL = true ? BASE_URL_PROD : BASE_URL_DEV;

export { BASE_URL };
