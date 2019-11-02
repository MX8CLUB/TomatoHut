import axios from 'axios';
const base_url = 'https://go.tomatohut.cn/api';
axios.defaults.withCredentials = true; //让ajax携带cookie

export default class Request {
  static post(url, params, image) {
    return new Promise(function(resolve, reject) {
      let formData = new FormData();
      for (let key in params) {
        if (image === key) {
          let arr = params[key].split('/');
          formData.append(key, {
            uri: params[key],
            type: 'image/jpeg',
            name: arr[arr.length - 1],
          });
        } else {
          formData.append(key, params[key]);
        }
      }
      axios
        .post(base_url + url, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
          // let status = response.status;
          return response.data;
        })
        .then(responseData => {
          resolve(responseData);
        })
        .catch(err => {
          console.warn('err', err);
          reject(err);
        });
    });
  }

  static get(url) {
    return new Promise(function(resolve, reject) {
      axios
        .get(base_url + url)
        .then(response => {
          return response.data;
        })
        .then(responseData => {
          resolve(responseData);
        })
        .catch(err => {
          console.warn('err', err);
          reject(err);
        });
    });
  }
}
