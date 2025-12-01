const BASE_URL_DEV = "http://localhost:7000";

const BASE_URL_PROD = "/api";

const BASE_URL =
  location.hostname === "localhost" ? BASE_URL_DEV : BASE_URL_PROD;

export { BASE_URL };
