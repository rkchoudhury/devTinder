const BASE_URL_DEV = "http://192.168.43.170:7000"; // IP address of machine + Node server port

const BASE_URL_PROD = "http://51.21.171.84/api"; // IP Address of AWS Server to which the Node.js application is deployed

const BASE_URL = __DEV__ ? BASE_URL_DEV : BASE_URL_PROD;

export { BASE_URL, BASE_URL_DEV };
