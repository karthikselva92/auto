import axios from "axios";

const _axios = axios;

export class Http {
  static get(url, options = {}) {
    console.log("url--> ", url);
    return _axios.get(url, options);
  }

  static post(url, body, options = {}) {
    return _axios.post(url, body, options);
  }

  static put(url, body, options = {}) {
    return _axios.put(url, body, options);
  }

  static delete(url, body, options = {}) {
    return _axios.delete(url, body, options);
  }

  static getAuthToken() {
    return {
      headers: {
        'x-access-token': localStorage.getItem('authToken')
      }
    }
  }
}
