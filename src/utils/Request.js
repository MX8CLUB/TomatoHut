import RNFetchBlob from "rn-fetch-blob";

export default class Request {
    static post(url, params) {
        return new Promise(function (resolve, reject) {
            RNFetchBlob.fetch('POST', url, {
                'Content-Type': 'application/json'
            }, JSON.stringify(params))
                .then((response) => {
                    let status = response.info().status;
                    if (status === 200) {
                        return response.json();
                    } else {
                        return response.text();
                    }
                })
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch((err) => {
                    console.warn('err', err);
                    reject(err);
                });
        });
    }

    static get(url) {
        return new Promise(function (resolve, reject) {
            RNFetchBlob.fetch('GET', url)
                .then((response) => {
                    let status = response.info().status;
                    if (status === 200) {
                        return response.json();
                    } else {
                        return response.text();
                    }
                })
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch((err) => {
                    console.warn('err', err);
                    reject(err);
                });
        });
    }
}