import { ApiPropType } from './prop-types';

export default class Api {
  constructor({ baseUrl, headers, paths }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._paths = paths;
  }

  _composeUrl(keyPath) {
    if (typeof keyPath === 'string') {
      return keyPath;
    } else {
      return keyPath.id
        ? this._paths[keyPath.key] + '/' + keyPath.id
        : this._paths[keyPath.key];
    }
  }

  makeRequest(keyPath, method = 'GET', body) {
    const options = {
      method: method.toUpperCase(),
      headers: this._headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${this._composeUrl(keyPath)}`, options).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      },
    );
  }
}

/* #####################
ТИПЫ ===================
##################### */
Api.propTypes = ApiPropType;
